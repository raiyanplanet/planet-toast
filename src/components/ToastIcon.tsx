import React from "react";
import { ToastType } from "../types";

interface ToastIconProps {
  type: ToastType;
}

export const ToastIcon: React.FC<ToastIconProps> = ({ type }) => {
  const baseStyle = {
    width: "24px",
    height: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    fontSize: "14px",
    fontWeight: "bold",
    transition: "all 0.3s ease",
    transform: "scale(1)",
  };

  switch (type) {
    case "success":
      return (
        <div
          style={{
            ...baseStyle,
            backgroundColor: "#10b981",
            color: "white",
            animation: "planet-toast-success 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
          }}>
          ✓
        </div>
      );
    case "error":
      return (
        <div
          style={{
            ...baseStyle,
            backgroundColor: "#ef4444",
            color: "white",
            animation: "planet-toast-error 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
          }}>
          ✕
        </div>
      );
    case "loading":
      return (
        <div
          style={{
            ...baseStyle,
            border: "2px solid #e5e7eb",
            borderTopColor: "#3b82f6",
            animation: "planet-toast-spin 1s linear infinite",
          }}
        />
      );
    default:
      return (
        <div
          style={{
            ...baseStyle,
            backgroundColor: "#6b7280",
            color: "white",
            animation: "planet-toast-info 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
          }}>
          ℹ
        </div>
      );
  }
};
