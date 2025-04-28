type Inputs = {
  departing: string;
  destination: string;
  from: Date;
  to?: Date;
  adults: number;
  children: number;
  isRoundTrip?: boolean;
};

type Flights = {
  roundTrip: boolean;
  departingFlights: {
    flightId: string;
    flightNumber: string;
    airline: string;
    origin: string;
    destination: string;
    departureTime: string;
    duration: string;
    arrivalTime: string;
    layovers: number;
    pricePerPassenger: number;
  }[];
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
