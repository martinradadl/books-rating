import { useCallback, useRef } from "react";

export const useIsMounted = () => {
  const isMountedRef = useRef(false);

  const skipFirstRender = useCallback((callback: () => void) => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      return;
    }

    callback();
  }, []);

  return { skipFirstRender };
};
