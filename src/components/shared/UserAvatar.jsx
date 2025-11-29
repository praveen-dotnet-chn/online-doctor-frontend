// src/components/shared/UserAvatar.jsx

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "../../utils/tableHelpers";

export const UserAvatar = ({ name, image, size = "default" }) => {
  const sizeClasses = {
    small: "w-8 h-8",
    default: "w-10 h-10",
    large: "w-12 h-12",
  };

  return (
    <Avatar className={sizeClasses[size]}>
      <AvatarImage src={image} alt={name} />
      <AvatarFallback>{getInitials(name)}</AvatarFallback>
    </Avatar>
  );
};
