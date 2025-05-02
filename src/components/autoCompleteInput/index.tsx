import airports from '@/data/airports.json'
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Check, ChevronsUpDown, ChevronUp } from "lucide-react"

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const AutoCompleteInput = ({ value, onChange }: Props) => {
  const [results, setResults] = useState(airports.slice(0,0));
  const [open, setOpen] = useState(false)


console.log(value)
  // search for airport each time letter is typed in input
  useEffect(() => {
    if (value.length > 0) {
      
      const myVal = value.toLowerCase().trim().split(', ')

      // filter out matching airports
      const locations = airports.filter((airport) => {
        const airports = `${airport.airport} ${airport.city} ${airport.code} ${airport.country}`.toLowerCase()

      // search airports with each term
      if (myVal.every(term => airports.includes(term))) return airport
      }
      );
      // only return 10 entries max
      setResults(locations.slice(0, 9))
    } else {
      setResults([]);
    }
  }, [value]);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role="combobox"
          aria-expanded={open}
          className='min-w-[200px] justify-between'
          >
            {value
              ? value.split(',', 2)
              : "Select airport..."}
            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='min-w-[200px] p-0'>
        <Command>
          <CommandInput 
            value={value}
            onValueChange={(e) => onChange(e)}
            placeholder="Search airports..." />
          <CommandList>
            <CommandEmpty>No Airports found.</CommandEmpty>
            <CommandGroup>
              {results.map((airport) => (
                <CommandItem
                  key={airport.code}
                  value={`${airport.code}, ${airport.airport}, ${airport.city}, ${airport.country}`}
                  onSelect={(currentValue) => {
                    onChange(currentValue)
                    setOpen(false)
                  }}
                  >
                    <Check className={cn("mr-2 h-4 w-4",
                     value.includes(airport.code) ? "opacity-100" : "opacity-0" )}
                    />
                    {`${airport.code}, ${airport.airport}, ${airport.city}, ${airport.country}`}
                  </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default AutoCompleteInput;
