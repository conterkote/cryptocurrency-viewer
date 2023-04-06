import React, {useEffect, useState} from "react";

export default function useDebounce<T>(value : T, ms : number = 700) : T {
  const [debouncedValue, setDebouncedValue] = useState<T | null>(null);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value)
    }, ms)
    return () => {
      clearTimeout(timeout)
    }
  }, [value, ms]);
  return debouncedValue as T
}