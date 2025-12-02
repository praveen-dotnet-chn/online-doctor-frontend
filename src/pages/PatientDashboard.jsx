import React from "react";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { StatsCards } from "../components/dashboard/StatsCards";
import { FilterBar } from "../components/dashboard/FilterBar";
import { DataTable } from "../components/dashboard/DataTable";
import { UserAvatar } from "../components/shared/UserAvatar";
import { Button } from "@/components/ui/button";
import { DoctorProfileDialog } from "../components/booking/DoctorProfileDialog";
import { ReasonDialog } from "../components/booking/ReasonDialog";
import { useTable } from "../hooks/useTable";
import useDoctors from "../hooks/useDoctors";
import { Toast } from "../components/shared/Toast";
import { useBooking } from "../hooks/useBooking";
import useSlots from "../hooks/useSlots";

import { getUniqueValues } from "../utils/tableHelpers";

export default function PatientDashboard({ currentRole, onRoleChange }) {
  const { doctors, loading, fetchDoctors } = useDoctors();
  const { slots, loadingSlots, fetchSlots } = useSlots();

  const {
    bookingStep,
    selectedDoctor,
    selectedSlot,
    bookingReason,
    showToast,
    toastMessage,
    startBooking,
    selectSlot,
    confirmSlot,
    updateReason,
    confirmBooking,
    resetBooking,
    closeToast,
  } = useBooking();

  // fetch Doctors details
  React.useEffect(() => {
    fetchDoctors();
  }, []);

  // fetch Availability Slots for all doctors
  React.useEffect(() => {
    fetchDoctors();
    fetchSlots();
  }, []);
  const combinedDoctors = doctors.map((doc) => ({
    ...doc,
    availableSlots: slots.filter((s) => s.doctorId === doc.id),
  }));
  // useTable now works with DB doctors
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
  } = useTable(combinedDoctors, {
    searchFields: ["name", "specialization"],
    filterFields: ["specialization"], // ✔ removed status filter
  });

  const specializations = getUniqueValues(doctors, "specialization");

  const stats = [{ label: "Total Doctors", value: doctors.length }];

  //  only specialization filter now
  const filterOptions = [
    {
      label: "Specializations",
      placeholder: "Specialization",
      value: filters.specialization || "all",
      onChange: (value) => handleFilter("specialization", value),
      showIcon: true,
      options: specializations.map((spec) => ({ value: spec, label: spec })),
    },
  ];

  //  Removed status / rating / nextAvailable
  const columns = [
    { key: "name", label: "Doctor", sortable: true, sticky: true },
    { key: "specialization", label: "Specialization", sortable: true },
    { key: "experience", label: "Experience", sortable: true },
    {
      key: "action",
      label: "Action",
      sortable: false,
      className: "text-right",
    },
  ];

  //  DB-friendly row rendering
  const renderRow = (doctor) => (
    <tr key={doctor.id} className="hover:bg-gray-50">
      <td className="sticky left-0 z-10 bg-white px-4 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <UserAvatar name={doctor.name} />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{doctor.name}</p>
          </div>
        </div>
      </td>

      <td className="px-4 py-4 text-sm text-gray-900">
        {doctor.specialization}
      </td>

      <td className="px-4 py-4 text-sm text-gray-900">
        {doctor.experience ? doctor.experience + " years" : "-"}
      </td>
      <td className="px-4 py-4 text-right">
        <Button size="sm" onClick={() => startBooking(doctor)}>
          Book Now
        </Button>
      </td>
    </tr>
  );

  return (
    <DashboardLayout
      title="Find a Doctor"
      currentRole={currentRole}
      onRoleChange={onRoleChange}
      currentUser={{ name: "John Doe" }}
    >
      <StatsCards stats={stats} />

      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={handleSearch}
        filters={filterOptions}
        searchPlaceholder="Search doctors..."
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
      {/* Doctor Profile Dialog */}
      <DoctorProfileDialog
        isOpen={bookingStep === "profile"}
        onClose={resetBooking}
        doctor={selectedDoctor}
        selectedSlot={selectedSlot}
        onSlotSelect={selectSlot}
        onConfirm={confirmSlot}
      />
      {/* Reason Dialog */}
      <ReasonDialog
        isOpen={bookingStep === "reason"}
        onClose={resetBooking}
        doctor={selectedDoctor}
        selectedSlot={selectedSlot}
        reason={bookingReason}
        onReasonChange={updateReason}
        onConfirm={confirmBooking}
      />
      {/* Toast */}
      <Toast message={toastMessage} show={showToast} onClose={closeToast} />
    </DashboardLayout>
  );
}
