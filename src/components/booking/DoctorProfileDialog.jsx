import React from "react";
import { Award, Star } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "../shared/UserAvatar";
import { TimeSlotSelector } from "./TimeSlotSelector";

export const DoctorProfileDialog = ({
  isOpen,
  onClose,
  doctor,
  selectedSlot,
  onSlotSelect,
  onConfirm,
}) => {
  if (!doctor) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto w-[95%] sm:w-full rounded-xl">
        <DialogHeader>
          <DialogTitle>Book Appointment</DialogTitle>
          <DialogDescription>Select an available time slot</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Doctor Profile Card */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <UserAvatar
                  name={doctor.name}
                  image={
                    doctor?.photo
                      ? `data:image/png;base64,${doctor.photo}`
                      : null
                  }
                  size="xlarge"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {doctor.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <Badge className="bg-blue-100 text-blue-800">
                      {doctor.specialization}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-600">
                      <Award className="w-4 h-4 mr-1" />
                      {doctor.experience ?? 10} years exp
                    </div>
                    {/* <div className="flex items-center text-sm text-gray-600">
                      <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                      {doctor.rating} rating
                    </div> */}
                  </div>
                  {/* <p className="text-sm text-gray-500 mt-2">
                    {doctor.consultations} consultations completed
                  </p> */}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Time Slots */}
          <TimeSlotSelector
            slots={doctor.availableSlots}
            selectedSlot={selectedSlot}
            onSlotSelect={onSlotSelect}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onConfirm} disabled={!selectedSlot}>
            Confirm Booking
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
