import { http, HttpResponse, delay } from 'msw';
import { faker } from '@faker-js/faker';
import {
  timeToTravel,
  generateRandomTime,
  convertFromMilitary, 
  getFlightDuration
} from '@/mocks/handlerFunctions/time';
import { 
  getAirlineByCountry, 
  getAirportByCode, 
  getLayovers  } from './handlerFunctions/flightInfo';
export interface MockResponse {
  body?: Flights;
  error?: string;
}



const generateFlight = (params: URL, duration: number) => {
  /**
   * Calculate price
   * adults - 100%
   * kids - 70%
   */
  const price = duration * 45 + Math.random() * 90;
  

  // get airport codes for origin and destination
  const origin = params.searchParams.get('departing') || '';
  const originCode = origin.slice(0, 3);

  const destinationCode =
    params.searchParams.get('destination')?.slice(0, 3) || '';

  // generate alirline based on code
  const airline = getAirlineByCountry(origin);

  // departure time
  let [hour, minute] = generateRandomTime(6, 23);
  const [departureHour, departurePM] = convertFromMilitary(hour);
  
  // total travel time
  const layovers = (hour > 21) ? 0 : getLayovers(duration);
  const [totalHours, totalMins] = getFlightDuration(layovers, duration);

  // calculate timezone difference
  const originAirport = getAirportByCode(
    params.searchParams.get('departing')?.slice(0, 3) || ''
  );
  const destinationAirport = getAirportByCode(
    params.searchParams.get('destination')?.slice(0, 3) || ''
  );
  const timeZoneDiff =
    originAirport.timezone && destinationAirport.timezone
      ? originAirport.timezone - destinationAirport.timezone
      : 0;

  // arrival time
  let arrivalHour = hour + totalHours - timeZoneDiff;
  let arrivalMin = minute + totalMins;
  const [finalArrive, arrivePM] = convertFromMilitary(arrivalHour, arrivalMin);
  arrivalMin %= 60;

  return {
    flightId: faker.string.alphanumeric({ length: 6, casing: 'lower' }),
    flightNumber: `${airline.iataCode}${faker.airline.flightNumber({ addLeadingZeros: true })}`,
    airline: airline.name,
    origin: originCode,
    destination: destinationCode,
    departureTime: `${departureHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}${departurePM ? 'pm' : 'am'}`,
    duration: `${totalHours}h ${totalMins % 60}m`,
    arrivalTime: `${finalArrive.toString().padStart(2, '0')}:${arrivalMin.toString().padStart(2, '0')}${arrivePM ? 'pm' : 'am'}`,
    layovers,
    pricePerPassenger: price.toFixed(0),

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

    const flights: Flights = {
      roundTrip: false,
      departingFlights: Array.from(new Array(6), () =>
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
