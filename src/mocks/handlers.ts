import { http, HttpResponse } from 'msw';
export interface MockResponse {
  body: Flights;
  error?: string;
}

const flightData: Flights = {
  roundTrip: false,
  departingFlights: [
    {
      flightId: 'abc123',
      flightNumber: 'AA101',
      airline: 'Delta',
      origin: 'JFK',
      destination: 'LAX',
      departureTime: '2025-04-20T08:00:00',
      arrivalTime: '2025-04-20T11:00:00',
      pricePerPassenger: 300.0,
    },
    {
      flightId: 'xyz789',
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

const mockResponse: MockResponse = {
  body: flightData,
};
export const handlers = [
  http.get('https://api.com', () => {
    return HttpResponse.json(mockResponse, { status: 200 });
  }),
];
