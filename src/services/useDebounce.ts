import { useEffect, useState } from 'react';
export function useDebounce(value: string, delay = 200): string {
  const [debounce, setDebounce] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setDebounce(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounce;
}