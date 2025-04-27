import { http, HttpResponse, delay } from 'msw';
import { faker } from '@faker-js/faker';
import airlines from '@/data/airlines.json';
import airports from '@/data/airports.json';
import { timeToTravel } from '@/components/services/flights';
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

  if (returnedAirlines.length === 0) return faker.airline.airline();

  const random = Math.floor(Math.random() * returnedAirlines.length);
  return returnedAirlines[random];
};

const getAirportByCode = (iata: string) => {
  const result = airports.filter((airport) => airport.code === iata)[0];
  return result;
};

const generateFlight = (params: URL) => {
  // get country airlines
  const origin = params.searchParams.get('departing');
  // ugly temp workaround when updating to country without airlines in record
  const airline = origin
    ? getAirlineByCountry(origin)
    : faker.airline.airline();

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

    // get origin & destination airports
    const origin = getAirportByCode(
      url.searchParams.get('departing')?.slice(0, 3) || ''
    );
    const destination = getAirportByCode(
      url.searchParams.get('destination')?.slice(0, 3) || ''
    );

    // calculate flight time between locations
    const time = timeToTravel(
      {
        longitude: Number(origin.longitude),
        latitude: Number(origin.latitude),
      },
      {
        longitude: Number(destination.longitude),
        latitude: Number(destination.latitude),
      }
    );

    console.log(time);

    const flights: Flights = {
      roundTrip: false,
      departingFlights: Array.from(new Array(24), (x) => generateFlight(url)),
      totalPassengers: 1,
    };

    const mockResponse: MockResponse = {
      body: flights,
    };
    await delay(1000);
    return HttpResponse.json(mockResponse, { status: 200 });
  }),
];
