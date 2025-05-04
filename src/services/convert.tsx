export const convertToQueryString = (formData: Inputs) => {
  const params = new URLSearchParams();
  // need to define the keys as keys of Input type because it will implicity type as string and this can't be used to index an object of type Inptus
  (Object.keys(formData) as Array<keyof Inputs>).forEach((key) => {
    const value = formData[key];
    if (value !== null && value !== undefined) {
      params.append(key.toString(), value.toString());
    } else {
      params.append(key.toString(), '');
    }
  });

  return params.toString();
};
