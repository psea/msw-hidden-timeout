import { useState } from "react";

function App() {
  const [status, setStatus] = useState<unknown>(null);

  const checkStatus = async () => {
    try {
      const res = await fetch("/check");
      const data = await res.json();
      setStatus(data);
    } catch (error) {
      setStatus("⛓️‍💥 error");
      console.error("Error fetching status:", error);
    }
  };

  const fixMswState = () => {
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage("MOCK_ACTIVATE");
    }
  };

  return (
    <main>
      <h1>MSW termination when hidden</h1>
      <ol>
        <li>✅ Check the status of the MSW. See the response.</li>
        <li>⚠️ Close developer tools if open.</li>
        <li>💤 Minimize the window or switch the tab.</li>
        <li>⏳ Wait 5 min before restoring the window.</li>
        <li>❌ Check the status of the MSW again. See the error.</li>
        <li>⛑️ Click the "🔧 Fix MSW" button to restore the mocking.</li>
        <li>
          ✅ Check the status of the MSW again. See the response restored.
        </li>
      </ol>
      <button onClick={checkStatus}>Check status</button>
      <pre>{JSON.stringify(status, null, 2)}</pre>
      <button onClick={fixMswState}>🔧 Fix MSW </button>
    </main>
  );
}

export default App;
