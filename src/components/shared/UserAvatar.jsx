import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "../../utils/tableHelpers";

export const UserAvatar = ({ name, image, email, size = "default" }) => {
  // console.log("UserAvatar image:", image);
  const sizeClasses = {
    small: "w-8 h-8",
    default: "w-10 h-10",
    large: "w-12 h-12",
    xlarge: "w-32 h-32", // 8rem × 8rem, much bigger
  };

  const initials = getInitials({
    firstName: name?.split(" ")[0],
    lastName: name?.split(" ")[1],
    email,
  });

  return (
    <Avatar className={sizeClasses[size]}>
      <AvatarImage src={image} alt={name} />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
};
