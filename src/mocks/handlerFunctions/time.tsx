export const generateRandomTime = (start: number, end: number) => {
  let hour = Math.floor(Math.random() * (end - start)) + start;
  const minute = Math.floor(Math.random() * 4) * 15;
  return [hour, minute];
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

export const convertFromMilitary = (hour: number, minute: number = 0) => {
  let pm = false;
  while (minute > 59) {
    minute -= 59;
    hour++;
  }
  while (hour > 12) {
    if (hour > 24) hour -= 24;
    else {
      hour -= 12;
      pm = true;
    }
  }
  return [hour, pm];
};


const convertDecimalToTime = (duration: number) => {
  const hours = Math.floor(duration);
  const minutes = Math.floor((duration % 1) * 60);
  return [hours, minutes];
};

// calculate total duration of flights & layovers, return hours and minutes
export const getFlightDuration = (layovers: number, duration: number) => {
  // get layover duration
  const layoverHours = Math.random() * 4 * layovers;
  const totalDuration = layoverHours + duration;
  return convertDecimalToTime(totalDuration);
};
