import React from "react";
import { ToastType } from "../types";

interface ToastIconProps {
  type: ToastType;
}

export const ToastIcon: React.FC<ToastIconProps> = ({ type }) => {
  const baseStyle = {
    width: "20px",
    height: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    fontSize: "12px",
    fontWeight: "bold",
  };

  switch (type) {
    case "success":
      return (
        <div
          style={{ ...baseStyle, backgroundColor: "#10b981", color: "white" }}>
          ✓
        </div>
      );
    case "error":
      return (
        <div
          style={{ ...baseStyle, backgroundColor: "#ef4444", color: "white" }}>
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
          style={{ ...baseStyle, backgroundColor: "#6b7280", color: "white" }}>
          ℹ
        </div>
      );
  }
};
