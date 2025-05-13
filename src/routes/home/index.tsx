import FlightForm from '../../components/flightform';
import Hero from '../../components/hero';

const Home = () => {
  return (
    <div className="bg-emerald-50 font-montserrat min-h-screen md:h-[calc(100vh-4rem)] w-full flex md:flex-row flex-col">
      <div className="h-100 md:flex-1 md:h-full relative overflow-hidden border-b md:border-r border-green-600 ">
        <Hero />
      </div>
      <div className="flex md:flex-2 flex-col items-center justify-center my-12 md:px-2">
        <FlightForm />
      </div>
    </div>
  );
};

export default Home;
