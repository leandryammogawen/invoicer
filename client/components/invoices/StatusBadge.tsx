type StatusBadgeProps = {
  status: string;
};

function getStatusClass(status: string) {
  if (status === "paid") {
    return "bg-green-100 text-green-700";
  }

  if (status === "draft") {
    return "bg-yellow-100 text-yellow-700";
  }

  if (status === "sent") {
    return "bg-blue-100 text-blue-700";
  }

  if (status === "overdue") {
    return "bg-red-100 text-red-700";
  }

  return "bg-gray-100 text-gray-700";
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-sm font-medium capitalize ${getStatusClass(status)}`}
    >
      {status}
    </span>
  );
}