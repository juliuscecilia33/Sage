export const saveDataToSessionStorage = (key: string, data: any): void => {
  if (typeof window !== "undefined") {
    // Ensure window is available
    sessionStorage.setItem(key, JSON.stringify(data));
  }
};

export const getDataFromSessionStorage = (key: string): any | null => {
  if (typeof window !== "undefined") {
    // Ensure window is available
    const storedData = sessionStorage.getItem(key);
    if (storedData) {
      return JSON.parse(storedData);
    }
  }
  return null;
};
