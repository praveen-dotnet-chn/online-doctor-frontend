import { Button } from "@/components/ui/button";
import StatusBadge from "./StatusBadge";

export default function DoctorTable({ doctors }) {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm overflow-x-auto">
      <table className="min-w-[650px] w-full">
        <thead className="border-b bg-gray-50">
          <tr>
            <th className="p-3 text-left sticky left-0 bg-gray-50">
              Doctor Name
            </th>
            <th className="p-3 text-left">Specialization</th>
            <th className="p-3 text-left">Experience</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {doctors.map((d) => (
            <tr key={d.id} className="border-b">
              <td className="p-3 font-medium sticky left-0 bg-white">
                {d.name}
              </td>
              <td className="p-3">{d.specialization}</td>
              <td className="p-3">{d.experience} yrs</td>
              <td className="p-3">
                <StatusBadge status={d.status} />
              </td>
              <td className="p-3">
                <Button size="sm">View</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
