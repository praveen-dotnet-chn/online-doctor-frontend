import React from "react";
import { flexRender } from "@tanstack/react-table";

export default function DoctorRow({ row }) {
  const doctor = row.original;
  return (
    <tr className="border-t">
      {/* Sticky name column */}
      <td className="px-4 py-3 sticky left-0 bg-white z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
            {doctor.name
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")}
          </div>
          <div>
            <div className="font-medium">{doctor.name}</div>
            <div className="text-sm text-muted-foreground">
              {doctor.designation || doctor.specialization}
            </div>
          </div>
        </div>
      </td>

      <td className="px-4 py-3">{doctor.specialization}</td>
      <td className="px-4 py-3">{doctor.experience}</td>
      <td className="px-4 py-3">
        <button className="rounded-md bg-blue-600 text-white px-3 py-1">
          View
        </button>
      </td>
    </tr>
  );
}
