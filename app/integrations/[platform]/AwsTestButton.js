"use client";
import React, { useState } from 'react';

export default function AwsTestButton({ platform }) {
  const [responseMsg, setResponseMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const testAwsConnection = async () => {
    setIsLoading(true);
    setResponseMsg("");

    try {
      const res = await fetch("https://d8v01rrw7d.execute-api.af-south-1.amazonaws.com/Prod/invoice/clear", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          platform: platform,
          order_id: `TEST-${Math.floor(Math.random() * 10000)}` 
        })
      });

      const data = await res.json();
      setResponseMsg(data.message || "Connection successful.");
    } catch (error) {
      setResponseMsg("Network error connecting to AWS.");
    }
    
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center mt-4">
      <button 
        onClick={testAwsConnection}
        disabled={isLoading}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-md transition-colors w-full sm:w-auto disabled:opacity-50"
      >
        {isLoading ? "Pinging Cape Town..." : "Test AWS Lambda Connection"}
      </button>
      
      {responseMsg && (
        <span className="text-sm font-mono text-green-700 bg-green-100 px-3 py-2 rounded-md">
          {responseMsg}
        </span>
      )}
    </div>
  );
}