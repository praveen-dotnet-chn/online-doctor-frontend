// src/components/shared/Toast.jsx

import React, { useEffect } from "react";

export const Toast = ({
  message,
  show,
  type = "success",
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [show, onClose, duration]);

  if (!show) return null;

  const bgColor =
    type === "error"
      ? "bg-red-600"
      : type === "warning"
      ? "bg-yellow-600"
      : "bg-green-600";

  const iconPath =
    type === "error"
      ? "M6 18L18 6M6 6l12 12" // X icon
      : "M5 13l4 4L19 7"; // Check icon

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-5">
      <div
        className={`${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 min-w-[300px]`}
      >
        <svg
          className="w-5 h-5 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={iconPath}
          />
        </svg>

        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
};
