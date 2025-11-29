// import { Search } from "lucide-react";
// import Sidebar from "./Sidebar";
// import { Button } from "@/components/ui/button";

// export default function Header({ user }) {
//   const today = new Date().toLocaleDateString();

//   return (
//     <header className="w-full px-4 py-4 border-b bg-white">
//       {/* MOBILE HEADER — ChatGPT Style */}
//       <div className="flex items-center justify-between md:hidden">
//         {/* Hamburger menu */}
//         <Sidebar mobile={true} />

//         {/* Center title */}
//         <h1 className="text-lg font-semibold">{user}</h1>

//         {/* Search icon */}
//         <Button variant="ghost" size="icon">
//           <Search size={20} className="text-gray-600" />
//         </Button>
//       </div>

//       {/* DESKTOP HEADER */}
//       <div className="hidden md:flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-semibold">Hi, {user}</h1>
//           <p className="text-sm text-gray-500">{today}</p>
//         </div>

//         {/* Search bar */}
//         <div className="relative w-64">
//           <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
//           <input
//             placeholder="Search doctors..."
//             className="pl-10 w-full border rounded-md h-10 px-3"
//           />
//         </div>
//       </div>
//     </header>
//   );
// }
// src/components/layout/Header.jsx

import React from "react";
import { Menu, Bell } from "lucide-react";

export const Header = ({ title, onMenuClick, notificationCount = 0 }) => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-gray-500 hover:text-gray-700"
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
