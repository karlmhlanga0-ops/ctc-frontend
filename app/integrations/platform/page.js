import React from 'react';

// This generates static pages for these exact platforms
export function generateStaticParams() {
  return [
    { platform: 'woocommerce' },
    { platform: 'shopify' },
    { platform: 'magento' },
    { platform: 'stripe' },
    { platform: 'nextjs' }
  ];
}

export async function generateMetadata({ params }) {
  const platformName = params.platform.charAt(0).toUpperCase() + params.platform.slice(1);
  return {
    title: `${platformName} Peppol E-Invoicing API Integration`,
    description: `Automate UBL 2.1 e-invoicing and tax compliance directly from your ${platformName} backend with our serverless API.`,
  };
}

export default function PlatformIntegrationPage({ params }) {
  const platformName = params.platform.charAt(0).toUpperCase() + params.platform.slice(1);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-20">
      <div className="max-w-3xl px-6">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Automate Peppol E-Invoicing for {platformName}
        </h1>
        <p className="text-xl text-gray-600 mb-10">
          Don't build complex XML routing from scratch. Send standard JSON from your {platformName} server, and our API handles the UBL 2.1 mapping, Peppol network routing, and asynchronous webhooks.
        </p>

        <div className="bg-gray-900 rounded-lg p-6 mb-8 shadow-xl">
          <div className="text-xs text-gray-400 mb-2 uppercase tracking-wide">POST /invoice/clear</div>
          <pre className="text-green-400 font-mono text-sm overflow-x-auto">
            {`curl -X POST "https://api.octothorp.online/invoice/clear" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "platform": "${platformName}",
    "order_id": "INV-1234",
    "buyer_country": "BE",
    "total_amount": 99.00
  }'`}
          </pre>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-md transition-colors w-full sm:w-auto">
          Generate Sandbox API Key
        </button>
      </div>
    </div>
  );
}