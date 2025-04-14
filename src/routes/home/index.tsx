import { useState } from 'react';
import { MockResponse } from '../../mocks/handlers';
import FlightForm from '../../components/flightform';
import Hero from '../../components/hero';

const Home = () => {
  const [data, setData] = useState<MockResponse>({ body: 'Initial Data' });

  return (
    <div className="bg-green-50 font-montserrat flex items-center h-screen w-full flex-col absolute top-0 left-0">
      <div className="flex flex-1 flex-col md:flex-row w-full h-full">
        <Hero />
        <div className="flex flex-2 flex-col items-center justify-center md:pt-20 overflow-auto border-l border-green-600">
          <FlightForm setData={setData} />
          <p className="text-red-400 font-bold mt-4">
            {data.error || data.body}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
