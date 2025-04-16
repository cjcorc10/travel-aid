import { Clock, DollarSign } from 'lucide-react';

const FilterFlights = () => {
  return (
    <div className="mt-2 flex gap-2">
      <input
        type="text"
        placeholder="filter by text.."
        className="bg-white rounded-md shadow-md p-2 flex-1"
      />
      <button className="bg-green-600 rounded-md shadow-md w-10 flex justify-center items-center">
        <DollarSign color="white" />
      </button>
      <button className="bg-yellow-300 rounded-md shadow-md w-10 flex justify-center items-center">
        <Clock />
      </button>
    </div>
  );
};

export default FilterFlights;
