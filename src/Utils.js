import { useEffect, useState } from "react";

const useDebounce = (value, delay = 600) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

export const first300Chars = (text) => {
  if (!text) return "";
  return text.slice(0, 400);
};
export default useDebounce;
