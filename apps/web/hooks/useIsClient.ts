import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/** True after hydration; false on the server. Avoids setState-in-effect for client-only UI. */
export function useIsClient() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}
