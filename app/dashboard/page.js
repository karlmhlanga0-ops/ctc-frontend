'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function WooCommerceIntegration() {
  const [apiKey, setApiKey] = useState("YOUR_API_KEY");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  // Pull the generated key from the dashboard if it exists
  useEffect(() => {
    const savedKey = localStorage.getItem('octothorp_api_key');
    if (savedKey) setApiKey(savedKey);
  }, []);

  const testConnection = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://d8v01rrw7d.execute-api.af-south-1.amazonaws.com/Prod/invoice/clear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ platform: "woocommerce", order_id: "INV-1234" })
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      setResponse({ error: "Network error connecting to AWS." });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 p-10 font-sans">
      <div className="max-w-4xl mx-auto mt-20 space-y-8">
        <h1 className="text-4xl font-bold tracking-tight">Automate Peppol E-Invoicing for WooCommerce</h1>
        <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
          Don't build complex XML routing from scratch. Send standard JSON from your WooCommerce server, and our API handles the UBL 2.1 mapping and Peppol network routing.
        </p>

        <div className="bg-[#0F172A] p-6 rounded-xl shadow-xl text-sm font-mono text-slate-300">
          <div className="text-slate-500 mb-4 text-xs tracking-wider">POST /INVOICE/CLEAR</div>
          <pre className="overflow-x-auto">
            <span className="text-green-400">curl</span> -X POST "https://api.octothorp.online/invoice/clear" \<br/>
            {"  "}-H "Authorization: Bearer <span className={apiKey !== "YOUR_API_KEY" ? "text-green-400" : "text-yellow-400"}>{apiKey}</span>" \<br/>
            {"  "}-H "Content-Type: application/json" \<br/>
            {"  "}-d '{"{"}<br/>
            {"    "}"platform": "woocommerce",<br/>
            {"    "}"order_id": "INV-1234"<br/>
            {"  "}{"}'"}
          </pre>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <button 
            onClick={testConnection}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? "Testing..." : "Test AWS Lambda Connection"}
          </button>
          
          {apiKey === "YOUR_API_KEY" && (
            <Link href="/dashboard" className="text-sm text-blue-600 hover:underline">
              Generate an API key in the dashboard first &rarr;
            </Link>
          )}
        </div>

        {response && (
          <div className={`p-4 rounded-lg font-mono text-sm overflow-x-auto ${response.error || response.status === 'error' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
            <pre>{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}