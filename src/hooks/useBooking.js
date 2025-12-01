// src/hooks/useBooking.js

import { useState } from "react";

export const useBooking = () => {
  const [bookingStep, setBookingStep] = useState(null); // null, 'profile', 'reason'
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingReason, setBookingReason] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const startBooking = (doctor) => {
    setSelectedDoctor(doctor);
    setBookingStep("profile");
    setSelectedSlot(null);
    setBookingReason("");
  };

  const selectSlot = (slot) => {
    setSelectedSlot(slot);
  };

  const confirmSlot = () => {
    if (selectedSlot) {
      setBookingStep("reason");
    }
  };

  const updateReason = (reason) => {
    setBookingReason(reason);
  };

  const confirmBooking = () => {
    if (bookingReason.trim()) {
      setToastMessage(
        `Appointment booked successfully with ${selectedDoctor.name}!`
      );
      setShowToast(true);
      resetBooking();
    }
  };

  const resetBooking = () => {
    setBookingStep(null);
    setSelectedDoctor(null);
    setSelectedSlot(null);
    setBookingReason("");
  };

  const closeToast = () => {
    setShowToast(false);
  };

  return {
    // State
    bookingStep,
    selectedDoctor,
    selectedSlot,
    bookingReason,
    showToast,
    toastMessage,

    // Actions
    startBooking,
    selectSlot,
    confirmSlot,
    updateReason,
    confirmBooking,
    resetBooking,
    closeToast,
  };
};
