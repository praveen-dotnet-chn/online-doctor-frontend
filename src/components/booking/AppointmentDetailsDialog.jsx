// src/components/appointments/AppointmentDetailsDialog.jsx
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "../shared/UserAvatar";
import { Badge } from "@/components/ui/badge";
import { sendPrescriptionAPI } from "@/api/api";
import { Toast } from "../shared/Toast";
import api from "@/api/api";
export default function AppointmentDetailsDialog({
  isOpen,
  onClose,
  appointment,
  prescription,
  onPrescriptionChange,
  onPrescribe,
}) {
  const [toast, setToast] = React.useState({ show: false, message: "" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
  };

  const handlePrescribe = async () => {
    if (!prescription.trim()) {
      showToast("Prescription cannot be empty", "warning");
      return;
    }

    try {
      const payload = {
        patientId: appointment.patientId,
        doctorNotes: prescription,
      };

      await api.post("/api/patient/records/", payload);

      showToast("Prescription sent successfully!", "success");
      onPrescriptionChange(""); // clear textarea
      onClose(); // close dialog
    } catch (err) {
      console.error("Failed to send prescription", err);
      showToast("Failed to send prescription", "error");
    }
  };

  if (!appointment) return null;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl">
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
            <DialogDescription>
              Review patient information & give prescription
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Patient Details */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <UserAvatar name={appointment.patient} size="xlarge" />

                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {appointment.patient}
                    </h3>

                    <div className="mt-2 flex flex-wrap gap-3">
                      <Badge className="bg-purple-100 text-purple-800">
                        {appointment.status}
                      </Badge>

                      <p className="text-sm text-gray-600">
                        Date: {appointment.date}
                      </p>

                      <p className="text-sm text-gray-600">
                        Time: {appointment.timeRange}
                      </p>
                    </div>

                    <p className="text-sm text-gray-500 mt-3">
                      <strong>Reason:</strong>{" "}
                      {appointment.reason ?? "No reason provided"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Prescription Textarea */}
            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-700">Prescription</label>
              <textarea
                className="border rounded-lg p-3 w-full min-h-[120px] focus:ring focus:ring-blue-200 outline-none"
                value={prescription}
                onChange={(e) => onPrescriptionChange(e.target.value)}
                placeholder="Write prescription here..."
              ></textarea>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button onClick={handlePrescribe} disabled={!prescription}>
              Prescribe
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Toast
        message={toast.message}
        show={toast.show}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </>
  );
}
