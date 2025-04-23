import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useContext } from 'react';
import AutoCompleteInput from '../autoCompleteInput';
import AirportsContext from '@/contexts/airports';

const BookingForm = () => {
  const airports = useContext(AirportsContext);
  console.log(airports);

  const { register, handleSubmit, control } = useForm<Inputs>({
    defaultValues: {
      isRoundTrip: true,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    console.log(formData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 border border-gray-100 shadow-md bg-white p-4 rounded-md font-montserrat "
    >
      <div className="flex gap-4">
        <div className="flex flex-col">
          <label className="text-sm">From</label>
          <Controller
            name="departing"
            control={control}
            defaultValue=""
            render={({ field: { value, onChange } }) => (
              <AutoCompleteInput
                value={value}
                onChange={onChange}
                airports={airports}
              />
            )}
          />
          <input
            {...register('departing')}
            className="border rounded-md p-1 w-full shadow-md border-gray-100 text-gray-700 outline-pink-200"
            type="text"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">To</label>
          <input
            {...register('destination')}
            className="border rounded-md p-1 w-full shadow-md border-gray-100 text-gray-700 outline-pink-200"
            type="text"
          />
        </div>
      </div>
      <div className="flex flex-col">
        <label className="text-sm">Departure date</label>
        <input
          {...register('from')}
          className="border rounded-md p-1 w-full shadow-md border-gray-100 text-gray-700 outline-pink-200"
          type="date"
        />
      </div>
      <div className="flex justify-center">
        <input
          type="submit"
          className="bg-emerald-600 shadow-md rounded-md text-white mt-2 p-1 px-2 font-bold"
          value="update search"
        />
      </div>
    </form>
  );
};

export default BookingForm;
