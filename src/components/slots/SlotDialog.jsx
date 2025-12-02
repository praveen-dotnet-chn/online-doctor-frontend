import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function SlotDialog({
  open,
  onClose,
  slots,
  onDeleteSlot,
  formatTime,
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Available Slots</DialogTitle>
        </DialogHeader>

        {/* Body */}
        {slots.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-4">
            No slots for this date
          </p>
        ) : (
          <div className="flex flex-col gap-3 py-2">
            {slots.map((slot) => (
              <div
                key={slot.id}
                className="flex justify-between items-center p-3 border rounded-lg"
              >
                <div>
                  <div className="font-medium">
                    {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {slot.isAvailable ? "Available" : "Booked"}
                  </div>
                </div>

                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => onDeleteSlot(slot.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
