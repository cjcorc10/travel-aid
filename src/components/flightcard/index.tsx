import { Ghost, MoveRight, Clock } from 'lucide-react';
import clsx from 'clsx';

type Flight = {
  flightId: string;
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  pricePerPassenger: number;
};

const FlightCard = ({ flight }: { flight: Flight }) => {
  console.log(flight);

  return (
    <div
      className="bg-white mt-2 border border-gray-100 shadow-md rounded-md py-2 px-4 font-montserrat flex flex-col gap-4"
      id={flight.flightId}
    >
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center">
          <Ghost className="mr-4" />
          <div>
            <h3 className="font-bold text-lg leading-5">{flight.airline}</h3>
            <p className="text-gray-500 text-sm leading-none">
              {flight.flightNumber}
            </p>
          </div>
        </div>
        <div>
          <h2 className="font-bold text-2xl leading-5">
            ${flight.pricePerPassenger}
          </h2>
          <p className="text-gray-500 text-[.6rem] font-bold leading-none">
            per person
          </p>
        </div>
      </div>

      <div className="text-sm flex gap-6">
        <p className="border rounded-full px-2 w-min">placeholder</p>
        <div className="flex items-center">
          <Clock size={14} className="mr-1" />
          <p className="text-gray-500">3h 30m</p>
        </div>
      </div>
      <div className="flex  items-center gap-4 justify-center bg-gray-50 rounded-md p-2">
        <div>
          <h3 className="text-3xl font-bold">8:00</h3>
          <p className="text-sm text-gray-500 text-center">{flight.origin}</p>
        </div>
        <MoveRight size={32} color="pink" />
        <div>
          <h3 className="text-3xl font-bold">11:30</h3>
          <p className="text-sm text-gray-500 text-center">
            {flight.destination}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
