type StatusBadgeProps = {
  status: string;
};

function getStatusClass(status: string) {
  if (status === "paid") {
    return "bg-green-100 text-green-600";
  }

  if (status === "draft") {
    return "bg-gray-100 text-gray-600";
  }

  if (status === "sent") {
    return "bg-blue-100 text-blue-600";
  }

  if (status === "overdue") {
    return "bg-red-100 text-red-600";
  }

  return "bg-gray-100 text-gray-600";
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