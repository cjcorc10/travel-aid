import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import AutoCompleteInput from '../autoCompleteInput';
import { useEffect } from 'react';


type componentProps = {
  params: URLSearchParams;
  updateParams: (key: any, value: any) => void,
  isDepart: boolean
};

const BookingForm = ({ params, updateParams, isDepart }: componentProps) => {
  const { register, handleSubmit, control, reset } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    // update parameters with new form input
    for(let [key, value] of Object.entries(formData)) {
      updateParams(key, value)
    }
  };

  // update fields of form after first flight is selected to show return flights
  useEffect(() => {
    reset({
      departing: params.get('departing') || undefined,
      destination: params.get('destination') || undefined,
      from: params.get(isDepart ? 'from' : 'to') || undefined
    })
  }, [params])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 border border-gray-100 shadow-md bg-white p-4 rounded-md font-montserrat "
    >
      <legend className='pb-2 text-emerald-600'>Edit {isDepart ? 'departing' : 'return'} flight</legend>
      <div className="flex gap-4">
        <div className="flex flex-col">
          <label className="text-sm">From</label>
          <Controller
          name="departing"
          control={control}
          defaultValue={params.get('departing') || undefined}
          render={({ field: { value, onChange } }) => (
            <AutoCompleteInput value={value} onChange={onChange} />
          )}
          />
          </div>
        <div className="flex flex-col">
          <label className="text-sm">To</label>
          <Controller
            name="destination"
            control={control}
            defaultValue={params.get('destination') || undefined}
            render={({ field: { value, onChange } }) => (
              <AutoCompleteInput value={value} onChange={onChange} />
            )}
          />
        </div>
      </div>
      <div className="flex flex-col">
        <label className="text-sm">{isDepart ? 'Departure' : 'Return'} date</label>
        <input
          {...register('from')}
          defaultValue={params.get('from') || ''}
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
