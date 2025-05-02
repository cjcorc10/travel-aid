import FilterFlights from '@/components/filterflights';
import BookingForm from '@/components/bookingForm';
import FlightCard from '@/components/flightcard';
import { useSearchParams } from 'react-router';
import { useEffect, useState } from 'react';
import { getFlights } from '@/services/flights';
import { motion } from 'motion/react';
import { LoaderCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import FlightPagination from '@/components/flightPagination';



const MAX_FLIGHTS_PER_PAGE = 10

const Flights = () => {
  const [flights, setFlights] = useState<Flights>();
  const [isLoading, setIsLoading] = useState(true);
  const [isDepart, setIsDepart] = useState(true)
  const [isError, setIsError] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchParams, setSearchParams] = useSearchParams();

  const handlePageChange = (page: number) => setCurrentPage(prev => prev + page)
  

  // fetch flight data and set as state for render
  useEffect(() => {
    setIsLoading(true);
    setIsError(false)

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
      try {
        const data = await getFlights(searchParams.toString());
        setFlights(data.body);
        localStorage.setItem('previous search', searchParams.toString());
        localStorage.setItem('previous flights', JSON.stringify(data.body));
      } catch(e) {
        setIsError(true)
        console.log(e)
      }
      setIsLoading(false);
    })();
  }, [searchParams]);

  return (
    <div className="w-full min-h-screen absolute top-0 left-0 bg-emerald-50 flex flex-col pt-20 px-2">
      <h2 className='text-2xl font-bold text-green-600 pb-2'>{isDepart ? 'Departing' : 'Returning'} flights</h2>
      <BookingForm
        params={searchParams}
        isDepart={isDepart}
        updateParams={(key, value) => {
          setSearchParams(params => {
            params.set(key, value);
            return params
          })
          }}
      />
      <FilterFlights />
      {isLoading ? (
        <div className='flex justify-center p-12'>
        <LoaderCircle size={48} color={'green'} className='animate-spin'/>
        </div>
      
      ) : (
        isError ? <h3>Unable to find flight data... Please select airport from dropdown</h3> :
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
            <FlightCard flight={flight} handleClick={() => {
              // function to swap origin and destination if roundtrip
              const params = new URLSearchParams()
              for(let [key, value] of searchParams) {
                if(key === 'destination')
                  params.set('departing', value)
                else if(key === 'departing')
                  params.set('destination', value)
                else
                params.set(key,value)
              }
                setIsDepart(false)
                setSearchParams(params);
              }}/>
          </motion.div>
        ))
      )}
      <div className='py-8 flex justify-center gap-4 text-pink-400'>
      { !isLoading && !isError && <FlightPagination handlePageChange={handlePageChange} currentPage={currentPage} totalPages={flights?.departingFlights.length}/>}
      </div>
    </div>
  );
};

export default Flights;