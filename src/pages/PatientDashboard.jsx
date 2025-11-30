// import Sidebar from "@/components/layout/Sidebar";
// import Header from "@/components/layout/Header";
// import DoctorTable from "@/components/ui/DoctorTable";
// import SearchBar from "@/components/ui/SearchBar";
// import { doctorsData } from "@/data/doctors";
// import { useState } from "react";

// export default function PatientDashboard() {
//   const [search, setSearch] = useState("");

//   const filtered = doctorsData.filter((d) =>
//     d.name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="flex">
//       <Sidebar />

//       <main className="flex-1 bg-gray-50 min-h-screen">
//         <Header user="John" />

//         <div className="p-6">
//           <SearchBar value={search} onChange={setSearch} />

//           <DoctorTable doctors={filtered} />
//         </div>
//       </main>
//     </div>
//   );
// }
import React from "react";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { StatsCards } from "../components/dashboard/StatsCards";
import { FilterBar } from "../components/dashboard/FilterBar";
import { DataTable } from "../components/dashboard/DataTable";
import { StatusBadge } from "../components/shared/StatusBadge";
import { UserAvatar } from "../components/shared/UserAvatar";
import { Button } from "@/components/ui/button";
import { useTable } from "../hooks/useTable";
// import { doctorsData } from "../data/mockData";
import useDoctors from "../hooks/useDoctors";
import { getUniqueValues } from "../utils/tableHelpers";
import { USER_ROLES } from "../utils/constants";


function PatientDashboard({ currentRole, onRoleChange }) {
  
const { doctors, loading, fetchDoctors } = useDoctors();

React.useEffect(() => {
  fetchDoctors();
}, []);

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
  } = useTable(doctors, {
    searchFields: ["name", "specialization"],
    filterFields: ["status", "specialization"],
  });

  const specializations = getUniqueValues(doctors, "specialization");

  const stats = [
    { label: "Total Doctors", value: doctors.length },
    {
      label: "Available Now",
      value: doctors.filter((d) => d.status === "available").length,
      color: "text-green-600",
    },
    { label: "This Week", value: "12" },
    { label: "Pending", value: "4", color: "text-yellow-600" },
  ];

  const filterOptions = [
    {
      label: "Specializations",
      placeholder: "Specialization",
      value: filters.specialization || "all",
      onChange: (value) => handleFilter("specialization", value),
      showIcon: true,
      options: specializations.map((spec) => ({ value: spec, label: spec })),
    },
    {
      label: "Status",
      placeholder: "Status",
      value: filters.status || "all",
      onChange: (value) => handleFilter("status", value),
      showIcon: false,
      options: [
        { value: "available", label: "Available" },
        { value: "busy", label: "Busy" },
        { value: "offline", label: "Offline" },
      ],
    },
  ];

  const columns = [
    { key: "name", label: "Doctor", sortable: true, sticky: true },
    {
      key: "specialization",
      label: "Specialization",
      sortable: true,
      className: "whitespace-nowrap",
    },
    { key: "experience", label: "Experience", sortable: true },
    { key: "status", label: "Status", sortable: false },
    { key: "rating", label: "Rating", sortable: true },
    {
      key: "nextAvailable",
      label: "Next Available",
      sortable: false,
      className: "whitespace-nowrap",
    },
    {
      key: "action",
      label: "Action",
      sortable: false,
      className: "text-right",
    },
  ];

  const renderRow = (doctor) => (
    <tr key={doctor.id} className="hover:bg-gray-50">
      <td className="sticky left-0 z-10 bg-white px-4 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <UserAvatar name={doctor.name} image={doctor.avatar} />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{doctor.name}</p>
            <p className="text-xs text-gray-500">
              {doctor.consultations} consultations
            </p>
          </div>
        </div>
      </td>
      <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">
        {doctor.specialization}
      </td>
      <td className="px-4 py-4 text-sm text-gray-900">
        {doctor.experience} years
      </td>
      <td className="px-4 py-4">
        <StatusBadge status={doctor.status} />
      </td>
      <td className="px-4 py-4 text-sm text-gray-900">⭐ {doctor.rating}</td>
      <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">
        {doctor.nextAvailable}
      </td>
      <td className="px-4 py-4 text-right">
        <Button
          size="sm"
          disabled={doctor.status !== "available"}
          className="whitespace-nowrap"
        >
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
    </DashboardLayout>
  );
}
export default PatientDashboard;
