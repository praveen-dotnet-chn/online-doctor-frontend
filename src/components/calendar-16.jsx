import * as React from "react";
import { Clock2Icon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import api from "@/api/api";

import { Spinner } from "@/components/ui/spinner";
import { Toast } from "../components/shared/Toast";

export default function Calendar16({ doctorId }) {
  const [date, setDate] = React.useState(new Date());
  const [loading, setLoading] = React.useState(false);
  const [toast, setToast] = React.useState({ show: false, message: "" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
  };

  const handleConfirm = async () => {
    const start = document.getElementById("time-from")?.value;
    const end = document.getElementById("time-to")?.value;

    if (!start || !end) {
      showToast("Please select start & end time");
      return;
    }

    const isoDate = date.toLocaleDateString("en-CA");
    // format: YYYY-MM-DD

    const payload = {
      doctorId,
      startTime: `${isoDate}T${start}`,
      endTime: `${isoDate}T${end}`,
      isAvailable: true,
    };

    try {
      setLoading(true);

      const res = await api.post("/api/availabilityslot", payload);

      setToast({
        show: true,
        message: "Slot created successfully!",
        type: "success",
      });

      console.log("Created slot:", res.data);
    } catch (err) {
      console.error(err);
      setToast({ show: true, message: "Failed to create slot", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card className="w-fit py-4">
        <CardContent className="px-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="bg-transparent p-0"
          />
        </CardContent>

        <CardFooter className="flex flex-col gap-6 border-t px-4 !pt-4">
          {/* Start Time */}
          <div className="flex w-full flex-col gap-3">
            <Label htmlFor="time-from">Start Time</Label>
            <div className="relative flex w-full items-center gap-2">
              <Clock2Icon className="text-muted-foreground pointer-events-none absolute left-2.5 size-4 select-none" />
              <Input
                id="time-from"
                type="time"
                step="1"
                defaultValue="10:30:00"
                className="appearance-none pl-8 [&::-webkit-calendar-picker-indicator]:hidden"
              />
            </div>
          </div>

          {/* End Time */}
          <div className="flex w-full flex-col gap-3">
            <Label htmlFor="time-to">End Time</Label>
            <div className="relative flex w-full items-center gap-2">
              <Clock2Icon className="text-muted-foreground pointer-events-none absolute left-2.5 size-4 select-none" />
              <Input
                id="time-to"
                type="time"
                step="1"
                defaultValue="12:30:00"
                className="appearance-none pl-8 [&::-webkit-calendar-picker-indicator]:hidden"
              />
            </div>
          </div>

          {/* Confirm Button */}
          <Button
            className="w-full mt-2"
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? <Spinner /> : "Confirm Slot"}
          </Button>
        </CardFooter>
      </Card>

      {/* Toast */}
      <Toast
        message={toast.message}
        show={toast.show}
        type={toast.type}
        onClose={() => setToast({ show: false, message: "" })}
      />
    </>
  );
}
