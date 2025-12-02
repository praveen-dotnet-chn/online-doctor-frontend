import React, { useEffect, useState } from "react";
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
import api from "@/api/api";
import { Video, FileText, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import FullPageLoader from "@/components/ui/full-page-loader";

export const MyAppointments = ({ currentRole, onRoleChange }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showPrescriptionDialog, setShowPrescriptionDialog] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [toast, setToast] = React.useState({ show: false, message: "" });
  const [joinLinks, setJoinLinks] = useState({});
  const { user } = useAuth();
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
  };

  const patientId = user?.userId;
  // console.log("Patient ID:", patientId);
  useEffect(() => {
    async function loadAppointments() {
      try {
        // 1. Fetch appointment list
        const res = await api.get(
          `/api/patient/appointments/patient/${patientId}`
        );
        const appts = res.data;
        // console.log("Fetched Appointments:", appts);
        // 2. Fetch doctor info for each appointment
        const mapped = await Promise.all(
          appts.map(async (apt) => {
            const doc = await api.get(`/api/doctors/${apt.doctorId}`);
            const doctor = doc.data;

            return {
              id: apt.appointmentId,
              doctorId: apt.doctorId,
              doctorName: `${doctor.firstName} ${doctor.lastName}`,
              doctorAvatar: null,
              specialization: doctor.specialization,
              experience: doctor.experience,
              appointmentDate: new Date(apt.startTime).toLocaleDateString(),
              appointmentTime: `${new Date(apt.startTime).toLocaleTimeString(
                [],
                {
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )} - ${new Date(apt.endTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}`,
              status: apt.status,
              videoLink:
                apt.status === "scheduled"
                  ? "https://meet.google.com/xyz"
                  : null,
              prescriptionAvailable: apt.status === "completed",
            };
          })
        );

        setAppointments(mapped);
      } catch (err) {
        console.error(err);

        showToast("Failed to load appointments", "error");
      } finally {
        setLoading(false);
      }
    }

    loadAppointments();
  }, []);

  // =========================================================
  // Table & UI handlers
  // =========================================================
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
      options: [
        { value: "scheduled", label: "Scheduled" },
        { value: "completed", label: "Completed" },
        { value: "cancelled", label: "Cancelled" },
      ],
    },
  ];

  // =========================================================
  // Cancel & Prescription handlers
  // =========================================================
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
    showToast("Appointment cancelled successfully", "success");
  };

  const handleViewPrescription = (appointment) => {
    setSelectedAppointment(appointment);
    setShowPrescriptionDialog(true);
  };
  const generatePatientLink = async (appointmentId) => {
    try {
      // call generate-link: make sure JSON property names match backend
      const res = await api.post("/video/generate-link", {
        AppointmentId: appointmentId,
        UserId: patientId,
        Role: "patient",
      });

      const link = res.data?.link;
      if (!link) throw new Error("No link returned");

      // cache
      setJoinLinks((p) => ({ ...p, [appointmentId]: link }));
      return link;
    } catch (err) {
      console.error(
        "generatePatientLink error:",
        err?.response?.data ?? err.message
      );
      showToast("Failed to generate join link", "error");
      return null;
    }
  };
  const handleJoinVideo = async (appointment) => {
    if (!appointment) return;
    try {
      // get link from cache or generate
      const linkFromBackend =
        joinLinks[appointment.id] ||
        (await generatePatientLink(appointment.id));
      if (!linkFromBackend) return;

      // convert relative URL to absolute
      const fullLink = linkFromBackend.startsWith("http")
        ? linkFromBackend
        : `${window.location.origin}${linkFromBackend}`;

      const token = new URL(fullLink).searchParams.get("token");
      if (!token) {
        window.open(fullLink, "_blank");
        return;
      }

      if (!token) {
        // fallback: open the link directly
        window.open(link, "_blank");
        return;
      }

      // Try to *check* the /video/join response first via API (authenticated)
      // This will tell us if patient is "waiting" or redirecting to Jitsi.
      try {
        const checkRes = await api.get(
          `/video/join?token=${encodeURIComponent(token)}`
        );

        // If backend returns waiting JSON: { status: "waiting", message: "..." }
        if (checkRes.data && checkRes.data.status === "waiting") {
          showToast(
            checkRes.data.message || "Please wait for the doctor to admit you",
            "warning"
          );
          return;
        }

        // If request was redirected by server to external Jitsi, axios usually follows the redirect.
        // We try to detect final URL returned by the request and open it:
        const redirectedUrl = checkRes.request?.responseURL;
        if (
          redirectedUrl &&
          redirectedUrl !==
            `${window.location.origin}/video/join?token=${token}`
        ) {
          window.open(redirectedUrl, "_blank");
          return;
        }

        // Fallback: open original link in new tab (browser will attempt redirect)
        window.open(link, "_blank");
      } catch (err) {
        // If check GET fails (CORS/redirect issues), fallback to opening link in new tab
        console.warn(
          "Could not check join endpoint, falling back to open link:",
          err?.message ?? err
        );
        window.open(link, "_blank");
      }
    } catch (err) {
      console.error(err);
      showToast("Unable to start video call", "error");
    }
  };

  // =========================================================
  // Row Renderer
  // =========================================================
  const renderRow = (appointment) => (
    <tr key={appointment.id} className="hover:bg-gray-50">
      <td className="sticky left-0 z-10 bg-white px-4 py-4 whitespace-nowrap">
        <div className="flex items-center pointer-events-none">
          <div className="pointer-events-auto">
            <UserAvatar
              name={appointment.doctorName}
              image={appointment.doctorAvatar}
            />
          </div>

          <div className="ml-3">
            <p className="text-sm font-medium">{appointment.doctorName}</p>
            <p className="text-xs text-gray-500">
              {appointment.specialization}
            </p>
          </div>
        </div>
      </td>

      <td className="px-4 py-4">{appointment.specialization}</td>
      <td className="px-4 py-4">{appointment.experience} yrs</td>

      <td className="px-4 py-4 whitespace-nowrap">
        <p className="font-medium">{appointment.appointmentDate}</p>
        <p className="text-gray-500">{appointment.appointmentTime}</p>
      </td>

      <td className="px-4 py-4">
        <StatusBadge status={appointment.status} />
      </td>

      <td className="px-4 py-4">
        {appointment.status === "scheduled" ? (
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleJoinVideo(appointment)}
          >
            <Video className="w-4 h-4 mr-2" />
            Join Call
          </Button>
        ) : (
          <span className="text-gray-400">-</span>
        )}
      </td>

      <td className="px-4 py-4">
        {appointment.prescriptionAvailable ? (
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleViewPrescription(appointment)}
          >
            <FileText className="w-4 h-4 mr-2" />
            View
          </Button>
        ) : (
          <span className="text-gray-400">Not available</span>
        )}
      </td>

      <td className="px-4 py-4 text-right">
        {appointment.status === "scheduled" ? (
          <Button
            size="sm"
            variant="destructive"
            onClick={() => handleCancelClick(appointment)}
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        ) : (
          <span className="text-gray-400">-</span>
        )}
      </td>
    </tr>
  );

  if (loading) return <FullPageLoader />;

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
        columns={[
          { key: "doctor", label: "Doctor", sortable: true, sticky: true },
          { key: "specialization", sortable: true, label: "Specialization" },
          { key: "experience", sortable: true, label: "Experience" },
          { key: "date", label: "Date & Time" },
          { key: "status", label: "Status" },
          { key: "videoLink", label: "Video Link" },
          { key: "prescription", label: "Prescription" },
          { key: "action", label: "Action", className: "text-right" },
        ]}
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

      <CancelAppointmentDialog
        isOpen={showCancelDialog}
        onClose={() => setShowCancelDialog(false)}
        appointment={selectedAppointment}
        onConfirm={handleConfirmCancel}
      />

      <PrescriptionDialog
        isOpen={showPrescriptionDialog}
        onClose={() => setShowPrescriptionDialog(false)}
        appointment={selectedAppointment}
      />

      <Toast
        message={toast.message}
        show={toast.show}
        type={toast.type}
        onClose={() => setToast({ show: false, message: "", type: "success" })}
      />
    </DashboardLayout>
  );
};
