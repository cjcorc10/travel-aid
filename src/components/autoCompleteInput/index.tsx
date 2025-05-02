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

  // search for airport each time letter is typed in input
  useEffect(() => {
    if (value.length > 2) {
      const locations = airports.filter((airport) =>
        `${airport.airport} ${airport.city} ${airport.code}`
          .toLowerCase()
          .includes(value.toLowerCase())
      );
      // only return 10 entries max
      setResults(locations.slice(0, 9))
    } else {
      setResults([]);
    }
  }, [value]);
  console.log(results);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role="combobox"
          aria-expanded={open}
          className='w-full justify-between'
          >
            {value 
              ? airports.find((airport) => airport.code === value)?.code
              : "Select airport..."}
            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-full p-0'>
        <Command>
          <CommandInput 
            
            placeholder="Search airports..." />
          <CommandList>
            <CommandEmpty>No Airports found.</CommandEmpty>
            <CommandGroup>
              {results.map((airport) => (
                <CommandItem
                  key={airport.code}
                  value={airport.code}
                  onSelect={(currentValue) => {
                    onChange(currentValue)
                    setOpen(false)
                  }}
                  >
                    <Check className={cn("mr-2 h-4 w-4",
                     value === airport.code ? "opacity-100" : "opacity-0" )}
                    />
                    {airport.code}
                  </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
    // <>
    //   <input
    //     type="text"
    //     value={value}
    //     onChange={(e) => onChange(e.target.value)}
    //     list={value}
    //     required
    //     placeholder="enter city or airport..."
    //     className="border border-gray-300 rounded-lg mb-2 w-full p-1 px-2 shadow-md outline-pink-200"
    //   />
    //   {results && (
    //     <datalist className="bg-white" id={value}>
    //       {results.map((airport) => (
    //         <option
    //           key={airport.code}
    //           value={`${airport.code}, ${airport.airport}, ${airport.city}, ${airport.country}`}
    //         />
    //       ))}
    //     </datalist>
    //   )}
    // </>
  );
};

export default AutoCompleteInput;
