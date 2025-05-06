import { Funnel } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Filterprops = {
  changeFilter: (filterName: string) => void
}

const filters = ['departureTime', 'pricePerPassenger', 'duration']

const FilterFlights = ({changeFilter}: Filterprops) => {
  return (
    <div className="mt-12 flex gap-2">
      <input
        type="text"
        placeholder="filter by text.."
        className="bg-white rounded-md shadow-md p-2 flex-1 outline-pink-200"
      />
      <div className="bg-pink-300 rounded-md shadow-md p-2 flex">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Funnel color="white" className='hover:cursor-pointer' />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>filter by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {filters.map(filterName => (
              <DropdownMenuItem
                onClick={() => {
                  // setParams(filterName)
                  // setFilter(filterName)
                  changeFilter(filterName)
                }}
                  >{filterName}</DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default FilterFlights;
