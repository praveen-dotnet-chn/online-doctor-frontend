import React from "react";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { StatsCards } from "../components/dashboard/StatsCards";
import { FilterBar } from "../components/dashboard/FilterBar";
import { DataTable } from "../components/dashboard/DataTable";
import { StatusBadge } from "../components/shared/StatusBadge";
import { UserAvatar } from "../components/shared/UserAvatar";
import { Button } from "@/components/ui/button";
import FullPageLoader from "@/components/ui/full-page-loader";
import { useTable } from "../hooks/useTable";
import { useAuth } from "../context/AuthContext";
import Calendar16 from "../components/calendar-16";
import AppointmentDetailsDialog from "../components/booking/AppointmentDetailsDialog";
// import { appointmentsData } from "../data/mockData";
import useDoctorAppointments from "../hooks/useDoctorAppointments";

const Loader = () => <FullPageLoader />;

export default function DoctorDashboard({ currentRole, onRoleChange }) {
  const { user } = useAuth();
  const doctorId = user?.userId; // temp, replace with real logged-in user
  const [selectedAppointment, setSelectedAppointment] = React.useState(null);
  const [showDialog, setShowDialog] = React.useState(false);
  const [prescription, setPrescription] = React.useState("");
  const openAppointment = (appt) => {
    setSelectedAppointment(appt);
    setPrescription("");
    setShowDialog(true);
  };

  const { appointments, loading, fetchAppointments } = useDoctorAppointments();

  React.useEffect(() => {
    fetchAppointments(doctorId);
  }, []);

  const {
    data,
    totalItems,
    searchQuery,
    handleSearch,
    sortConfig,
    handleSort,
    filters,
    handleFilter,
    currentPage,
    totalPages,
    itemsPerPage,
    handlePageChange,
  } = useTable(appointments, {
    searchFields: ["patient", "doctor"],
  });

  const stats = [
    { label: "Total Appointments", value: appointments.length },
    {
      label: "Today",
      value: appointments.filter((a) => a.date === "2025-11-28").length,
      color: "text-blue-600",
    },
    {
      label: "Completed",
      value: appointments.filter((a) => a.status === "completed").length,
      color: "text-green-600",
    },
    {
      label: "Scheduled",
      value: appointments.filter((a) => a.status === "scheduled").length,
      color: "text-yellow-600",
    },
    {
      label: "Cancelled",
      value: appointments.filter((a) => a.status === "cancelled").length,
      color: "text-red-600",
    },
  ];

  const columns = [
    { key: "patient", label: "Patient", sortable: true, sticky: true },
    { key: "date", label: "Date", sortable: true },
    { key: "time", label: "Time", sortable: true },
    { key: "status", label: "Status", sortable: false },
    { key: "video link", label: "Video Link" },
    {
      key: "action",
      label: "Action",
      sortable: false,
      className: "text-right",
    },
  ];
  const filterOptions = [
    {
      label: "Status",
      placeholder: "Filter by Status",
      value: filters.status || "all",
      onChange: (value) => handleFilter("status", value),
      options: [
        { value: "scheduled", label: "Scheduled" },
        { value: "completed", label: "Completed" },
        { value: "cancelled", label: "Cancelled" },
      ],
    },
  ];
  const renderRow = (appointment) => (
    <tr key={appointment.id} className="hover:bg-gray-50">
      <td className="sticky left-0 z-10 bg-white px-4 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <UserAvatar name={appointment.patient} />
          <span className="ml-3 text-sm font-medium text-gray-900">
            {appointment.patient}
          </span>
        </div>
      </td>

      <td className="px-4 py-4">{appointment.date}</td>
      <td className="px-4 py-4">{appointment.timeRange}</td>

      <td className="px-4 py-4">
        <StatusBadge status={appointment.status} />
      </td>
      <td className="px-4 py-4">
        <a href="https://example.com/" className="text-blue-600 underline">
          Dummy link
        </a>
      </td>
      <td className="px-4 py-4 text-right">
        <Button
          size="sm"
          variant="outline"
          onClick={() => openAppointment(appointment)}
        >
          View
        </Button>
      </td>
    </tr>
  );
  return (
    <DashboardLayout
      title="My Appointments"
      currentRole={currentRole}
      onRoleChange={onRoleChange}
      currentUser={{ name: "Dr. Sarah Johnson" }}
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          <StatsCards stats={stats} />

          {/* GRID: LEFT = filter + table, RIGHT = calendar */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-6 my-6">
            {/* LEFT SIDE (Filter + Table stacked) */}
            <div className="flex flex-col gap-2">
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
            </div>

            {/* RIGHT SIDE (Calendar spans height of both filter + table) */}
            <div className="lg:row-span-2">
              <Calendar16 />
            </div>
          </div>
          <AppointmentDetailsDialog
            isOpen={showDialog}
            onClose={() => setShowDialog(false)}
            appointment={selectedAppointment}
            prescription={prescription}
            onPrescriptionChange={setPrescription}
          />
        </>
      )}
    </DashboardLayout>
  );
}
