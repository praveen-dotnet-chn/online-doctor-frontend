// src/pages/MyAppointments.jsx

import React, { useState } from "react";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { StatsCards } from "../components/dashboard/StatsCards";
import { FilterBar } from "../components/dashboard/FilterBar";
import { DataTable } from "../components/dashboard/DataTable";
import { StatusBadge } from "../components/shared/StatusBadge";
import { UserAvatar } from "../components/shared/UserAvatar";
import { Toast } from "../components/shared/Toast";
import { CancelAppointmentDialog } from "../components/appointments/CancelAppointmentDialog";
import { PrescriptionDialog } from "../components/appointments/PrescriptionDialog";
import { Button } from "@/components/ui/button";
import { useTable } from "../hooks/useTable";
import { patientAppointmentsData } from "../data/mockData";
import { Video, FileText, X } from "lucide-react";

export const MyAppointments = ({ currentRole, onRoleChange }) => {
  const [appointments, setAppointments] = useState(patientAppointmentsData);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showPrescriptionDialog, setShowPrescriptionDialog] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const {
    data,
    totalItems,
    searchQuery,
    handleSearch,
    filters,
    handleFilter,
    sortConfig,
    handleSort,
    currentPage,
    totalPages,
    itemsPerPage,
    handlePageChange,
  } = useTable(appointments, {
    searchFields: ["doctorName", "specialization"],
    filterFields: ["status"],
  });

  const stats = [
    { label: "Total Appointments", value: appointments.length },
    {
      label: "Scheduled",
      value: appointments.filter((a) => a.status === "scheduled").length,
      color: "text-blue-600",
    },
    {
      label: "Completed",
      value: appointments.filter((a) => a.status === "completed").length,
      color: "text-green-600",
    },
    {
      label: "Cancelled",
      value: appointments.filter((a) => a.status === "cancelled").length,
      color: "text-red-600",
    },
  ];

  const filterOptions = [
    {
      label: "Status",
      placeholder: "Filter by Status",
      value: filters.status || "all",
      onChange: (value) => handleFilter("status", value),
      showIcon: false,
      options: [
        { value: "scheduled", label: "Scheduled" },
        { value: "completed", label: "Completed" },
        { value: "cancelled", label: "Cancelled" },
      ],
    },
  ];

  const columns = [
    { key: "doctor", label: "Doctor", sortable: true, sticky: true },
    {
      key: "specialization",
      label: "Specialization",
      sortable: true,
      className: "whitespace-nowrap",
    },
    { key: "experience", label: "Experience", sortable: true },
    {
      key: "date",
      label: "Date & Time",
      sortable: true,
      className: "whitespace-nowrap",
    },
    { key: "status", label: "Status", sortable: false },
    { key: "videoLink", label: "Video Link", sortable: false },
    { key: "prescription", label: "Prescription", sortable: false },
    {
      key: "action",
      label: "Action",
      sortable: false,
      className: "text-right",
    },
  ];

  const handleCancelClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowCancelDialog(true);
  };

  const handleConfirmCancel = (appointmentId) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === appointmentId ? { ...apt, status: "cancelled" } : apt
      )
    );
    setShowCancelDialog(false);
    setToastMessage("Appointment cancelled successfully");
    setShowToast(true);
  };

  const handleViewPrescription = (appointment) => {
    setSelectedAppointment(appointment);
    setShowPrescriptionDialog(true);
  };

  const handleJoinVideo = (videoLink) => {
    window.open(videoLink, "_blank");
  };

  const renderRow = (appointment) => (
    <tr key={appointment.id} className="hover:bg-gray-50">
      <td className="sticky left-0 z-10 bg-white px-4 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <UserAvatar
            name={appointment.doctorName}
            image={appointment.doctorAvatar}
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              {appointment.doctorName}
            </p>
            <p className="text-xs text-gray-500">
              {appointment.specialization}
            </p>
          </div>
        </div>
      </td>
      <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">
        {appointment.specialization}
      </td>
      <td className="px-4 py-4 text-sm text-gray-900">
        {appointment.experience} years
      </td>
      <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">
        <div>
          <p className="font-medium">{appointment.appointmentDate}</p>
          <p className="text-gray-500">{appointment.appointmentTime}</p>
        </div>
      </td>
      <td className="px-4 py-4">
        <StatusBadge status={appointment.status} />
      </td>
      <td className="px-4 py-4">
        {appointment.videoLink && appointment.status === "scheduled" ? (
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleJoinVideo(appointment.videoLink)}
            className="whitespace-nowrap"
          >
            <Video className="w-4 h-4 mr-2" />
            Join Call
          </Button>
        ) : (
          <span className="text-sm text-gray-400">-</span>
        )}
      </td>
      <td className="px-4 py-4">
        {appointment.prescriptionAvailable ? (
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleViewPrescription(appointment)}
            className="whitespace-nowrap"
          >
            <FileText className="w-4 h-4 mr-2" />
            View
          </Button>
        ) : (
          <span className="text-sm text-gray-400">Not available</span>
        )}
      </td>
      <td className="px-4 py-4 text-right">
        {appointment.status === "scheduled" ? (
          <Button
            size="sm"
            variant="destructive"
            onClick={() => handleCancelClick(appointment)}
            className="whitespace-nowrap"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        ) : (
          <span className="text-sm text-gray-400">-</span>
        )}
      </td>
    </tr>
  );

  return (
    <DashboardLayout
      title="My Appointments"
      currentRole={currentRole}
      onRoleChange={onRoleChange}
      currentUser={{ name: "John Doe" }}
    >
      <StatsCards stats={stats} />

      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={handleSearch}
        filters={filterOptions}
        searchPlaceholder="Search appointments..."
      />

      <DataTable
        columns={columns}
        data={data}
        onSort={handleSort}
        sortConfig={sortConfig}
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        renderRow={renderRow}
      />

      {/* Cancel Appointment Dialog */}
      <CancelAppointmentDialog
        isOpen={showCancelDialog}
        onClose={() => setShowCancelDialog(false)}
        appointment={selectedAppointment}
        onConfirm={handleConfirmCancel}
      />

      {/* Prescription Dialog */}
      <PrescriptionDialog
        isOpen={showPrescriptionDialog}
        onClose={() => setShowPrescriptionDialog(false)}
        appointment={selectedAppointment}
      />

      {/* Toast */}
      <Toast
        message={toastMessage}
        show={showToast}
        onClose={() => setShowToast(false)}
      />
    </DashboardLayout>
  );
};
