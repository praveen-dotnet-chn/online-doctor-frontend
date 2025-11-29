import React from "react";
import { Input } from "@/components/ui/input";

export default function Filters({ onSearch }) {
  const [q, setQ] = React.useState("");

  React.useEffect(() => {
    const t = setTimeout(() => onSearch(q), 250);
    return () => clearTimeout(t);
  }, [q]);

  return (
    <div className="flex items-center gap-2">
      <Input
        placeholder="Search doctors..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      {/* Add more filter controls (dropdowns) here if needed */}
    </div>
  );
}
