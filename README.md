# morocco-geo-data

[![npm version](https://img.shields.io/npm/v/morocco-geo-data.svg)](https://www.npmjs.com/package/morocco-geo-data)
[![npm downloads](https://img.shields.io/npm/dm/morocco-geo-data.svg)](https://www.npmjs.com/package/morocco-geo-data)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg)](https://www.typescriptlang.org/)

A lightweight, zero-dependency in-memory dataset for Moroccan regions, cities, and neighborhoods, with built-in location helpers and rental benchmarks for colocation use cases.

Designed for real-estate apps, address forms, search interfaces, and location-aware dashboards in Morocco.

---

## ✨ Features

- 🇲🇦 Moroccan region and city metadata with multilingual names
- 🏙️ Neighborhood lookups and city search helpers
- 💰 Rental benchmark fields such as `avgRentRoomMin` and `avgRentRoomMax`
- 🚀 In-memory access with no filesystem or network fetch at runtime
- ✅ Fully typed TypeScript support for both JS and TS consumers
- 📦 ESM and CommonJS builds

---

## 📦 Installation

### npm

```bash
npm install morocco-geo-data
```

### Yarn

```bash
yarn add morocco-geo-data
```

### pnpm

```bash
pnpm add morocco-geo-data
```

---

## 🚀 Quick Start

### ES Modules

```ts
import {
  getRegions,
  getCities,
  getCityById,
  getNeighborhoods,
  searchCities,
  db,
} from 'morocco-geo-data';

const regions = getRegions();
console.log(regions[0]);

const casablancaCities = getCities('01');
console.log(casablancaCities.length);

const city = getCityById('casablanca');
console.log(city?.nameFr);

const neighborhoods = getNeighborhoods('casablanca');
console.log(neighborhoods[0]);

const results = searchCities('rabat');
console.log(results);

console.log(db.getRegions());
```

### CommonJS

```js
const {
  getRegions,
  getCities,
  getCityById,
  getNeighborhoods,
  searchCities,
  db,
} = require('morocco-geo-data');

console.log(getRegions());
console.log(getCities('01'));
console.log(getCityById('casablanca'));
console.log(getNeighborhoods('casablanca'));
console.log(searchCities('fes'));
console.log(db.getRegions());
```

### Default import

```ts
import db from 'morocco-geo-data';

const allRegions = db.getRegions();
const allCities = db.getCities();
const city = db.getCityById('rabat');
```

---

## 🧭 Common Use Cases

### 1) List all regions

```ts
import { getRegions } from 'morocco-geo-data';

const regions = getRegions();
console.log(regions.map((region) => region.nameFr));
```

### 2) Get all cities in a specific region

```ts
import { getCities } from 'morocco-geo-data';

const cities = getCities('02'); // example region code
console.log(cities[0]);
```

### 3) Fetch a city by ID

```ts
import { getCityById } from 'morocco-geo-data';

const city = getCityById('casablanca');
if (city) {
  console.log(city.nameFr, city.zipCode);
}
```

### 4) List neighborhoods for a city

```ts
import { getNeighborhoods } from 'morocco-geo-data';

const neighborhoods = getNeighborhoods('casablanca');
console.log(neighborhoods.slice(0, 5));
```

### 5) Search cities by name or ID

```ts
import { searchCities } from 'morocco-geo-data';

const results = searchCities('marr');
console.log(results);
```

### 6) Use the underlying database object

```ts
import db from 'morocco-geo-data';

const region = db.getRegions().find((item) => item.code === '01');
const cities = db.getCities('01');
```

---

## 📘 API Reference

### Core exported functions

| Function | Signature | Returns | Description |
| --- | --- | --- | --- |
| `getRegions` | `() => Region[]` | `Region[]` | Returns all regions in the dataset. |
| `getCities` | `(regionCode?: string) => City[]` | `City[]` | Returns all cities, or only cities for a specific region if `regionCode` is provided. |
| `getCityById` | `(cityId: string) => City \| undefined` | `City \| undefined` | Finds a city by its ID (case-insensitive). |
| `getNeighborhoods` | `(cityId: string) => Neighborhood[]` | `Neighborhood[]` | Returns neighborhoods for the specified city. |
| `searchCities` | `(query: string) => City[]` | `City[]` | Searches cities by name or ID using a lowercase match. |

### Database object

```ts
import db from 'morocco-geo-data';
```

| Property / Method | Signature | Returns | Description |
| --- | --- | --- | --- |
| `db.getRegions` | `() => Region[]` | `Region[]` | Same as `getRegions()`. |
| `db.getCities` | `(regionCode?: string) => City[]` | `City[]` | Same as `getCities()`. |
| `db.getCityById` | `(cityId: string) => City \| undefined` | `City \| undefined` | Same as `getCityById()`. |
| `db.getNeighborhoods` | `(cityId: string) => Neighborhood[]` | `Neighborhood[]` | Same as `getNeighborhoods()`. |
| `db.searchCities` | `(query: string) => City[]` | `City[]` | Same as `searchCities()`. |

### Data types

```ts
interface Neighborhood {
  id: string;
  nameFr: string;
  nameAr: string;
  avgRentRoomMin?: number;
  avgRentRoomMax?: number;
}

interface City {
  id: string;
  nameFr: string;
  nameAr: string;
  zipCode?: string;
  neighborhoods?: Neighborhood[];
}

interface Region {
  code: string;
  nameFr: string;
  nameAr: string;
  cities: City[];
}
```

---

## 🧪 Example output

```ts
const city = getCityById('casablanca');

console.log(city);
// {
//   id: 'casablanca',
//   nameFr: 'Casablanca',
//   nameAr: 'الدار البيضاء',
//   zipCode: '20200',
//   neighborhoods: [ ... ]
// }
```

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 💬 Notes

- The data is loaded once into memory and reused for all lookups.
- The package is designed for browser and Node.js environments when used as a library.
- Type declarations are generated automatically for TypeScript consumers.
