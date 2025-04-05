import { useState } from 'react'
import { MockResponse } from '../../mocks/handlers'
import FlightForm from '../../components/flightform'
import Hero from '../../components/Hero'

const Home = () => {
  const [data, setData] = useState<MockResponse>({ body: 'Inital Data' })
  const handleClick = async () => {
    try {
      const response = await fetch('https://api.com/')
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      console.log(data)
      setData(data)
    } catch (error) {
      console.error('Error fetching data:', error)
      setData((prev) => {
        return { ...prev, error: 'Error fetching data' }
      })
    }
  }
  return (
    <div className="bg-gray-50 font-ubuntu flex justify-center p-4">
      <div className="flex flex-col md:flex-row mx-8 w-full max-w-7xl">
        <Hero />
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <FlightForm />
          {/* <h1 className="text-3xl font-bold underline text-emerald-700">App</h1>
            <div className="flex gap-4 items-center">
              <button
                onClick={handleClick}
                className="bg-emerald-700 hover:bg-emerald-600 hover:cursor-pointer text-emerald-50 font-bold px-2 py-1 rounded duration-100 ease-in"
                >
                Click me
              </button>
              <p className="text-gray-700">{data.error || data.body}</p>
            </div> */} 
        </div> 
      </div>
    </div>
  )
}

export default Home
