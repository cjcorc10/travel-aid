import FilterFlights from '@/components/filterflights';
import BookingForm from '@/components/bookingForm';
import FlightCard from '@/components/flightcard';
import { useSearchParams } from 'react-router';
import { useEffect, useState } from 'react';
import { getFlights } from '@/components/services/flights';

const Flights = () => {
  const [flights, setFlights] = useState<Flights>();
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  // fetch flight data on load and whenever form in <BookingForm/> is submitted. This updates the ticket request
  useEffect(() => {
    setIsLoading(true);

    // check to see if we already have this flightData
    const prevFlight = localStorage.getItem('previous flights');
    const prevSearch = localStorage.getItem('previous search');
    if (searchParams.toString() == prevSearch && prevFlight) {
      setFlights(JSON.parse(prevFlight));
      console.log('this search was already completed');
      setIsLoading(false);
      return;
    }

    (async () => {
      const data = await getFlights(searchParams.toString());
      setFlights(data.body);
      localStorage.setItem('previous search', searchParams.toString());
      localStorage.setItem('previous flights', JSON.stringify(data.body));
      setIsLoading(false);
    })();
  }, [searchParams]);

  return (
    <div className="w-full h-screen absolute top-0 left-0 bg-emerald-50 flex flex-col pt-22 px-2">
      <BookingForm
        params={searchParams}
        setParams={(x) => setSearchParams(x)}
      />
      <FilterFlights />
      {isLoading ? (
        <p>loading placeholder...</p>
      ) : (
        flights?.departingFlights?.map((flight) => (
          <FlightCard flight={flight} key={flight.flightId} />
        ))
      )}
    </div>
  );
};

export default Flights;
