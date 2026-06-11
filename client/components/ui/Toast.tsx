type ToastProps = {
  message: string;
  type: "success" | "error";
};

export default function Toast({ message, type = "success" }: ToastProps) {
  if (!message) return null;

  const styles =
    type === "success"
      ? "border-green-200 bg-green-50 text-green-700"
      : "border-red-200 bg-red-50 text-red-700";

  return (
    <div
      className={`fixed right-4 top-4 z-50 rounded-md border px-4 py-3 text-sm shadow-lg ${styles}`}
    >
      {message}
    </div>
  );
}