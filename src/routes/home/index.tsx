import { useState } from 'react'
import { MockResponse } from '../../mocks/handlers'
import FlightForm from '../../components/flightform'
import Hero from '../../components/Hero'

const Home = () => {
  const [data, setData] = useState<MockResponse>({ body: 'Inital Data' })
  
  return (
    <div className="bg-green-50 font-ubuntu flex items-center h-screen flex-col">
      <div className="flex flex-1 flex-col md:flex-row w-full h-full">
        <Hero />
        <div className="flex flex-2 flex-col items-center md:pt-20 overflow-auto sm:px-4 border-l border-green-600">
          <FlightForm setData={setData}/>
          <p className='text-red-400 font-bold mt-4'>{data.error || data.body}</p>
        </div> 
      </div>
    </div>
  )
}

export default Home