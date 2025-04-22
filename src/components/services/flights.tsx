// doing nothing with formData for now...
export const getFlights = async (formData: Inputs) => {
  const response = await fetch('https://api.com/');
  if (!response.ok) throw new Error('Network response not ok');
  return response.json();
};
