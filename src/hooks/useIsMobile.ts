import { useState, useEffect } from 'react';

export const useIsMobile = (breakpoint: number = 768): boolean => {
  // Start with false to match server-side rendering
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Only run on client side
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };
    
    // Set initial value
    setIsMobile(mediaQuery.matches);
    
    mediaQuery.addEventListener('change', handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, [breakpoint]);

  return isMobile;
};
