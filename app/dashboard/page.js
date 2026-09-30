'use client';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [apiKey, setApiKey] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const savedKey = localStorage.getItem('octothorp_api_key');
    if (savedKey) setApiKey(savedKey);
  }, []);

  const generateNewKey = async () => {
    setGenerating(true);
    try {
      const res = await fetch('https://d8v01rrw7d.execute-api.af-south-1.amazonaws.com/Prod/keys/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-master-key': 'octothorp-admin-2026'
        },
        body: JSON.stringify({ email: "developer@agency.com" })
      });
      const data = await res.json();
      if (data.apiKey) {
        setApiKey(data.apiKey);
        localStorage.setItem('octothorp_api_key', data.apiKey);
      }
    } catch (error) {
      console.error("Failed to generate key");
    }
    setGenerating(false);
  };

  const testConnection = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://d8v01rrw7d.execute-api.af-south-1.amazonaws.com/Prod/invoice/clear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ order_id: "DYNAMO-TEST-001" })
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
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Your API Keys</h2>
            <button 
              onClick={generateNewKey}
              disabled={generating}
              className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 text-sm font-semibold rounded transition-colors disabled:opacity-50"
            >
              {generating ? "Generating..." : "Generate New Key"}
            </button>
          </div>
          
          {apiKey ? (
            <code className="bg-black p-3 rounded block text-green-400 border border-slate-800 break-all">
              {apiKey}
            </code>
          ) : (
            <p className="text-slate-400 text-sm">No active keys found. Generate one to get started.</p>
          )}
        </div>

        <div className="bg-[#1E293B] p-6 rounded-lg border border-slate-700">
          <h2 className="text-xl font-semibold mb-4">Test Integration</h2>
          <button 
            onClick={testConnection}
            disabled={loading || !apiKey}
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