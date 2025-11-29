// src/components/layout/MobileOverlay.jsx

import React from "react";

export const MobileOverlay = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/30 z-40 lg:hidden"
      onClick={onClose}
      aria-hidden="true"
    />
  );
};
