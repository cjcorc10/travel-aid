type Inputs = {
  departing: string;
  destination: string;
  from: Date;
  to?: Date;
  adults: number;
  children: number;
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
    arrivalTime: string;
    pricePerPassenger: number;
  }[];
  totalPassengers: number;
};
