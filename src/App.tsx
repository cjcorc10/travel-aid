import { useState, useContext, useEffect } from 'react';
import { Outlet } from 'react-router';
import Nav from './components/nav';
import AirportsContext from './contexts/airports';

const App = () => {
  // context states
  const [airports, setAirports] = useState<Airport[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // fetch all airport data, this will set the context when fetched
  useEffect(() => {
    (async () => {
      const response = await fetch('/data/airports.json');
      const data = await response.json();
      setAirports(data);
      setIsLoading(false);
    })();
  }, []);

  return (
    <AirportsContext.Provider value={{ airports, isLoading }}>
      <main>
        <Nav />
        <Outlet />
      </main>
    </AirportsContext.Provider>
  );
};
export default App;
