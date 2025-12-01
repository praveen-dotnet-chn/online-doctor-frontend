// src/components/appointments/PrescriptionDialog.jsx

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
import { Card, CardContent } from "@/components/ui/card";
import { Download, FileText } from "lucide-react";

export const PrescriptionDialog = ({ isOpen, onClose, appointment }) => {
  const handleDownload = () => {
    // Simulate download
    alert("Prescription downloaded successfully!");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <span>Prescription Details</span>
          </DialogTitle>
          <DialogDescription>
            Prescription for appointment on {appointment?.appointmentDate}
          </DialogDescription>
        </DialogHeader>

        {appointment && (
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-start border-b pb-4">
                    <div>
                      <p className="text-sm text-gray-600">Doctor</p>
                      <p className="font-semibold text-gray-900">
                        {appointment.doctorName}
                      </p>
                      <p className="text-sm text-gray-600">
                        {appointment.specialization}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Date</p>
                      <p className="font-semibold text-gray-900">
                        {appointment.appointmentDate}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Diagnosis
                    </h4>
                    <p className="text-gray-700">{appointment.reason}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Prescribed Medications
                    </h4>
                    <div className="space-y-2">
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="font-medium">Amoxicillin 500mg</p>
                        <p className="text-sm text-gray-600">
                          Take 1 tablet twice daily after meals for 7 days
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="font-medium">Paracetamol 650mg</p>
                        <p className="text-sm text-gray-600">
                          Take 1 tablet when needed for pain (max 3 times daily)
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Instructions
                    </h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>Take medications as prescribed</li>
                      <li>Complete the full course of antibiotics</li>
                      <li>Follow up if symptoms persist after 7 days</li>
                      <li>Stay hydrated and get adequate rest</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={handleDownload}>
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
