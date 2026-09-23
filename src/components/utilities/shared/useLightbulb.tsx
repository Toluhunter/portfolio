'use client'

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';

export type ThemeChoice = 'system' | 'light' | 'dark';
export type ResolvedTheme = 'light' | 'dark';

const STORAGE_KEY = 'theme';
const LEGACY_KEY = 'isLightOn';

/** Reads <html class> that the pre-paint script in layout.tsx already set. */
function readAppliedTheme(): ResolvedTheme {
    if (typeof document === 'undefined') return 'dark';
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

function readStoredChoice(): ThemeChoice {
    if (typeof window === 'undefined') return 'system';
    try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
        const legacy = window.localStorage.getItem(LEGACY_KEY);
        if (legacy !== null) return JSON.parse(legacy) ? 'light' : 'dark';
    } catch {
        /* storage blocked (private mode) - fall through to system */
    }
    return 'system';
}

function systemPrefersDark(): boolean {
    if (typeof window === 'undefined' || !window.matchMedia) return true;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

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
        (meta as HTMLMetaElement).content = resolved === 'dark' ? '#0a0a0a' : '#f5f5f5';
    }
}

type ThemeContextValue = {
    /** What the visitor picked. 'system' means "follow the device". */
    choice: ThemeChoice;
    /** What is actually showing right now. */
    resolved: ResolvedTheme;
    isLightOn: boolean;
    toggleLight: () => void;
    setChoice: (choice: ThemeChoice) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    // Start from what the pre-paint script applied so the first render matches the paint.
    const [choice, setChoiceState] = useState<ThemeChoice>('system');
    const [systemDark, setSystemDark] = useState<boolean>(true);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setChoiceState(readStoredChoice());
        setSystemDark(systemPrefersDark());
        setHydrated(true);

        const query = window.matchMedia('(prefers-color-scheme: dark)');
        const onChange = (event: MediaQueryListEvent) => setSystemDark(event.matches);
        query.addEventListener('change', onChange);
        return () => query.removeEventListener('change', onChange);
    }, []);

    const resolved: ResolvedTheme = choice === 'system'
        ? (systemDark ? 'dark' : 'light')
        : choice;

    useEffect(() => {
        if (!hydrated) {
            applyTheme(readAppliedTheme());
            return;
        }
        applyTheme(resolved);
    }, [resolved, hydrated]);

    const setChoice = useCallback((next: ThemeChoice) => {
        setChoiceState(next);
        try {
            window.localStorage.setItem(STORAGE_KEY, next);
        } catch {
            /* storage blocked - the choice still applies for this page view */
        }
    }, []);

    const toggleLight = useCallback(() => {
        setChoice(resolved === 'light' ? 'dark' : 'light');
    }, [resolved, setChoice]);

    const value = useMemo<ThemeContextValue>(() => ({
        choice,
        resolved,
        isLightOn: resolved === 'light',
        toggleLight,
        setChoice,
    }), [choice, resolved, toggleLight, setChoice]);

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
    const { isLightOn, toggleLight, choice, setChoice } = useTheme();
    return { isLightOn, toggleLight, choice, setChoice };
};
