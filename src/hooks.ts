import { useSyncExternalStore } from "react";
import { toastStore } from "./store";

export const useToasts = () => {
  return useSyncExternalStore(
    toastStore.subscribe.bind(toastStore),
    toastStore.getSnapshot.bind(toastStore)
  );
};
