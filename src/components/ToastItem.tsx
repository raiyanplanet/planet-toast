import React from "react";
import { Toast } from "../types";
import { ToastIcon } from "./ToastIcon";
import { toast } from "../toast";

interface ToastItemProps {
  toast: Toast;
  offset: number;
  reverseOrder: boolean;
}

export const ToastItem: React.FC<ToastItemProps> = ({
  toast: toastData,
  offset,
  reverseOrder,
}) => {
  const handleDismiss = () => {
    toast.dismiss(toastData.id);
  };

  const getTypeStyles = (type: string) => {
    switch (type) {
      case "success":
        return {
          backgroundColor: "#f0fdf4",
          borderColor: "#22c55e",
          color: "#15803d",
          iconBg: "#10b981",
        };
      case "error":
        return {
          backgroundColor: "#fef2f2",
          borderColor: "#ef4444",
          color: "#dc2626",
          iconBg: "#ef4444",
        };
      case "loading":
        return {
          backgroundColor: "#eff6ff",
          borderColor: "#3b82f6",
          color: "#1d4ed8",
          iconBg: "#3b82f6",
        };
      default:
        return {
          backgroundColor: "#ffffff",
          borderColor: "#e5e7eb",
          color: "#374151",
          iconBg: "#6b7280",
        };
    }
  };

  const typeStyles = getTypeStyles(toastData.type);
  const factor = reverseOrder ? -1 : 1;
  const transform = toastData.visible
    ? `translateY(${offset * factor}px) scale(1)`
    : "translateY(-50px) scale(0.95)";

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        transform: `translateX(-50%) ${transform}`,
        opacity: toastData.visible ? 1 : 0,
        transition: "all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        zIndex: 9999,
        pointerEvents: toastData.visible ? "auto" : "none",
        willChange: "transform, opacity",
      }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "14px 16px",
          borderRadius: "12px",
          border: "1px solid",
          boxShadow:
            "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          minWidth: "320px",
          maxWidth: "500px",
          fontSize: "14px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          cursor: "pointer",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          ...typeStyles,
        }}
        onClick={handleDismiss}>
        <ToastIcon type={toastData.type} />
        <div style={{ flex: 1, wordBreak: "break-word", lineHeight: "1.5" }}>
          {toastData.message}
        </div>
        <button
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            opacity: 0.5,
            fontSize: "16px",
            padding: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "24px",
            height: "24px",
            borderRadius: "50%",
            transition: "all 0.2s ease",
            color: typeStyles.color,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "1";
            e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "0.5";
            e.currentTarget.style.backgroundColor = "transparent";
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleDismiss();
          }}>
          ✕
        </button>
      </div>
    </div>
  );
};
