import { useEffect, useState } from 'react';

type Props = {
  value: string;
  onChange: (value: string) => void;
  airports: Airport[];
};

/**
 * Used in place of input for fields that are used to search for airport locations.
 *
 * params: value of field, onChange to change value, airports data
 */
const AutoCompleteInput = ({ value, onChange, airports }: Props) => {
  const [results, setResults] = useState<Airport[]>();

  // search for airport each time letter is typed in input
  useEffect(() => {
    if (value.length > 2) {
      const locations = airports?.filter((airport) =>
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
  console.log(results);

  return (
    <>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        list={value}
        className="border border-gray-300 rounded-lg mb-2 p-1 px-2 shadow-md outline-pink-200"
      />
      {results && (
        <datalist id={value}>
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
