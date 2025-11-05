// API Configuration for different racing series
export const API_CONFIG = {
  // Formula 1 uses Ergast API
  FORMULA_1: {
    useAlternativeAPI: true,
    leagueId: "4370",
    primaryAPI: "ergast",
  },
  
  // Other racing series use TheSportsDB
  OTHER_SERIES: {
    useAlternativeAPI: false,
    useSportsDB: true,
  }
};

export function shouldUseAlternativeAPI(leagueId: string): boolean {
  return leagueId === API_CONFIG.FORMULA_1.leagueId && API_CONFIG.FORMULA_1.useAlternativeAPI;
}

// API endpoints
export const API_ENDPOINTS = {
  SPORTSDB: "https://www.thesportsdb.com/api/v1/json/3",
};