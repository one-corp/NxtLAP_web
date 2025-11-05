// Formula 1 API service using Jolpi F1 API
// Simple and reliable F1 data source

export interface F1Race {
  raceName: string;
  season: string;
  round: string;
  date: string;
  time?: string;
  Circuit: {
    circuitId: string;
    circuitName: string;
    Location: {
      locality: string;
      country: string;
    };
  };
}

export class F1ApiService {
  static async getUpcomingF1Events(): Promise<any[]> {
    try {
      const currentYear = new Date().getFullYear();
      const url = `https://api.jolpi.ca/ergast/f1/${currentYear}.json`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        return this.getFallbackF1Data();
      }
      
      const data = await response.json();
      const races: F1Race[] = data.MRData?.RaceTable?.Races || [];
      
      if (races.length === 0) {
        return this.getFallbackF1Data();
      }
      
      // Filter for upcoming races
      const now = new Date();
      const upcomingRaces = races.filter(race => {
        const raceDate = new Date(race.date);
        return raceDate >= now;
      });
      
      if (upcomingRaces.length > 0) {
        return upcomingRaces.slice(0, 10).map(this.convertF1RaceToEvent);
      }
      
      // If no upcoming races, show all races
      return races.slice(0, 10).map(this.convertF1RaceToEvent);
      
    } catch (error) {
      console.error('Error fetching F1 events:', error);
      return this.getFallbackF1Data();
    }
  }

  static getFallbackF1Data(): any[] {
    
    const fallbackRaces = [
      {
        name: "Bahrain Grand Prix",
        circuit: "Bahrain International Circuit",
        location: "Sakhir",
        country: "Bahrain",
        date: "2025-03-16",
        round: "1"
      },
      {
        name: "Saudi Arabian Grand Prix",
        circuit: "Jeddah Corniche Circuit",
        location: "Jeddah",
        country: "Saudi Arabia", 
        date: "2025-03-23",
        round: "2"
      },
      {
        name: "Australian Grand Prix",
        circuit: "Albert Park Circuit",
        location: "Melbourne",
        country: "Australia",
        date: "2025-04-06",
        round: "3"
      },
      {
        name: "Chinese Grand Prix",
        circuit: "Shanghai International Circuit",
        location: "Shanghai",
        country: "China",
        date: "2025-04-20",
        round: "4"
      },
      {
        name: "Miami Grand Prix",
        circuit: "Miami International Autodrome",
        location: "Miami",
        country: "United States",
        date: "2025-05-04",
        round: "5"
      }
    ];
    
    return fallbackRaces.map((race, index) => ({
      idEvent: `f1_2025_${race.round}`,
      idLeague: "4370",
      idVenue: `circuit_${index}`,
      strEvent: race.name,
      intRound: race.round,
      strLeagueBadge: "https://r2.thesportsdb.com/images/media/league/badge/g8cofl1513623681.png",
      strVenue: race.circuit,
      strCity: race.location,
      strCountry: race.country,
      strLeague: "Formula 1",
      strPostponed: "no",
      strSeason: "2025",
      strTime: "14:00:00",
      strTimeLocal: "14:00:00",
      strTimestamp: new Date(`${race.date}T14:00:00`).toISOString(),
    }));
  }

  static convertF1RaceToEvent(race: F1Race): any {
    const raceDate = new Date(`${race.date}T${race.time || '14:00:00'}`);
    
    return {
      idEvent: `f1_${race.season}_${race.round}`,
      idLeague: "4370",
      idVenue: race.Circuit.circuitId,
      strEvent: race.raceName,
      intRound: race.round,
      strLeagueBadge: "https://r2.thesportsdb.com/images/media/league/badge/g8cofl1513623681.png",
      strVenue: race.Circuit.circuitName,
      strCity: race.Circuit.Location.locality,
      strCountry: race.Circuit.Location.country,
      strLeague: "Formula 1",
      strPostponed: "no",
      strSeason: race.season,
      strTime: raceDate.toTimeString().split(' ')[0],
      strTimeLocal: raceDate.toTimeString().split(' ')[0],
      strTimestamp: raceDate.toISOString(),
    };
  }
}