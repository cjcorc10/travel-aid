// doing nothing with formData for now...
export const getFlights = async (queryString: string) => {
  const response = await fetch(`https://api.com?${queryString}`);
  if (!response.ok) throw new Error('Network response not ok');
  return response.json();
};
