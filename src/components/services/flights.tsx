// doing nothing with formData for now...
export const getFlights = async (queryString: string) => {
  const response = await fetch(`https://api.com?${queryString}`);
  if (!response.ok) throw new Error('Network response not ok');
  return response.json();
};

export const timeToTravel = (start: Coordinate, end: Coordinate) => {
  const toRadians = (degrees: number) => degrees * (Math.PI / 180);

  const lat1 = toRadians(start.latitude);
  const lon1 = toRadians(start.longitude);
  const lat2 = toRadians(end.latitude);
  const lon2 = toRadians(end.longitude);

  // radius of the earth in km
  const R = 6371;

  // Differences in coordinates
  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;

  // Haversine formula
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km

  // Calculate time (distance / speed)
  return distance / 800;
};
