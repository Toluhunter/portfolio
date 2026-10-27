'use client'

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useSyncExternalStore,
} from 'react';

export type ResolvedTheme = 'light' | 'dark';

const COOKIE_NAME = 'theme';

/** Reads <html class> that the pre-paint script in layout.tsx already set. */
function readAppliedTheme(): ResolvedTheme {
    if (typeof document === 'undefined') return 'dark';
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

/** The visitor's explicit choice, or null when there is none and the device decides. */
function readThemeCookie(): ResolvedTheme | null {
    if (typeof document === 'undefined') return null;
    const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=(light|dark)(?:;|$)`));
    return match ? (match[1] as ResolvedTheme) : null;
}

function writeThemeCookie(theme: ResolvedTheme) {
    // A choice lasts 24 hours from the last toggle, then the site follows the device again.
    // Each toggle rewrites the cookie, so the 24 hours restart every time.
    document.cookie = `${COOKIE_NAME}=${theme}; Path=/; Max-Age=86400; SameSite=Lax`;
}

function systemPrefersDark(): boolean {
    if (typeof window === 'undefined' || !window.matchMedia) return true;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function subscribeToSystem(onChange: () => void) {
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
}

// The explicit choice is read from the cookie once per page load and then held in memory, so a cookie
// that lapses mid-visit does not flip the page. A toggle replaces it and tells the provider.
let explicitChoice: ResolvedTheme | null | undefined;
const explicitListeners = new Set<() => void>();

function readExplicitChoice(): ResolvedTheme | null {
    if (explicitChoice === undefined) explicitChoice = readThemeCookie();
    return explicitChoice;
}

function chooseTheme(next: ResolvedTheme) {
    explicitChoice = next;
    writeThemeCookie(next);
    explicitListeners.forEach((listener) => listener());
}

function subscribeToChoice(onChange: () => void) {
    explicitListeners.add(onChange);
    return () => {
        explicitListeners.delete(onChange);
    };
}

const subscribeToNothing = () => () => {};

function applyTheme(resolved: ResolvedTheme) {
    const root = document.documentElement;
    root.classList.toggle('dark', resolved === 'dark');
    root.style.colorScheme = resolved;

    const favicon = document.querySelector("link[rel='icon']");
    if (favicon) {
        (favicon as HTMLLinkElement).href = resolved === 'light' ? '/logo-black.svg' : '/logo.svg';
    }
    const meta = document.querySelector("meta[name='theme-color']");
    if (meta) {
        (meta as HTMLMetaElement).content = resolved === 'dark' ? '#121212' : '#f5f5f5';
    }
}

type ThemeContextValue = {
    /** What is actually showing right now. */
    resolved: ResolvedTheme;
    isLightOn: boolean;
    toggleLight: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    // Resolved in the same order as the pre-paint script in layout.tsx: the cookie, then the device.
    // The server cannot know either, so the hydration render sees the server values and hydrated stays
    // false for it; until then the effect below keeps whatever that script already painted.
    const explicit = useSyncExternalStore(subscribeToChoice, readExplicitChoice, () => null);
    const systemDark = useSyncExternalStore(subscribeToSystem, systemPrefersDark, () => true);
    const hydrated = useSyncExternalStore(subscribeToNothing, () => true, () => false);

    const resolved: ResolvedTheme = explicit ?? (systemDark ? 'dark' : 'light');

    useEffect(() => {
        if (!hydrated) {
            applyTheme(readAppliedTheme());
            return;
        }
        applyTheme(resolved);
    }, [resolved, hydrated]);

    const toggleLight = useCallback(() => {
        chooseTheme(resolved === 'light' ? 'dark' : 'light');
    }, [resolved]);

    const value = useMemo<ThemeContextValue>(() => ({
        resolved,
        isLightOn: resolved === 'light',
        toggleLight,
    }), [resolved, toggleLight]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used inside ThemeProvider');
    }
    return context;
}

/** Kept for the existing navbar and pull cord call sites. */
export const useLightbulb = () => {
    const { isLightOn, toggleLight } = useTheme();
    return { isLightOn, toggleLight };
};
