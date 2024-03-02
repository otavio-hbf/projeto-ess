import { useRef, useEffect } from "react";

/**
 * Custom hook that returns the previous value of a given value.
 * @template T The type of the value.
 * @param {T} value The current value.
 * @returns {T | undefined} The previous value.
 */
const usePrevious = <T,>(value: T): T | undefined => {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

export default usePrevious;
