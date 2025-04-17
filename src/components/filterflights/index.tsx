import { Funnel, DollarSign } from 'lucide-react';

const FilterFlights = () => {
  return (
    <div className="mt-12 flex gap-2">
      <input
        type="text"
        placeholder="filter by text.."
        className="bg-white rounded-md shadow-md p-2 flex-1"
      />
      <button className="bg-pink-300 rounded-md shadow-md w-10 flex justify-center items-center hover:bg-pink-400">
        <DollarSign color="white" />
      </button>
      <button className="bg-white rounded-md shadow-md w-10 flex justify-center items-center hover:bg-gray-200">
        <Funnel />
      </button>
    </div>
  );
};

export default FilterFlights;
