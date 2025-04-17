import { useState } from 'react';
import { MockResponse } from '../../mocks/handlers';
import FlightForm from '../../components/flightform';
import Hero from '../../components/hero';

const Home = () => {
  const [data, setData] = useState<MockResponse | null>(null);

  return (
    <div className="bg-green-50 font-montserrat h-screen md:h-[calc(100vh-4rem)] w-full flex md:flex-row flex-col">
      <div className="md:flex-1 h-full relative overflow-hidden border-b md:border-r border-green-600 ">
        <Hero />
      </div>
      <div className="flex md:flex-2 flex-col items-center justify-center my-8">
        <FlightForm setData={setData} />
      </div>
    </div>
  );
};

export default Home;
