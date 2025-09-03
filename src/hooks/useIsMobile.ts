import { useState, useEffect } from 'react';

/**
 * Custom hook to determine if the user is on a mobile viewport.
 * @param breakpoint The screen width breakpoint (in pixels) for mobile view.
 * @returns A boolean indicating if the current view is mobile.
 */
export const useIsMobile = (breakpoint: number = 768): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== 'undefined' && window.innerWidth < breakpoint
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };
    mediaQuery.addEventListener('change', handleMediaQueryChange);
    setIsMobile(mediaQuery.matches);
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, [breakpoint]); // Re-run effect only if the breakpoint changes

  return isMobile;
};
