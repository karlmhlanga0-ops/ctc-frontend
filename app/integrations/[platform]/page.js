import React from 'react';
import AwsTestButton from './AwsTestButton';

export function generateStaticParams() {
  return [
    { platform: 'woocommerce' },
    { platform: 'shopify' },
    { platform: 'magento' },
    { platform: 'stripe' },
    { platform: 'nextjs' }
  ];
}

// Added async and await for Next.js 15 compatibility
export async function generateMetadata({ params }) {
  const { platform } = await params;
  const platformName = platform.charAt(0).toUpperCase() + platform.slice(1);
  return {
    title: `${platformName} Peppol E-Invoicing API Integration`,
    description: `Automate UBL 2.1 e-invoicing and tax compliance directly from your ${platformName} backend with our serverless API.`,
  };
}

// Added async and await for Next.js 15 compatibility
export default async function PlatformIntegrationPage({ params }) {
  const { platform } = await params;
  const platformName = platform.charAt(0).toUpperCase() + platform.slice(1);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-20">
      <div className="max-w-3xl px-6 w-full">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Automate Peppol E-Invoicing for {platformName}
        </h1>
        <p className="text-xl text-gray-600 mb-10">
          Don't build complex XML routing from scratch. Send standard JSON from your {platformName} server, and our API handles the UBL 2.1 mapping and Peppol network routing.
        </p>

        <div className="bg-gray-900 rounded-lg p-6 mb-8 shadow-xl">
          <div className="text-xs text-gray-400 mb-2 uppercase tracking-wide">POST /invoice/clear</div>
          <pre className="text-green-400 font-mono text-sm overflow-x-auto">
            {`curl -X POST "https://api.octothorp.online/invoice/clear" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "platform": "${platform}",
    "order_id": "INV-1234"
  }'`}
          </pre>
        </div>

        <AwsTestButton platform={platform} />
        
      </div>
    </div>
  );
}