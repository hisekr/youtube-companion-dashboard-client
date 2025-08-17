export default function LogsSection({ logs }) {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold">Logs</h2>
      <ul className="mt-2 max-h-[300px] overflow-y-auto border rounded p-2">
        {logs.map((log) => (
          <li key={log.id} className="border-b py-2">
            <p>
              {log.event_type} -{" "}
              {new Date(log.timestamp).toLocaleString("en-IN", {
                timeZone: "Asia/Kolkata",
              })}
            </p>
            <pre className="text-sm text-gray-600">
              {JSON.stringify(log.details, null, 2)}
            </pre>
          </li>
        ))}
      </ul>
    </div>
  );
}
