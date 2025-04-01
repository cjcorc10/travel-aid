import { useState } from 'react'
import { MockResponse } from '../../mocks/handlers'

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
    <div className="flex flex-col m-5 gap-4">
      <h1 className="text-3xl font-bold underline">App</h1>
      <div className="flex gap-4 items-center">
        <button
          onClick={handleClick}
          className="bg-black hover:bg-black/80 hover:cursor-pointer text-white font-bold px-2 py-1 rounded duration-100 ease-in"
        >
          Click me
        </button>
        <p className="text-gray-700">{data.error || data.body}</p>
      </div>
    </div>
  )
}

export default Home
