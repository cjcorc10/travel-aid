import { useEffect, useState } from 'react';
import { useContext } from 'react';
import AirportsContext from '@/contexts/airports';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const AutoCompleteInput = ({ value, onChange }: Props) => {
  const [results, setResults] = useState<Airport[]>();

  const context = useContext(AirportsContext);

  // search for airport each time letter is typed in input
  useEffect(() => {
    if (value.length > 2) {
      const locations = context?.airports?.filter((airport) =>
        `${airport.airport} ${airport.city} ${airport.code}`
          .toLowerCase()
          .includes(value.toLowerCase())
      );
      // only return 10 entries max
      locations ? setResults(locations.slice(0, 9)) : setResults([]);
    } else {
      setResults([]);
    }
  }, [value]);

  return (
    <>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        list={value}
        required
        placeholder="enter city or airport..."
        className="border border-gray-300 rounded-lg mb-2 w-full p-1 px-2 shadow-md outline-pink-200"
      />
      {results && (
        <datalist className="bg-white" id={value}>
          {results.map((airport) => (
            <option
              key={airport.code}
              value={`${airport.code}, ${airport.airport}, ${airport.city}, ${airport.country}`}
            />
          ))}
        </datalist>
      )}
    </>
  );
};

export default AutoCompleteInput;
