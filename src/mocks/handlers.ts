import { http, HttpResponse, delay } from 'msw';
import { faker } from '@faker-js/faker';
import airlines from '@/data/airlines.json';
import airports from '@/data/airports.json';
import { timeToTravel, generateRandomTime } from '@/components/services/time';
export interface MockResponse {
  body: Flights;
  error?: string;
}

// parses country from input and selects an airline or generates a fake one
const getAirlineByCountry = (airport: string) => {
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

const generateFlight = (params: URL, duration: number) => {
  // get airport codes for origin and destination
  const origin = params.searchParams.get('departing') || '';
  const originCode = origin.slice(0, 3);

  const destinationCode =
    params.searchParams.get('destination')?.slice(0, 3) || '';

  // generate alirline based on code
  const airline = getAirlineByCountry(origin);

  // get layovers

  // get cost

  // get departure time
  let [hour, minute] = generateRandomTime(6, 23);

  // MAKE A FUNCTION FOR CONVERTING MILITARY TO STANDARD TIME
  // calculate arrivaltime
  let pm = false;
  const durationHour = Math.floor(duration);
  const durationMinutes = Math.floor((duration % 1) * 60);

  let arrivalMin = minute + durationMinutes;
  if (arrivalMin > 60) {
    arrivalMin = arrivalMin % 60;
    hour++;
  }

  let arrivalHour = hour + durationHour;
  while (arrivalHour > 12) {
    if (arrivalHour > 24) {
      arrivalHour = arrivalHour % 24;
    } else if (arrivalHour > 12) {
      arrivalHour = arrivalHour % 13;
      arrivalHour++;
      pm = true;
    }
  }

  return {
    flightId: `${faker.string.alphanumeric({ length: 6, casing: 'lower' })}`,
    flightNumber: `${airline.iataCode}${faker.airline.flightNumber({ addLeadingZeros: true })}`,
    airline: `${airline.name}`,
    origin: `${originCode}`,
    destination: `${destinationCode}`,
    departureTime: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
    duration: `${durationHour}h ${durationMinutes}m`,
    arrivalTime: `${arrivalHour.toString().padStart(2, '0')}:${arrivalMin.toString().padStart(2, '0')}`,
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
      departingFlights: Array.from(new Array(24), (x) =>
        generateFlight(url, time)
      ),
      totalPassengers: 1,
    };

    const mockResponse: MockResponse = {
      body: flights,
    };
    await delay(1000);
    return HttpResponse.json(mockResponse, { status: 200 });
  }),
];
