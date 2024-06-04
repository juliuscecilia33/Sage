export const generateStringArray = (n: number): string[] => {
  let result: string[] = [];

  // Loop from 1 to n and convert each number to a string
  for (let i = 1; i <= n; i++) {
    result.push(i.toString());
  }

  return result;
};
