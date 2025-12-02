import React, { useState } from "react";
import { X, Video, LogOut, Activity } from "lucide-react";
import * as Icons from "lucide-react";
import { UserAvatar } from "../shared/UserAvatar";
import { SIDEBAR_ITEMS } from "../../utils/constants";
import { useAuth } from "../../context/AuthContext";
import { LogoutDialog } from "../shared/LogoutDialog";
import { useLocation } from "react-router-dom";
export const Sidebar = ({ isOpen, onClose, onNavigate }) => {
  const location = useLocation();
  const { user, logout } = useAuth();

  // STATE for Logout Dialog
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const currentRole = user?.role;
  const menuItems = SIDEBAR_ITEMS[currentRole] || [];

  // Called when user clicks "Yes, Logout"
  const handleLogoutConfirm = () => {
    setIsLogoutOpen(false);
    logout(); // this should clear token & redirect
  };

  return (
    <>
      {/* SIDEBAR */}
      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                {/* <Video className="w-5 h-5 text-white"/> */}
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-gray-900">Doc2U</span>
            </div>
            <button onClick={onClose} className="lg:hidden cursor-pointer">
              <X className="w-6 h-6" />
            </button>
          </div>
          {/* Navigation */}

          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {menuItems.map((item, idx) => {
              const IconComponent = Icons[item.icon];
              const isActive = location.pathname === item.path; // First item active for demo

              return (
                <button
                  key={idx}
                  onClick={() => onNavigate(item.path)}
                  className={`
    cursor-pointer w-full flex items-center space-x-3 px-4 py-3 rounded-lg 
    transition-colors text-left
    ${isActive ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"}
  `}
                >
                  {IconComponent && <IconComponent className="w-5 h-5" />}
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
          {/* User Profile + Logout */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <UserAvatar
                name={`${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim()}
                email={user?.email}
              />

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.firstName + " " + user?.lastName || "User"}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {currentRole}
                </p>
              </div>

              {/*  OPEN LOGOUT DIALOG */}
              <button
                className="text-gray-400 hover:text-gray-600"
                aria-label="Logout"
                onClick={() => setIsLogoutOpen(true)}
              >
                <LogOut className="w-5 h-5 cursor-pointer" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* LOGOUT DIALOG COMPONENT */}
      <LogoutDialog
        isOpen={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
        onConfirm={handleLogoutConfirm}
      />
    </>
  );
};
