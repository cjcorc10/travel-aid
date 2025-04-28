import { Plane, MoveRight, Clock } from 'lucide-react';

type Flight = {
  flightId: string;
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  departureTime: string;
  duration: string;
  arrivalTime: string;
  pricePerPassenger: number;
  layovers: number
};

const FlightCard = ({ flight }: { flight: Flight }) => {
  return (
    <div
      className="bg-white mt-2 border border-gray-100 shadow-md rounded-md py-2 px-4 font-montserrat flex flex-col gap-4"
      id={flight.flightId}
    >
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center">
          <Plane className="mr-4" />
          <div>
            <h3 className="font-bold text-xl leading-5">{flight.airline}</h3>
            <p className="text-gray-500 text-sm leading-none">
              {flight.flightNumber}
            </p>
          </div>
        </div>
        <div>
          <h2 className="font-bold text-xl leading-5 text-gray-600">
            ${flight.pricePerPassenger}
          </h2>
          <p className="text-gray-500 text-[.6rem] font-bold leading-none">
            per person
          </p>
        </div>
      </div>
      <div className="text-sm flex gap-6">
        <p className="border rounded-full px-2 bg-black text-white font-bold">{flight.layovers > 0 ?`${flight.layovers} layover(s)` : `direct flight`}</p>
        <div className="flex items-center">
          <Clock size={14} className="mr-1" />
          <p className="text-gray-500">{flight.duration}</p>
        </div>
      </div>
      <div className="flex  items-center gap-4 justify-center bg-gray-50 rounded-md p-2">
        <div>
          <h3 className="text-3xl font-bold font-vice">
            {flight.departureTime}
          </h3>
          <p className="text-sm text-gray-500 text-center">{flight.origin}</p>
        </div>
        <MoveRight size={32} color="pink" />
        <div>
          <h3 className="text-3xl font-bold font-vice">{flight.arrivalTime}</h3>
          <p className="text-sm text-gray-500 text-center">
            {flight.destination}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
