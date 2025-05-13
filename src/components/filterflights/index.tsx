import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Filterprops = {
  changeFilter: (filterName: string) => void
}

type Dictionary = { [index: string]: string}

const filters: Dictionary = {
  'departureTime': 'departure time', 
  'pricePerPassenger': 'ticket price', 
  'duration': 'duration'
}

const FilterFlights = ({changeFilter}: Filterprops) => {
  return (
    <div className="mt-8 flex gap-2 justify-end md:absolute md:top-12 md:right-2">
      {/* <input
        type="text"
        placeholder="filter by text.."
        className="bg-white rounded-md shadow-md p-2 flex-1 outline-pink-200"
      /> */}
      <div className="bg-white text-gray-600 font-bold px-12 py-1 rounded-sm shadow-md flex">
        <DropdownMenu>
          <DropdownMenuTrigger>sort by..</DropdownMenuTrigger>
          <DropdownMenuContent>
            {Object.keys(filters).map(filterName => (
              <DropdownMenuItem
                key={filterName}
                onClick={() => changeFilter(filterName)}>
                  {filters[filterName]}</DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default FilterFlights;
