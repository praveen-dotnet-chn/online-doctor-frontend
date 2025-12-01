import React from "react";
import { Menu, Bell } from "lucide-react";

export const Header = ({ title, onMenuClick, notificationCount = 0 }) => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-gray-500 hover:text-gray-700 cursor-pointer"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
      </div>

      <div className="flex items-center space-x-4">
        <button
          className="relative text-gray-500 hover:text-gray-700"
          aria-label="Notifications"
        >
          <Bell className="w-6 h-6" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
