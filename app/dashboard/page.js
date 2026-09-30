'use client';
import { useState } from 'react';

export default function Dashboard() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Hardcoded for now until we connect the Lemon Squeezy webhook database
  const apiKey = "sk_test_octothorp_12345";

  const testConnection = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://d8v01rrw7d.execute-api.af-south-1.amazonaws.com/Prod/invoice/clear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ order_id: "DASHBOARD-TEST-001" })
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      setResponse({ error: "Network failed" });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white p-10 font-sans">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Developer Dashboard</h1>
        
        <div className="bg-[#1E293B] p-6 rounded-lg border border-slate-700">
          <h2 className="text-xl font-semibold mb-2">Your API Keys</h2>
          <p className="text-slate-400 mb-4">Use this secret key to authenticate your payload requests to the Octothorp API. Do not expose this in client-side code.</p>
          <code className="bg-black p-3 rounded block text-green-400 border border-slate-800">
            {apiKey}
          </code>
        </div>

        <div className="bg-[#1E293B] p-6 rounded-lg border border-slate-700">
          <h2 className="text-xl font-semibold mb-4">Test Integration</h2>
          <button 
            onClick={testConnection}
            disabled={loading}
            className="bg-white text-black font-semibold hover:bg-slate-200 px-4 py-2 rounded transition-colors disabled:opacity-50"
          >
            {loading ? "Testing..." : "Test AWS Lambda Connection"}
          </button>

          {response && (
            <div className="mt-4 p-4 bg-black rounded border border-slate-700 overflow-x-auto">
              <pre className="text-sm text-slate-300">
                {JSON.stringify(response, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}