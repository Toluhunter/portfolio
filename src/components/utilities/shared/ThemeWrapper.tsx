'use client';

import { useEffect } from 'react';
import { useLightbulb } from './useLightbulb';

export default function ThemeWrapper({
  children,
}: { children: React.ReactNode }) {
  const { isLightOn } = useLightbulb();

  useEffect(() => {
    document.body.classList.toggle('dark', !isLightOn);
    const favicon = document.querySelector("link[rel='icon']");
    if (favicon) {
      (favicon as HTMLLinkElement).href = isLightOn ? '/logo-black.svg' : '/logo.svg';
    }
  }, [isLightOn]);

  return <>{children}</>;
}