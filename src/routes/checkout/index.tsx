import { ArrowRight, ArrowLeftRight } from "lucide-react"
import { useLocation } from "react-router"
import clsx from "clsx"

const Checkout = () => {
  const location = useLocation()
  const roundTrip = location.state.length == 2

  const url = new URLSearchParams(localStorage.getItem('previous search') || '')
  const origin = url.get(clsx(roundTrip ? 'destination' : 'departing'))?.split(', ')[2]
  const destination = url.get(clsx(roundTrip ? 'departing' : 'destination'))?.split(', ')[2]
  console.log(origin, destination)

  // get flight info time, cost, airline
  // first flight
  const departFlight = location.state[0]

  // second flight
  const returnFlight = location.state[1]
  

  return (
    <div>
      <h2 className="flex text-2xl gap-3 items-center justify-center my-4">{origin}{roundTrip ? <ArrowLeftRight /> : <ArrowRight />}{destination}</h2>
    </div>
  )
}

export default Checkout