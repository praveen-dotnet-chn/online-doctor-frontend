// src/components/shared/StatusBadge.jsx

import React from "react";
import { Badge } from "@/components/ui/badge";
import { STATUS_BADGE_STYLES } from "../../utils/constants";

export const StatusBadge = ({ status }) => {
  const className = STATUS_BADGE_STYLES[status] || "bg-gray-100 text-gray-800";

  return <Badge className={className}>{status}</Badge>;
};
