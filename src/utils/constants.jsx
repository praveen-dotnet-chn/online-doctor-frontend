// src/utils/constants.js

export const USER_ROLES = {
  PATIENT: "patient",
  DOCTOR: "doctor",
  ADMIN: "admin",
};

export const APPOINTMENT_STATUS = {
  SCHEDULED: "scheduled",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
};

export const DOCTOR_STATUS = {
  AVAILABLE: "available",
  BUSY: "busy",
  OFFLINE: "offline",
};

export const USER_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
};

export const ITEMS_PER_PAGE = 5;

export const SIDEBAR_ITEMS = {
  [USER_ROLES.PATIENT]: [
    { icon: "Home", label: "Dashboard", path: "/patient" },
    { icon: "Calendar", label: "My Appointments", path: "/my-appointments" },
    { icon: "FileText", label: "Medical Records", path: "/records" },
    { icon: "User", label: "Profile", path: "/profile" },
    // { icon: "Settings", label: "Settings", path: "/settings" },
  ],
  [USER_ROLES.DOCTOR]: [
    { icon: "Home", label: "Dashboard", path: "/doctor" },
    { icon: "Calendar", label: "Appointments", path: "/appointments" },
    { icon: "Users", label: "Patients", path: "/patients" },
    { icon: "FileText", label: "Prescriptions", path: "/prescriptions" },
    { icon: "Settings", label: "Settings", path: "/settings" },
  ],
  [USER_ROLES.ADMIN]: [
    { icon: "Home", label: "Dashboard", path: "/admin" },
    { icon: "Users", label: "Manage Doctors", path: "/doctors" },
    { icon: "Users", label: "Manage Patients", path: "/patients" },
    { icon: "Calendar", label: "All Appointments", path: "/appointments" },
    { icon: "Settings", label: "System Settings", path: "/settings" },
  ],
};

export const STATUS_BADGE_STYLES = {
  [DOCTOR_STATUS.AVAILABLE]: "bg-green-100 text-green-800",
  [DOCTOR_STATUS.BUSY]: "bg-yellow-100 text-yellow-800",
  [DOCTOR_STATUS.OFFLINE]: "bg-gray-100 text-gray-800",
  [APPOINTMENT_STATUS.SCHEDULED]: "bg-blue-100 text-blue-800",
  [APPOINTMENT_STATUS.COMPLETED]: "bg-green-100 text-green-800",
  [APPOINTMENT_STATUS.CANCELLED]: "bg-red-100 text-red-800",
  [USER_STATUS.ACTIVE]: "bg-green-100 text-green-800",
  [USER_STATUS.INACTIVE]: "bg-gray-100 text-gray-800",
};
