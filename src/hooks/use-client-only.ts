'use client';

import { useEffect, useState } from 'react';

export function useClientOnly() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}

export function useHydrationSafeState<T>(initialValue: T): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(initialValue);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // hydration이 완료되기 전까지는 초기값을 유지
  if (!isHydrated) {
    return [initialValue, setValue];
  }

  return [value, setValue];
}
