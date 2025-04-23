import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { MockResponse } from '../../mocks/handlers';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { getFlights } from '../services/flights';
import Switch from '../switch';
import AutoCompleteInput from '../autoCompleteInput';

const FlightForm = () => {
  const [flightData, setData] = useState<MockResponse | null>(null);

  const navigate = useNavigate();

  const { register, handleSubmit, control } = useForm<Inputs>({
    defaultValues: { adults: 1, children: 0 },
  });

  const [roundTrip, setRoundTrip] = useState(true);

  // submits collected formData to API
  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    try {
      // request flights
      const data = await getFlights(formData);

      // set returned flight data to state
      setData(data);

      // navigate to pick flights on /flights and pass returned data
      navigate('/flights', { state: { data, formData } });
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  return (
    <form
      aria-label="form"
      className="bg-white w-full flex flex-col md:rounded-lg shadow-lg  max-w-4xl border border-gray-200"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col p-8">
        <Switch
          onClick={() => setRoundTrip((prev) => !prev)}
          state={roundTrip}
        />
        <div className="flex flex-col md:flex-row md:gap-6">
          <div className="flex flex-col flex-1">
            <label className="text-gray-600">From</label>
            <Controller
              name="departing"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <AutoCompleteInput value={value} onChange={onChange} />
              )}
            />
          </div>
          <div className="flex flex-col flex-1">
            <label className="text-gray-600">To</label>
            <Controller
              name="destination"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <AutoCompleteInput value={value} onChange={onChange} />
              )}
            />
          </div>
        </div>
        <div className="flex justify-around">
          <div className="flex flex-col">
            <label className="text-gray-600">Adults</label>
            <input
              aria-label="adults"
              type="number"
              {...register('adults')}
              className="border border-gray-300 p-1 px-2 rounded-lg w-14 mb-2 shadow-md outline-pink-200"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600">Children</label>
            <input
              aria-label="children"
              type="number"
              {...register('children')}
              className="border border-gray-300 p-1 px-2 rounded-lg w-14 mb-2 shadow-md outline-pink-200"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:gap-6">
          <div className="flex flex-col flex-1">
            <label className="text-gray-600">Date from</label>
            <input
              aria-label="from"
              type="date"
              {...register('from')}
              className="border border-gray-300 rounded-lg mb-2 p-1 px-2 shadow-md outline-pink-200"
            />
          </div>
          {roundTrip && (
            <div className="flex flex-col flex-1">
              <label className="text-gray-600">Date to</label>
              <input
                aria-label="to"
                type="date"
                {...register('to')}
                className="border border-gray-300 rounded-lg mb-2 p-1 px-2 shadow-md outline-pink-200"
              />
            </div>
          )}
        </div>
      </div>
      <input
        className="bg-emerald-600 overflow-clip md:rounded-b-lg p-2 text-green-50 font-bold hover:bg-emerald-700"
        type="submit"
        value="search"
      />
    </form>
  );
};

export default FlightForm;
