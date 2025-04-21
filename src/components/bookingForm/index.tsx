import { useForm, SubmitHandler } from 'react-hook-form';

const BookingForm = () => {
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    console.log(formData);
  };

  return (
    <form className="flex flex-col gap-2 border border-gray-100 shadow-md bg-white p-4 rounded-md font-montserrat">
      <div className="flex gap-4">
        <div className="flex flex-col">
          <label className="text-sm">From</label>
          <input
            {...register('from')}
            className="border rounded-md p-1 w-full shadow-md border-gray-100 bg-gray-50 text-gray-700"
            type="text"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">To</label>
          <input
            {...register('to')}
            className="border rounded-md p-1 w-full shadow-md border-gray-100 bg-gray-50 text-gray-700"
            type="text"
          />
        </div>
      </div>
      <div className="flex flex-col">
        <label className="text-sm">Dates</label>
        <input
          className="border rounded-md p-1 w-full shadow-md border-gray-100 bg-gray-50 text-gray-700"
          type="date"
        />
      </div>
    </form>
  );
};

export default BookingForm;
