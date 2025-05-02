type Inputs = {
  departing: string;
  destination: string;
  from: string;
  to?: string;
  adults: number;
  children: number;
  isRoundTrip?: boolean;
  [Symbol.iterator]()
};

type Flight = {
  flightId: string;
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  departureTime: string;
  duration: string;
  arrivalTime: string;
  pricePerPassenger: string;
  layovers: number;
  discountedPrice: number
};

type Flights = {
  roundTrip: boolean;
  departingFlights: Flight[]
  totalPassengers: number;
};

type Airport = {
  airport: string;
  city: string;
  country: string;
  code: string;
  longitude: number;
  latitude: number;
};

type Coordinate = {
  longitude: number;
  latitude: number;
};
