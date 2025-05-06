import airports from '@/data/airports.json';
import airlines from '@/data/airlines.json';
import { faker } from '@faker-js/faker';


// parses country from input and selects an airline or generates a fake one
export const getAirlineByCountry = (airport: string) => {
  const country = airport.split(', ')[3];

  const returnedAirlines = airlines.filter(
    (airline) => airline.country.toLowerCase() === country.toLowerCase()
  );

  if (returnedAirlines.length === 0) return faker.airline.airline();

  const random = Math.floor(Math.random() * returnedAirlines.length);
  return returnedAirlines[random];
};

export const getAirportByCode = (iata: string) => {
  const result = airports.filter((airport) => airport.code === iata)[0];
  return result;
};

export const getLayovers = (duration: number) => {
  let layovers = Math.floor(Math.random() * 3);
  duration > 8 && layovers++;
  return layovers;
};
