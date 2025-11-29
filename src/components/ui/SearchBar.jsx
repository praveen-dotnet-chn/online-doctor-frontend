import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full max-w-sm mb-4">
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
      <Input
        placeholder="Search doctors..."
        className="pl-10"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
