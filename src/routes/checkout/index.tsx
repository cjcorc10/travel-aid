import { ArrowRight, ArrowLeftRight } from "lucide-react"
import { useLocation } from "react-router"
import clsx from "clsx"
import DetailedFlightCard from "@/components/detailedFlightCard"
import FlightCard from "@/components/flightcard"

const Checkout = () => {
  const location = useLocation()
  const roundTrip = location.state.length == 2

  const url = new URLSearchParams(localStorage.getItem('previous search') || '')
  const origin = url.get(clsx(roundTrip ? 'destination' : 'departing'))?.split(', ')[2]
  const destination = url.get(clsx(roundTrip ? 'departing' : 'destination'))?.split(', ')[2]
  console.log(origin, destination)

  // get flight info time, cost, airline
  // first flight
  const flights = location.state
  

  return (
    <div className="px-2 font-montserrat">
      <h2 className="flex text-xl gap-3 font-bold text-gray-700 items-center my-4 ">{origin}{roundTrip ? <ArrowLeftRight size={16} color="pink"/> : <ArrowRight size={16} color="pink"/>}{destination}</h2>
      
      <h3 className="font-bold text-emerald-700">Selected flights</h3>
      <div>
        {flights.map((flight: Flight) => (
          <FlightCard flight={flight} />
          // <DetailedFlightCard flight={flight}/>
        ))}
      </div>
    </div>
  )
}

export default Checkout