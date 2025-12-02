import React from "react";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const TimeSlotSelector = ({ slots, selectedSlot, onSlotSelect }) => {
  const hasSlots = slots && slots.length > 0;

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const formatTime = (dateStr) =>
    new Date(dateStr).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div>
      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Clock className="w-5 h-5 mr-2" />
        Available Time Slots
      </h4>

      {!hasSlots && (
        <div className="text-center py-8 text-gray-500 text-sm border border-dashed rounded-lg">
          No time slots available
        </div>
      )}

      {hasSlots && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {slots.map((slot, index) => {
            // console.log(slots);
            const date = formatDate(slot.start);
            const start = formatTime(slot.start);
            const end = formatTime(slot.end);

            const isSelected = selectedSlot?.id === slot.id;

            return (
              <button
                key={slot.id}
                onClick={() => slot.available && onSlotSelect(slot)}
                disabled={!slot.available}
                className={`
                  p-4 rounded-lg border-2 text-left transition-all
                  ${
                    !slot.available
                      ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                      : isSelected
                      ? "cursor-pointer bg-blue-50 border-blue-500 text-blue-700"
                      : "cursor-pointer bg-white border-gray-200 hover:border-blue-300 text-gray-900"
                  }
                `}
              >
                <div className="font-semibold text-gray-900 mb-1">{date}</div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">
                    {start} – {end}
                  </span>

                  {!slot.available && (
                    <Badge
                      variant="secondary"
                      className="bg-gray-200 text-gray-600"
                    >
                      Booked
                    </Badge>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
