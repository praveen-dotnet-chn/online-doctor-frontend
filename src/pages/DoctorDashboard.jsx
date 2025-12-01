// // export default function DoctorDashboard() {
// //   return <h1 className="p-10 text-3xl">Doctor Dashboard</h1>;
// // }
// import React from "react";
// import { DashboardLayout } from "../components/layout/DashboardLayout";
// import { StatsCards } from "../components/dashboard/StatsCards";
// import { FilterBar } from "../components/dashboard/FilterBar";
// import { DataTable } from "../components/dashboard/DataTable";
// import { StatusBadge } from "../components/shared/StatusBadge";
// import { UserAvatar } from "../components/shared/UserAvatar";
// import { Button } from "@/components/ui/button";
// import { useTable } from "../hooks/useTable";
// import { appointmentsData } from "../data/mockData";

// function DoctorDashboard({ currentRole, onRoleChange }) {
//   const {
//     data,
//     totalItems,
//     searchQuery,
//     handleSearch,
//     sortConfig,
//     handleSort,
//     currentPage,
//     totalPages,
//     itemsPerPage,
//     handlePageChange,
//   } = useTable(appointmentsData, {
//     searchFields: ["patient", "doctor"],
//   });

//   const stats = [
//     { label: "Total Appointments", value: appointmentsData.length },
//     {
//       label: "Today",
//       value: appointmentsData.filter((a) => a.date === "2025-11-28").length,
//       color: "text-blue-600",
//     },
//     {
//       label: "Completed",
//       value: appointmentsData.filter((a) => a.status === "completed").length,
//       color: "text-green-600",
//     },
//     {
//       label: "Scheduled",
//       value: appointmentsData.filter((a) => a.status === "scheduled").length,
//       color: "text-yellow-600",
//     },
//   ];

//   const columns = [
//     { key: "patient", label: "Patient", sortable: true, sticky: true },
//     { key: "date", label: "Date", sortable: true },
//     { key: "time", label: "Time", sortable: true },
//     { key: "type", label: "Type", sortable: false },
//     { key: "status", label: "Status", sortable: false },
//     {
//       key: "action",
//       label: "Action",
//       sortable: false,
//       className: "text-right",
//     },
//   ];

//   const renderRow = (appointment) => (
//     <tr key={appointment.id} className="hover:bg-gray-50">
//       <td className="sticky left-0 z-10 bg-white px-4 py-4 whitespace-nowrap">
//         <div className="flex items-center">
//           <UserAvatar name={appointment.patient} />
//           <span className="ml-3 text-sm font-medium text-gray-900">
//             {appointment.patient}
//           </span>
//         </div>
//       </td>
//       <td className="px-4 py-4 text-sm text-gray-900">{appointment.date}</td>
//       <td className="px-4 py-4 text-sm text-gray-900">{appointment.time}</td>
//       <td className="px-4 py-4 text-sm text-gray-900">{appointment.type}</td>
//       <td className="px-4 py-4">
//         <StatusBadge status={appointment.status} />
//       </td>
//       <td className="px-4 py-4 text-right">
//         <Button size="sm" variant="outline">
//           View Details
//         </Button>
//       </td>
//     </tr>
//   );

//   return (
//     <DashboardLayout
//       title="My Appointments"
//       currentRole={currentRole}
//       onRoleChange={onRoleChange}
//       currentUser={{ name: "Dr. Sarah Johnson" }}
//     >
//       <StatsCards stats={stats} />

//       <FilterBar
//         searchQuery={searchQuery}
//         onSearchChange={handleSearch}
//         searchPlaceholder="Search appointments..."
//       />

//       <DataTable
//         columns={columns}
//         data={data}
//         onSort={handleSort}
//         sortConfig={sortConfig}
//         currentPage={currentPage}
//         totalPages={totalPages}
//         totalItems={totalItems}
//         itemsPerPage={itemsPerPage}
//         onPageChange={handlePageChange}
//         renderRow={renderRow}
//       />
//     </DashboardLayout>
//   );
// }
// export default DoctorDashboard;
// src/pages/DoctorDashboard.jsx

import React from "react";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { StatsCards } from "../components/dashboard/StatsCards";
import { FilterBar } from "../components/dashboard/FilterBar";
import { DataTable } from "../components/dashboard/DataTable";
import { StatusBadge } from "../components/shared/StatusBadge";
import { UserAvatar } from "../components/shared/UserAvatar";
import { Button } from "@/components/ui/button";
import { useTable } from "../hooks/useTable";
// import { appointmentsData } from "../data/mockData";
import useDoctorAppointments from "../hooks/useDoctorAppointments";

const Loader = () => (
  <div className="w-full py-20 flex justify-center items-center">
    <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
  </div>
);


function DoctorDashboard({ currentRole, onRoleChange }) {

  const doctorId = "398d74ab-6684-421b-a0ec-e7566decaf3c"; // temp, replace with real logged-in user

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
  ];

const columns = [
  { key: "patient", label: "Patient", sortable: true, sticky: true },
  { key: "date", label: "Date", sortable: true },
  { key: "time", label: "Time", sortable: true },
  { key: "status", label: "Status", sortable: false },
  { key: "action", label: "Action", sortable: false, className: "text-right" },
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
    <td className="px-4 py-4">{appointment.time}</td>
    <td className="px-4 py-4">
      <StatusBadge status={appointment.status} />
    </td>
    <td className="px-4 py-4 text-right">
      <Button size="sm" variant="outline">View</Button>
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

      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={handleSearch}
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
      </>
      )}
    </DashboardLayout>
  );
}
