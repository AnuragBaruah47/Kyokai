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
export const first200Chars = (text) => {
  if (!text) return "";
  return text.slice(0, 50);
};
export const TrunNameChars = (text) => {
  if (!text) return "";
  return text.slice(0, 15);
};
export const TrunNameChars2 = (text) => {
  if (!text) return "";
  return text.slice(0, 45);
};

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default useDebounce;
