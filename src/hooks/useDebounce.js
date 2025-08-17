'use client';
import { useState, useEffect } from 'react';
import debounce from 'lodash/debounce';

export default function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = debounce((val) => setDebouncedValue(val), delay);
    handler(value);
    return () => handler.cancel();
  }, [value, delay]);

  return debouncedValue;
}