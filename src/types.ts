export type ToastType = "success" | "error" | "loading" | "default";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
  createdAt: number;
  visible: boolean;
}

export interface ToastOptions {
  duration?: number;
  id?: string;
  position?: ToastPosition;
}

export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface ToasterProps {
  position?: ToastPosition;
  reverseOrder?: boolean;
  gutter?: number;
  containerStyle?: React.CSSProperties;
  toastOptions?: Partial<ToastOptions>;
}
