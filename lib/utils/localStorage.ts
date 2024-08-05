export const saveDataToLocalStorage = (key: string, data: any): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

export const getDataFromLocalStorage = (key: string): any | null => {
  if (typeof window !== "undefined") {
    // Ensure window is available
    const storedData = localStorage.getItem(key);
    if (storedData) {
      return JSON.parse(storedData);
    }
  }
  return null;
};
