import { useForm, SubmitHandler } from "react-hook-form"
import { useState } from "react"

interface Inputs {
    departing: string
    destination: string
    from: Date
    to?: Date
    adults: number
    children: number
}

type TripType = "round-trip" | "one-way"


const FlightForm = () => {
    const { register, handleSubmit} = useForm<Inputs>({defaultValues: {adults: 1}})
    //const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

    const [roundTrip, setRoundTrip] = useState<TripType>("round-trip");
  return (
    <form 
        className="bg-white flex flex-col border border-emerald-500 rounded-lg shadow-lg"
        onSubmit={handleSubmit((data) => {
            console.log(data);
        })}>
        <div className="flex flex-col p-8">
            <select
                className="border-3 border-emerald-500 rounded-lg px-2 p-1 mb-7"
                value={roundTrip}
                onChange={(e) => setRoundTrip(e.target.value as TripType)}>
                <option value="round-trip">Round-trip</option>
                <option value="one-way">One-way</option>
            </select>
            <label
                className="text-gray-600"
                >From</label>
            <input {...register("departing")}
                className="border border-gray-300 rounded-lg mb-4 p-1 px-2"/>
            <label
                className="text-gray-600"
                >To</label>
            <input {...register("destination")}
                className="border border-gray-300 rounded-lg mb-4 p-1 px-2"/>
            <div className="flex justify-around">
                <div className="flex flex-col">

                <label
                    className="text-gray-600">Adults</label>
                <input type="number" {...register("adults")}
                    className="border border-gray-300 p-1 px-2 rounded-lg w-14 mb-4"/>
                    </div>
                    <div className="flex flex-col">

                <label
                    className="text-gray-600">Children</label>
                <input type="number" {...register("children")}
                    className="border border-gray-300 p-1 px-2 rounded-lg w-14 mb-4"/>
                    </div>
            </div>
            <label
                className="text-gray-600">Date from</label>
                <input type="date" {...register("from")}
                    className="border border-gray-300 rounded-lg mb-4 p-1 px-2"/>
            {roundTrip == "round-trip" && 
                <>
                    <label
                        className="text-gray-600">Date to</label>
                    <input type="date" {...register("to")}
                        className="border border-gray-300 rounded-lg mb-4 p-1 px-2"/>
                </>
            }
        </div>
        <input 
            className="bg-emerald-600 overflow-clip rounded-b-lg p-2 text-green-50 font-bold hover:bg-emerald-700"
            type="submit"  />
    </form>
  )
}

export default FlightForm