const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const fetchMakes = async () => {
  const response = await fetch(
      `${apiUrl}/vehicles/GetMakesForVehicleType/car?format=json`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch vehicle makes');
  }
  const data = await response.json();
  return data.Results || [];
};

export const fetchYears = () => {
  const currentYear = new Date().getFullYear();
  const yearsArray = [];
  for (let year = 2015; year <= currentYear; year++) {
    yearsArray.push(year);
  }
  return yearsArray;
};

export const fetchModels = async (makeId: string, year: string) => {
  const res = await fetch(
    `${apiUrl}/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
  );
  const data = await res.json();
  return data.Results || [];
};
