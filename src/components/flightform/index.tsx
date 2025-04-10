import { useForm, SubmitHandler } from "react-hook-form"
import { MockResponse } from '../../mocks/handlers'
import { useState } from "react"



// function to handle api call after form submission
const handleClick = async (setData: Setter) => {
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

type Setter = React.Dispatch<React.SetStateAction<MockResponse>>

// all inputs types on form
type Inputs = {
    departing: string
    destination: string
    from: Date
    to?: Date
    adults: number
    children: number
}

// define type for roundTrip state variable that controls from render
type TripType = "round-trip" | "one-way"


const FlightForm = ({setData}: {setData: Setter}) => {
    const { register, handleSubmit} = useForm<Inputs>({defaultValues: {adults: 1, children: 0}})
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        handleClick(setData);
        console.log(data);
    }

    const [roundTrip, setRoundTrip] = useState<TripType>("round-trip");

  return (
    <form 
        className="bg-white w-full flex flex-col rounded-lg shadow-lg mt-12 max-w-4xl min-w-lg border border-emerald-500"
        onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col p-8">
            <select
                className="border-3 border-emerald-500 rounded-lg px-2 p-1 mb-7"
                value={roundTrip}
                onChange={(e) => setRoundTrip(e.target.value as TripType)}>
                <option value="round-trip">Round-trip</option>
                <option value="one-way">One-way</option>
            </select>
            <div className="flex flex-col md:flex-row md:gap-6">
                <div className="flex flex-col flex-1">
                    <label
                        className="text-gray-600"
                        >From</label>
                    <input {...register("departing")}
                        className="border border-gray-300 rounded-lg mb-2 p-1 px-2 shadow-md outline-pink-200"/>
                </div>
                <div className="flex flex-col flex-1">
                    <label
                        className="text-gray-600"
                        >To</label>
                    <input {...register("destination")}
                        className="border border-gray-300 rounded-lg mb-2 p-1 px-2 shadow-md outline-pink-200"/>
                </div>
            </div>
            <div className="flex justify-around">
                <div className="flex flex-col">

                <label
                    className="text-gray-600">Adults</label>
                <input type="number" {...register("adults")}
                    className="border border-gray-300 p-1 px-2 rounded-lg w-14 mb-2 shadow-md outline-pink-200"/>
                    </div>
                    <div className="flex flex-col">

                <label
                    className="text-gray-600">Children</label>
                <input type="number" {...register("children")}
                    className="border border-gray-300 p-1 px-2 rounded-lg w-14 mb-2 shadow-md outline-pink-200"/>
                    </div>
            </div>
            <div className="flex flex-col md:flex-row md:gap-6">
                <div className="flex flex-col flex-1">

                    <label
                        className="text-gray-600">Date from</label>
                        <input type="date" {...register("from")}
                            className="border border-gray-300 rounded-lg mb-2 p-1 px-2 shadow-md outline-pink-200"/>
                </div>
                {roundTrip == "round-trip" && 
                    <div className="flex flex-col flex-1">
                    
                        <label
                            className="text-gray-600">Date to</label>
                        <input type="date" {...register("to")}
                            className="border border-gray-300 rounded-lg mb-2 p-1 px-2 shadow-md outline-pink-200"/>
                    </div>
                }
            </div>
        </div>
        <input 
            className="bg-emerald-600 overflow-clip rounded-b-lg p-2 text-green-50 font-bold hover:bg-emerald-700"
            type="submit" value="search"  />
    </form>
  )
}

export default FlightForm