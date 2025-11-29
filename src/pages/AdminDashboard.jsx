// export default function AdminDashboard() {
//   return <h1 className="p-10 text-3xl">Admin Dashboard</h1>;
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
import { patientsData } from "../data/mockData";

function AdminDashboard({ currentRole, onRoleChange }) {
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
  } = useTable(patientsData, {
    searchFields: ["name", "email", "phone"],
  });

  const stats = [
    { label: "Total Patients", value: patientsData.length },
    {
      label: "Active",
      value: patientsData.filter((p) => p.status === "active").length,
      color: "text-green-600",
    },
    {
      label: "Inactive",
      value: patientsData.filter((p) => p.status === "inactive").length,
      color: "text-gray-600",
    },
    { label: "New This Month", value: "8", color: "text-blue-600" },
  ];

  const columns = [
    { key: "name", label: "Name", sortable: true, sticky: true },
    { key: "email", label: "Email", sortable: true },
    { key: "phone", label: "Phone", sortable: false },
    {
      key: "lastVisit",
      label: "Last Visit",
      sortable: true,
      className: "whitespace-nowrap",
    },
    { key: "status", label: "Status", sortable: false },
    {
      key: "action",
      label: "Action",
      sortable: false,
      className: "text-right",
    },
  ];

  const renderRow = (patient) => (
    <tr key={patient.id} className="hover:bg-gray-50">
      <td className="sticky left-0 z-10 bg-white px-4 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <UserAvatar name={patient.name} />
          <span className="ml-3 text-sm font-medium text-gray-900">
            {patient.name}
          </span>
        </div>
      </td>
      <td className="px-4 py-4 text-sm text-gray-900">{patient.email}</td>
      <td className="px-4 py-4 text-sm text-gray-900">{patient.phone}</td>
      <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">
        {patient.lastVisit}
      </td>
      <td className="px-4 py-4">
        <StatusBadge status={patient.status} />
      </td>
      <td className="px-4 py-4 text-right">
        <Button size="sm" variant="outline">
          Manage
        </Button>
      </td>
    </tr>
  );

  return (
    <DashboardLayout
      title="Manage Patients"
      currentRole={currentRole}
      onRoleChange={onRoleChange}
      currentUser={{ name: "Admin User" }}
    >
      <StatsCards stats={stats} />

      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={handleSearch}
        searchPlaceholder="Search patients..."
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
export default AdminDashboard;
