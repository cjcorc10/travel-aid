import FilterFlights from '../../components/filterflights';
import BookingForm from '../../components/bookingForm';
import FlightCard from '../../components/flightcard';
import { Filter } from 'lucide-react';

const Flights = () => {
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
  return (
    <div className="w-full h-screen absolute top-0 left-0 bg-emerald-50 flex flex-col pt-22 px-2">
      <BookingForm />
      <h2 className="mt-15 font-vice text-xl text-emerald-600 underline underline-offset-2 border-b-2 border-pink-300">
        Available Flights
      </h2>
      <FilterFlights />
      {flightData.departingFlights?.map((flight) => (
        <FlightCard flight={flight} />
      ))}
    </div>
  );
};

export default Flights;
