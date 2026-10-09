import rawData from '../data/morocco.json';

export interface Neighborhood {
  id: string;
  nameFr: string;
  nameAr: string;
  avgRentRoomMin?: number;
  avgRentRoomMax?: number;
}

export interface City {
  id: string;
  nameFr: string;
  nameAr: string;
  zipCode?: string;
  neighborhoods?: Neighborhood[];
}

export interface Region {
  code: string;
  nameFr: string;
  nameAr: string;
  cities: City[];
}

// In-memory data store
const regionsCache: Region[] = rawData as Region[];

export const db = {
  getRegions(): Region[] {
    return regionsCache;
  },

  getCities(regionCode?: string): City[] {
    if (regionCode) {
      const region = regionsCache.find((r) => r.code === regionCode);
      return region ? region.cities : [];
    }
    return regionsCache.flatMap((r) => r.cities);
  },

  getCityById(cityId: string): City | undefined {
    const targetId = cityId.toLowerCase();
    for (const region of regionsCache) {
      const city = region.cities.find((c) => c.id === targetId);
      if (city) return city;
    }
    return undefined;
  },

  getNeighborhoods(cityId: string): Neighborhood[] {
    const city = this.getCityById(cityId);
    return city?.neighborhoods || [];
  },

  searchCities(query: string): City[] {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return this.getCities().filter(
      (c) =>
        c.nameFr.toLowerCase().includes(q) ||
        c.nameAr.includes(q) ||
        c.id.includes(q)
    );
  }
};