import { createContext } from 'react';

type AirportContextType = {
  airports: Airport[];
  isLoading: boolean;
};

const AirportsContext = createContext<AirportContextType | undefined>(
  undefined
);

export default AirportsContext;
