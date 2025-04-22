import { useForm, SubmitHandler } from 'react-hook-form';
import { MockResponse } from '../../mocks/handlers';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { getFlights } from '../services/flights';
import clsx from 'clsx';

const FlightForm = ({
  setData,
}: {
  setData: React.Dispatch<React.SetStateAction<MockResponse | null>>;
}) => {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: { adults: 1, children: 0 },
  });

  const [roundTrip, setRoundTrip] = useState(true);

  // submits collected formData to API
  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    try {
      const data = await getFlights(formData);
      setData(data);
      navigate('/flights', { state: data });
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
        <div className="flex items-center mb-4">
          <div
            onClick={() => setRoundTrip((prev) => !prev)}
            className={clsx(
              'relative h-7 w-11 rounded-full inline-flex items-center',
              roundTrip
                ? 'bg-green-600 outline-2 outline-green-300'
                : 'bg-gray-500'
            )}
          >
            <div
              className={clsx(
                'h-6 w-6 bg-gray-100 rounded-full transform transition-transform',
                roundTrip ? 'translate-x-0.5' : 'translate-x-4.5'
              )}
            ></div>
          </div>
          <p
            className={clsx(
              'ml-2 text-gray-600',
              roundTrip && 'text-green-500'
            )}
          >
            round trip
          </p>
        </div>
        <div className="flex flex-col md:flex-row md:gap-6">
          <div className="flex flex-col flex-1">
            <label className="text-gray-600">From</label>
            <input
              aria-label="departing"
              {...register('departing')}
              className="border border-gray-300 rounded-lg mb-2 p-1 px-2 shadow-md outline-pink-200"
            />
          </div>
          <div className="flex flex-col flex-1">
            <label className="text-gray-600">To</label>
            <input
              aria-label="destination"
              {...register('destination')}
              className="border border-gray-300 rounded-lg mb-2 p-1 px-2 shadow-md outline-pink-200"
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
