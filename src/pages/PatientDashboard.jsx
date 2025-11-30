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
  { label: "Total Doctors", value: doctors.length }
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
  ];

  const columns = [
  { key: "name", label: "Doctor", sortable: true, sticky: true },
  { key: "specialization", label: "Specialization", sortable: true },
  { key: "experience", label: "Experience (Years)", sortable: true },
];


const renderRow = (doctor) => (
  <tr key={doctor.id} className="hover:bg-gray-50">
    <td className="sticky left-0 z-10 bg-white px-4 py-4">
      {doctor.name}
    </td>
    <td className="px-4 py-4">{doctor.specialization}</td>
    <td className="px-4 py-4">{doctor.experience} years</td>
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
