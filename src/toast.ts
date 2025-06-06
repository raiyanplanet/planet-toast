import { ToastOptions } from "./types";
import { toastStore } from "./store";

export const toast = (message: string, options?: ToastOptions) =>
  toastStore.add(message, "default", options);

toast.success = (message: string, options?: ToastOptions) =>
  toastStore.add(message, "success", options);

toast.error = (message: string, options?: ToastOptions) =>
  toastStore.add(message, "error", options);

toast.loading = (message: string, options?: ToastOptions) =>
  toastStore.add(message, "loading", options);

toast.dismiss = (id: string) => toastStore.dismiss(id);

toast.remove = (id: string) => toastStore.remove(id);

toast.promise = <T>(
  promise: Promise<T>,
  messages: {
    loading: string;
    success: string | ((data: T) => string);
    error: string | ((error: any) => string);
  },
  options?: ToastOptions
) => {
  const id = toast.loading(messages.loading, options);

  promise
    .then((data) => {
      const successMsg =
        typeof messages.success === "function"
          ? messages.success(data)
          : messages.success;
      toast.success(successMsg, { ...options, id });
    })
    .catch((error) => {
      const errorMsg =
        typeof messages.error === "function"
          ? messages.error(error)
          : messages.error;
      toast.error(errorMsg, { ...options, id });
    });

  return promise;
};
