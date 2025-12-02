// src/hooks/useBooking.js

import { useState } from "react";
import api from "@/api/api";
import { useAuth } from "../context/AuthContext";

export const useBooking = () => {
  const [bookingStep, setBookingStep] = useState(null); // null, 'profile', 'reason'
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingReason, setBookingReason] = useState("");
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success", // success | error | warning
  });

  // Show toast helper
  const showToastMessage = (message, type = "success") => {
    setToast({ show: true, message, type });
  };

  // Close toast
  const closeToast = () => {
    setToast({ ...toast, show: false });
  };

  const { user } = useAuth();
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
    if (!selectedSlot) {
      showToastMessage("Please select a slot first", "warning");
      return;
    }
    setBookingStep("reason");
  };

  const updateReason = (reason) => {
    setBookingReason(reason);
  };

  const confirmBooking = async () => {
    if (!bookingReason.trim()) {
      showToastMessage("Reason cannot be empty", "warning");
      return;
    }
    try {
      const payload = {
        slotId: selectedSlot.id,
        patientId: user.userId,
        reason: bookingReason,
      };

      const res = await api.post("/api/patient/appointments", payload);
      showToastMessage("Appointment booked successfully!", "success");

      resetBooking();
    } catch (err) {
      showToastMessage("Booking failed. Try again.", "error");
      console.error(err);
    }
  };

  const resetBooking = () => {
    setBookingStep(null);
    setSelectedDoctor(null);
    setSelectedSlot(null);
    setBookingReason("");
  };

  const showToast = toast.show;
  const toastMessage = toast.message;
  return {
    // State
    bookingStep,
    selectedDoctor,
    selectedSlot,
    bookingReason,

    // Actions
    startBooking,
    selectSlot,
    confirmSlot,
    updateReason,
    confirmBooking,
    resetBooking,
    closeToast,

    // Toast
    toast,
    showToastMessage,
    closeToast,
    showToast,
    toastMessage,
  };
};
