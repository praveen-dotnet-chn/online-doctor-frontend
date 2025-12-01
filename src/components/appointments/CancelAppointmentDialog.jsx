// src/components/appointments/CancelAppointmentDialog.jsx

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export const CancelAppointmentDialog = ({
  isOpen,
  onClose,
  appointment,
  onConfirm,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span>Cancel Appointment</span>
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to cancel this appointment? This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>

        {appointment && (
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div>
              <p className="text-sm text-gray-600">Doctor</p>
              <p className="font-semibold text-gray-900">
                {appointment.doctorName}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Date & Time</p>
              <p className="font-semibold text-gray-900">
                {appointment.appointmentDate} at {appointment.appointmentTime}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Reason</p>
              <p className="text-gray-900">{appointment.reason}</p>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Keep Appointment
          </Button>
          <Button
            variant="destructive"
            onClick={() => onConfirm(appointment.id)}
          >
            Cancel Appointment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
