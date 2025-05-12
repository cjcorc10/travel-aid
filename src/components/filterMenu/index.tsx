import { Slider } from '@/components/ui/slider'
import { Button } from "@/components/ui/button"
import TimeSlider from './timeSlider'

const layovers = [0, 1, 2, 3]
const prices = [100, 250, 400, 550, 700, 850, 1000]

type PropTypes = {
  filters: Filters | undefined,
  setFilters: React.Dispatch<React.SetStateAction<Filters | undefined>>
  handleClick: () => void
}

const FilterMenu = ({setFilters, handleClick, filters}: PropTypes) => {
  // const [filters, setFilters] = useState({
  //   stops: 0,
  //   price: 100,
  //   departureTime: [600, 800]
  // })


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
              value={[filters?.price || 100]} 
              onValueChange={(i) => setFilters(prev => ({...prev, price: i[0]}))}
              min={100}
              max={1000} 
              step={150} />
            <div className='mt-2 -mx-1.5 flex items-center justify-between text-muted-foreground text-xs'>
              {prices.map((price, idx) => (
                <span key={idx}>${price}{idx == prices.length-1 && '+'}</span>
              ))}
            </div>
        </div>
        <div>
          <div className='flex pb-2 items-center gap-8'>
            <p className='text-lg font-bold text-gray-600'>Departure Time</p>
            <p className='font-bold text-gray-400'>0:00 - 24:00</p>
          </div>
           <TimeSlider 
            departureTimes={filters?.departureTime || [600, 800]}
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