import { Slider } from '@/components/ui/slider'
import { Button } from "@/components/ui/button"
import TimeSlider from './timeSlider'
import clsx from 'clsx';

const layovers = [0, 1, 2, 3]

type PropTypes = {
  filters: Filters | undefined,
  setFilters: React.Dispatch<React.SetStateAction<Filters | undefined>>
  handleClick: () => void
}

const FilterMenu = ({setFilters, handleClick, filters}: PropTypes) => {


  return (
  <div className='flex-1 min-w-60 hidden md:flex flex-col mr-2 py-4 px-4'>
        <h3 className='text-xl text-green-600 font-bold'>Filters</h3>
        <div className='flex flex-col gap-12 mt-4 px-4'>
        <div>
            <p className='text-lg font-bold text-gray-600 pb-2'>Max Stops</p>
            <Slider
              value={[filters?.stops || 0]}
              onValueChange={(i) => setFilters(prev => ({...prev, stops: i[0] }))}  
              max={layovers.length-1} step={1} />
            <div className='mt-2 -mx-1.5 flex items-center justify-between text-muted-foreground text-xs'>
              {layovers.map((layover, idx) => (
                <span key={layover}>{layover}{idx == layovers.length-1 && '+'}</span>
              ))}
            </div>
        </div>
        <div>
          <div className='flex pb-2 items-center gap-8'>
            <p className='text-lg font-bold text-gray-600'>Max Price</p>
            <p className='font-bold text-gray-400'>$0 - $1000+</p>
          </div>
            <Slider 
              value={[filters?.price || 1000]} 
              onValueChange={(i) => setFilters(prev => ({...prev, price: i[0]}))}
              min={100}
              max={1000} 
              step={100} />
            <div className='mt-2 -mx-1.5 flex items-center justify-between text-muted-foreground text-xs'>
             <span>$100</span><span className={clsx(filters?.price ? "text-lg font-bold bg-gray-200 px-1 rounded-md shadow-inner w-20 text-center" : "hidden")}>{filters?.price == 1000 ? 'any' : ` < $${filters?.price}`}</span><span>$1000+</span> 
            </div>
        </div>
        <div>
          <div className='flex pb-2 items-center gap-8'>
            <p className='text-lg font-bold text-gray-600'>Departure Time</p>
            <p className='font-bold text-gray-400'>0:00 - 24:00</p>
          </div>
           <TimeSlider 
            departureTimes={filters?.departureTime || [0, 2400]}
            changeTime={(timeRange: number[]) => setFilters(prev => ({...prev, departureTime: timeRange}))}/> 
        </div>
              <Button 
                onClick={handleClick}
                variant="outline">Set filters</Button>
        </div>
    </div>
  )
}

export default FilterMenu