import React from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { MobileOverlay } from "./MobileOverlay";
import { useSidebar } from "../../hooks/useSidebar";
import { useNavigate } from "react-router-dom";
export const DashboardLayout = ({
  children,
  title,
  currentRole,
  onRoleChange,
  currentUser,
}) => {
  const sidebar = useSidebar();
  const navigate = useNavigate();

  const handleSidebarNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        isOpen={sidebar.isOpen}
        onClose={sidebar.close}
        currentRole={currentRole}
        onRoleChange={onRoleChange}
        currentUser={currentUser}
        onNavigate={handleSidebarNavigate}
      />

      <MobileOverlay isOpen={sidebar.isOpen} onClose={sidebar.close} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          title={title}
          onMenuClick={sidebar.open}
          notificationCount={3}
        />

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
};
