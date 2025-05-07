import { ArrowRight, ArrowLeftRight } from "lucide-react"
import { useLocation } from "react-router"
import clsx from "clsx"
import FlightCard from "@/components/flightcard"
import { motion } from 'motion/react';
import { User, CircleSmall } from "lucide-react";

const Checkout = () => {
  const location = useLocation()
  const roundTrip = location.state.length == 2

  const url = new URLSearchParams(localStorage.getItem('previous search') || '')
  const origin = url.get(clsx(roundTrip ? 'destination' : 'departing'))?.split(', ')[2]
  const destination = url.get(clsx(roundTrip ? 'departing' : 'destination'))?.split(', ')[2]
  const adults = url.get('adults')
  const children = url.get('children')

  console.log(children)

  // get flights and adult/child prices
  const flights = location.state
  const adultPrices = flights.map((flight: Flight) => Number(flight.pricePerPassenger))
  const kidsPrices = flights.map((flight: Flight) => Number(flight.discountedPrice))
  const totalAdult = adultPrices.reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0)
  const totalKids = kidsPrices.reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0)
  
  return (
    <div className="flex flex-col px-2 font-montserrat bg-green-50 absolute top-0 left-0 pt-16 w-full min-h-screen">
      <h2 className="flex text-xl gap-3 font-bold text-gray-700 items-center mt-4 ">{origin}{roundTrip ? <ArrowLeftRight size={16} color="pink"/> : <ArrowRight size={16} color="pink"/>}{destination}</h2>
      <div className="flex justify-between text-sm ">
        <div className="flex items-start">
          <User size={20}/>
          <p className="ml-1">{Number(adults) + Number(children)} passenger(s)</p>
          <CircleSmall size={12} className="mx-2" color="green" />
          <p>{roundTrip ? 'roundtrip' : 'one-way'}</p>
        </div>
        <div className="flex flex-col items-end pt-6">
          <h2 className="text-3xl text-green-600 font-bold">${Number(children) > 0 ? totalAdult * (Number(adults) + Number(children)) : totalAdult * Number(adults)}</h2>
          <p className="text-sm relative bottom-2">lowest total price</p>
        </div>
      </div>
      <div className="flex-1 flex flex-col">
      <h3 className="font-bold text-emerald-700 mt-4">Selected flights</h3>

        <div>
          {flights.map((flight: Flight, idx: number) => (
            <motion.div
            key={flight.flightId}
            initial={{ opacity: 0, translateY: '20px' }}
            whileInView={{ opacity: 1, translateY: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: idx * 0.2, duration: 0.5
            }}>
              <FlightCard flight={flight} />
            </motion.div>
          ))}
        </div>
          <button className=" px-2 py-1 mt-2 text-2xl bg-emerald-600 text-green-50 rounded-md shadow-md hover:bg-green-800">Place order</button>
        </div>
    </div>
  )
}

export default Checkout