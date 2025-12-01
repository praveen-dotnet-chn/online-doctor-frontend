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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const ReasonDialog = ({
  isOpen,
  onClose,
  doctor,
  selectedSlot,
  reason,
  onReasonChange,
  onConfirm,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Appointment Details</DialogTitle>
          <DialogDescription>
            Please provide the reason for your consultation
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Doctor</p>
            <p className="font-semibold text-gray-900">{doctor?.name}</p>
            <p className="text-sm text-gray-600 mt-2">Selected Time</p>
            <p className="font-semibold text-gray-900">{selectedSlot?.time}</p>
          </div>

          <div>
            <Label htmlFor="reason">Reason for Visit *</Label>
            <Textarea
              id="reason"
              placeholder="Please describe your symptoms or reason for consultation..."
              value={reason}
              onChange={(e) => onReasonChange(e.target.value)}
              className="mt-2 min-h-[120px]"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onConfirm} disabled={!reason.trim()}>
            Confirm Appointment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
