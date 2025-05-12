type Inputs = {
  departing: string;
  destination: string;
  from: string;
  to?: string;
  adults: number;
  children: number;
  [Symbol.iterator]()
};

type Flight = {
  flightId: string;
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  [departureTime: string]: string;
  [duration: string]: string;
  arrivalTime: string;
  [pricePerPassenger: string]: string;
  layovers: string;
};

type Flights = {
  departingFlights: Flight[]
  totalPassengers: number;
};

type Airport = {
  airport: string;
  city: string;
  country: string;
  code: string;
  longitude: string;
  latitude: string;
  timezone: number;
};

type Coordinate = {
  longitude: number;
  latitude: number;
};

type Filters = {
  stops?: number,
  price?: number,
  departureTime?: number[] 
}

type FilterFunctions = (flight: Flight) => boolean