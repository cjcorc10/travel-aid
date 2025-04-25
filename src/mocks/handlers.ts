import { http, HttpResponse, delay } from 'msw';
import { faker } from '@faker-js/faker';
import airlines from '@/data/airlines.json';
import airports from '@/data/airports.json';
export interface MockResponse {
  body: Flights;
  error?: string;
}

const getAirlineByCountry = (airport: string) => {
  // get country from airport param
  const country = airport.split(', ')[3];

  const returnedAirlines = airlines.filter(
    (airline) => airline.country.toLowerCase() === country.toLowerCase()
  );

  const random = Math.floor(Math.random() * returnedAirlines.length);
  return returnedAirlines[random];
};

const generateFlight = (params: URL) => {
  // select airline by origin country
  const airport = params.searchParams.get('departing');
  const airline = airport
    ? getAirlineByCountry(airport)
    : faker.airline.airline();

  // origin airport code
  const origin = params.searchParams.get('departing');
  const originCode = origin
    ? origin.slice(0, 3)
    : faker.string.alpha({ length: 3, casing: 'upper' });

  // destination aiprot code
  const destination = params.searchParams.get('destination');
  const destinationCode = destination
    ? destination.slice(0, 3)
    : faker.string.alpha({ length: 3, casing: 'upper' });

  return {
    flightId: `${faker.string.alphanumeric({ length: 6, casing: 'lower' })}`,
    flightNumber: `${airline.iataCode}${faker.airline.flightNumber({ addLeadingZeros: true })}`,
    airline: `${airline.name}`,
    origin: `${originCode}`,
    destination: `${destinationCode}`,
    departureTime: `00:00:00`,
    arrivalTime: `00:00:00`,
    pricePerPassenger: 100.0,
  };
};

export const handlers = [
  http.get('https://api.com', async ({ request }) => {
    const url = new URL(request.url);

    const flights: Flights = {
      roundTrip: false,
      departingFlights: Array.from(new Array(10), (x) => generateFlight(url)),
      totalPassengers: 1,
    };

    const mockResponse: MockResponse = {
      body: flights,
    };
    await delay(1000);
    return HttpResponse.json(mockResponse, { status: 200 });
  }),
];
