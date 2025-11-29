export default function StatusBadge({ status }) {
  const styles = {
    Available: "bg-green-100 text-green-700",
    Busy: "bg-red-100 text-red-700",
    Offline: "bg-gray-200 text-gray-600",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs ${styles[status]}`}>
      {status}
    </span>
  );
}
