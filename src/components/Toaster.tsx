import React, { useEffect } from "react";
import { useToasts } from "../hooks";
import { ToasterProps } from "../types";
import { ToastItem } from "./ToastItem";

export const Toaster: React.FC<ToasterProps> = ({
  position = "top-center",
  reverseOrder = false,
  gutter = 8,
  containerStyle,
  toastOptions,
}) => {
  const toasts = useToasts();

  useEffect(() => {
    // Inject CSS animations
    const style = document.createElement("style");
    style.textContent = `
      @keyframes planet-toast-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const getPositionStyles = () => {
    const [vertical, horizontal] = position.split("-");

    const styles: React.CSSProperties = {
      position: "fixed",
      zIndex: 9999,
      pointerEvents: "none",
    };

    if (vertical === "top") {
      styles.top = "16px";
    } else {
      styles.bottom = "16px";
    }

    if (horizontal === "left") {
      styles.left = "16px";
    } else if (horizontal === "right") {
      styles.right = "16px";
    } else {
      styles.left = "50%";
      styles.transform = "translateX(-50%)";
    }

    return styles;
  };

  const visibleToasts = toasts.filter((toast) => toast.visible);
  const orderedToasts = reverseOrder
    ? [...visibleToasts].reverse()
    : visibleToasts;

  return (
    <div style={{ ...getPositionStyles(), ...containerStyle }}>
      {orderedToasts.map((toast, index) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          offset={index * (60 + gutter)}
          reverseOrder={reverseOrder}
        />
      ))}
    </div>
  );
};
