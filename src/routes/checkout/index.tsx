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


  // get flights and adult/child prices
  const flights = location.state
  const adultPrices = flights.map((flight: Flight) => Number(flight.pricePerPassenger))
  const kidsPrices = flights.map((flight: Flight) => Number(flight.discountedPrice))
  const totalAdult = adultPrices.reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0)
  const totalKids = kidsPrices.reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0)
  
  return (
    <div className="flex flex-col px-2 font-montserrat bg-green-50 absolute top-0 left-0 pt-16 w-full min-h-screen">
      <h2 className="flex text-xl gap-3 font-bold text-gray-700 items-center mt-4 ">{origin}{roundTrip ? <ArrowLeftRight size={16} color="pink"/> : <ArrowRight size={16} color="pink"/>}{destination}</h2>
      <div className="flex items-center text-sm mb-8">
        <User size={20}/>
        <p className="ml-1">{Number(adults) + Number(children)} passenger</p>
        <CircleSmall size={12} className="mx-2" color="green"/>
        <p>{roundTrip ? 'roundtrip' : 'one-way'}</p>
      </div>
      <h3 className="font-bold text-emerald-700">Selected flights</h3>
      <div className="flex-1 flex flex-col justify-between">

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
          <div className="flex flex-col items-end">
            <p>{adults} adult(s)...  ${Number(adults) * (totalAdult)}</p>
            {children && Number(children) > 0 && <p>{children} child(ren)... ${Number(children) * (totalKids)} </p>}
            <h2 className="text-2xl text-green-600 font-bold">${Number(children) > 0 ? totalAdult + totalKids : totalAdult}</h2>
            <p className="text-sm">lowest total price</p>
            <button className="border px-2 py-1 text-2xl bg-green-700 text-green-50 rounded-md">Place order</button>
          </div>

        </div>
    </div>
  )
}

export default Checkout