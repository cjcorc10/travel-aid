import FilterFlights from '@/components/filterflights';
import BookingForm from '@/components/bookingForm';
import FlightCard from '@/components/flightcard';
import { useSearchParams } from 'react-router';
import { useEffect, useState } from 'react';
import { getFlights } from '@/components/services/flights';
import { motion } from 'motion/react';

const Flights = () => {
  const [flights, setFlights] = useState<Flights>();
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  // fetch flight data and set as state for render
  useEffect(() => {
    setIsLoading(true);

    // check to see if we already have this flightData
    const prevFlight = localStorage.getItem('previous flights');
    const prevSearch = localStorage.getItem('previous search');
    if (searchParams.toString() == prevSearch && prevFlight) {
      setFlights(JSON.parse(prevFlight));
      setIsLoading(false);
      return;
    }

    // fetch new flight data
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
        // Insert Shadcn skeleton here
        <p>loading placeholder...</p>
      ) : (
        flights?.departingFlights?.map((flight, idx) => (
          <motion.div
            key={flight.flightId}
            initial={{ opacity: 0, translateY: '20px' }}
            whileInView={{ opacity: 1, translateY: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: idx < 3 ? (idx % 3) * 0.2 : 0.2,
              duration: 0.5,
            }}
          >
            <FlightCard flight={flight} />
          </motion.div>
        ))
      )}
    </div>
  );
};

export default Flights;
