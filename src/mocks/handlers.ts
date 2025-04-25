import { http, HttpResponse } from 'msw';
import { faker } from '@faker-js/faker';
import { mock } from 'node:test';
export interface MockResponse {
  body: Flights;
  error?: string;
}

const flightData: Flights = {
  roundTrip: false,
  departingFlights: [
    {
      flightId: 'xyz987',
      flightNumber: 'AA101',
      airline: 'Delta',
      origin: 'JFK',
      destination: 'LAX',
      departureTime: '2025-04-20T08:00:00',
      arrivalTime: '2025-04-20T11:00:00',
      pricePerPassenger: 300.0,
    },
    {
      flightId: 'abc123',
      flightNumber: 'AA102',
      airline: 'Spirit',
      origin: 'JFK',
      destination: 'LAX',
      departureTime: '2025-04-20T10:00:00',
      arrivalTime: '2025-04-20T13:00:00',
      pricePerPassenger: 350.0,
    },
  ],
  totalPassengers: 3,
};

const generateFlight = (params: URL) => {
  // gather required parameters to generate flight data
  const origin = params.searchParams.get('departing').slice(0, 3);
  const destination = params.searchParams.get('destination').slice(0, 3);
  const fromDate = params.searchParams.get('from');
  const toDate = params.searchParams.get('to');
  const airline = faker.airline.airline();

  const roundTrip = toDate == '';

  return {
    flightId: `${faker.string.alphanumeric({ length: 6, casing: 'lower' })}`,
    flightNumber: `${airline.iataCode}${faker.airline.flightNumber({ addLeadingZeros: true })}`,
    airline: `${airline.name}`,
    origin,
    destination,
    departureTime: `${fromDate}00:00:00`,
    arrivalTime: `${fromDate}00:00:00`,
    pricePerPassenger: 100.0,
  };
};

export const handlers = [
  http.get('https://api.com', ({ request }) => {
    const url = new URL(request.url);

    const flights: Flights = {
      roundTrip: false,
      departingFlights: Array.from(new Array(10), (x) => generateFlight(url)),
      totalPassengers: 1,
    };

    const mockResponse: MockResponse = {
      body: flights,
    };
    setTimeout(() => null, 3000);
    return HttpResponse.json(mockResponse, { status: 200 });
  }),
];
