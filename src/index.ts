import { db } from './db';

export * from './db';

export const getRegions = () => db.getRegions();
export const getCities = (regionCode?: string) => db.getCities(regionCode);
export const getCityById = (cityId: string) => db.getCityById(cityId);
export const getNeighborhoods = (cityId: string) => db.getNeighborhoods(cityId);
export const searchCities = (query: string) => db.searchCities(query);

export default db;