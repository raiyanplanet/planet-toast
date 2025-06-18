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

      @keyframes planet-toast-success {
        0% { transform: scale(0); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
      }

      @keyframes planet-toast-error {
        0% { transform: scale(0); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
      }

      @keyframes planet-toast-info {
        0% { transform: scale(0); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
      }

      @keyframes planet-toast-slide-in {
        from { transform: translateY(-100%); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }

      @keyframes planet-toast-slide-out {
        from { transform: translateY(0); opacity: 1; }
        to { transform: translateY(-100%); opacity: 0; }
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
      padding: "16px",
      maxWidth: "100vw",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: `${gutter}px`,
    };

    if (vertical === "top") {
      styles.top = 0;
      styles.animation = "planet-toast-slide-in 0.3s ease-out";
    } else {
      styles.bottom = 0;
      styles.animation = "planet-toast-slide-in 0.3s ease-out";
    }

    if (horizontal === "left") {
      styles.alignItems = "flex-start";
    } else if (horizontal === "right") {
      styles.alignItems = "flex-end";
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
