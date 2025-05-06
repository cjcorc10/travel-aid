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



const generateFlight = (params: URL, duration: number): Flight => {
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
  const [hour, minute] = generateRandomTime(6, 23);
  
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
  let arrivalHour = Math.floor(hour + totalHours - timeZoneDiff)
  let arrivalMin = minute + totalMins;
  const [finalArrive, arrivePM] = convertFromMilitary(arrivalHour, arrivalMin);
  arrivalMin %= 60;

  return {
    flightId: faker.string.alphanumeric({ length: 6, casing: 'lower' }),
    flightNumber: `${airline.iataCode}${faker.airline.flightNumber({ addLeadingZeros: true })}`,
    airline: airline.name,
    origin: originCode,
    destination: destinationCode,
    departureTime: `${hour}.${minute}`,
    // duration: `${totalHours}h ${totalMins % 60}m`,
    duration: `${totalHours}.${totalMins}`,
    arrivalTime: `${finalArrive.toString().padStart(2, '0')}:${arrivalMin.toString().padStart(2, '0')}${arrivePM ? 'pm' : 'am'}`,
    layovers: layovers.toString(),
    pricePerPassenger: price.toFixed(0),
  };
};

export const handlers = [
  http.get('/flights', async ({ request }) => {
    await delay(1000);
    const url = new URL(request.url);

    // get origin & destination airports
    const origin = getAirportByCode(
      url.searchParams.get('departing')?.slice(0, 3) || ''
    );
    const destination = getAirportByCode(
      url.searchParams.get('destination')?.slice(0, 3) || ''
    );

    if(origin === null || destination === null) {
      const mockResponse: MockResponse = {
        error: "Flight information not found" 
      }
      return HttpResponse.json(mockResponse, {status: 400 })
    }
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
      departingFlights: Array.from(new Array(8 + Math.floor(Math.random() * 10 * 2)), () =>
        generateFlight(url, time)
      ),
      totalPassengers: 1,
    };

    const mockResponse: MockResponse = {
      body: flights,
    };

    return HttpResponse.json(mockResponse, { status: 200 });
  }),
];
