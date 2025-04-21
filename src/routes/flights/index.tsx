import FilterFlights from '../../components/filterflights';
import BookingForm from '../../components/bookingForm';
import FlightCard from '../../components/flightcard';
import { useLocation } from 'react-router';

const Flights = () => {
  const location = useLocation();
  const flightData: Flights = location.state?.body;

  return (
    <div className="w-full h-screen absolute top-0 left-0 bg-emerald-50 flex flex-col pt-22 px-2">
      <BookingForm />
      <FilterFlights />
      {flightData?.departingFlights?.map((flight) => (
        <FlightCard flight={flight} />
      ))}
    </div>
  );
};

export default Flights;
