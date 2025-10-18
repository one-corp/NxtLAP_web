/**
 * Site Configuration
 * Central configuration for all SEO-related constants and site metadata
 */

export const siteConfig = {
  name: 'NxtLAP',
  title: 'NxtLAP | Track Upcoming Motorsports Events',
  description: 'Discover and track upcoming motorsport events with AI-powered insights. Stay updated with races, schedules, and leagues in one place.',
  url: 'https://www.nxtlap.com',
  ogImage: '/og-banner.png',
  
  links: {
    twitter: 'https://twitter.com/codephilic_guy',
    github: 'https://github.com/thecodephilic-guy',
  },
  
  authors: [
    {
      name: 'Vaidik Dubey',
      url: 'https://www.vaidik.life',
    },
  ],
  
  creator: '@codephilic_guy',
  
  keywords: [
    'Motorsport',
    'Racing',
    'F1 events',
    'MotoGP schedule',
    'racing leagues',
    'upcoming races',
    'NASCAR',
    'BTCC',
    'V8 Supercars',
    'WRC',
    'SGT',
    'IMSA',
    'IndyCar',
    'British GT',
    'Formula 1',
    'motorsport calendar',
    'race schedule',
  ],
  
  // Default metadata for pages without specific metadata
  defaultMetadata: {
    type: 'website' as const,
    locale: 'en_US',
    siteName: 'NxtLAP',
  },
} as const;

export type SiteConfig = typeof siteConfig;
