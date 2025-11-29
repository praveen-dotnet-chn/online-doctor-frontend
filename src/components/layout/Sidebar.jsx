import React from "react";
import { X, Video, LogOut } from "lucide-react";
import * as Icons from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserAvatar } from "../shared/UserAvatar";
import { SIDEBAR_ITEMS, USER_ROLES } from "../../utils/constants";
import { useAuth } from "../../context/AuthContext";
export const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();

  // role comes from user data
  const currentRole = user?.role;

  // fetch menu items based on role
  const menuItems = SIDEBAR_ITEMS[currentRole] || [];

  return (
    <aside
      className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
    >
      <div className="flex flex-col h-full">
        {/* Logo Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Video className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-gray-900">Doc2U</span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-gray-500 hover:text-gray-700"
            aria-label="Close sidebar"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {menuItems.map((item, idx) => {
            const IconComponent = Icons[item.icon];
            const isActive = idx === 0; // First item active for demo

            return (
              <button
                key={idx}
                className={`
                  cursor-pointer w-full flex items-center space-x-3 px-4 py-3 rounded-lg 
                  transition-colors text-left
                  ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }
                `}
              >
                {IconComponent && <IconComponent className="w-5 h-5" />}
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Role Switcher (Demo) */}
        {/* <div className="p-4 border-t border-gray-200">
          <Select value={currentRole} onValueChange={onRoleChange}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={USER_ROLES.PATIENT}>Patient View</SelectItem>
              <SelectItem value={USER_ROLES.DOCTOR}>Doctor View</SelectItem>
              <SelectItem value={USER_ROLES.ADMIN}>Admin View</SelectItem>
            </SelectContent>
          </Select>
        </div> */}

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <UserAvatar name={user?.name || "John Doe"} image={user?.avatar} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.name || "John Doe"}
              </p>
              <p className="text-xs text-gray-500 capitalize">{currentRole}</p>
            </div>
            <button
              className="text-gray-400 hover:text-gray-600"
              aria-label="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
