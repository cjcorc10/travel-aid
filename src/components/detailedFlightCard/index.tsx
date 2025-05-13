import { Plane } from "lucide-react"

type componentProps = {
    flight: Flight
}

const DetailedFlightCard = ({flight}: componentProps) => {
  return (
    <div
        className='bg-white border border-gray-100 shadow-md rounded-md px-4 mx-2 font-montserrat flex justify-between items-center gap-4'>
        <div className="flex gap-4 items-center">
            <Plane />
            <div>

            <h3 className="text-lg">{flight.departureTime} - {flight.arrivalTime}</h3>
            <p className="text-sm">{flight.airline}</p>
            </div>
        </div>
        <div className="text-sm">
            {flight.layovers ? `${flight.layovers} stops` : 'direct'}
        </div>
        <div>
            <h3 className="text-lg">{flight.duration}</h3>
            <p className="text-sm">{flight.origin}-{flight.destination}</p>
        </div>
    </div>
  )
}

export default DetailedFlightCard