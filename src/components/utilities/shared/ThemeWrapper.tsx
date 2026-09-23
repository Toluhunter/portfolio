'use client';

import { ThemeProvider } from './useLightbulb';

/**
 * Theme provider. The theme class lives on <html> and is applied by the
 * pre-paint script in layout.tsx, so there is no flash of the wrong theme and
 * no second copy of the theme state.
 */
export default function ThemeWrapper({
  children,
}: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
