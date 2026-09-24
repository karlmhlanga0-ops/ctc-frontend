import Link from 'next/link';

export default function Home() {
  const platforms = ['woocommerce', 'shopify', 'magento', 'stripe', 'nextjs'];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
          Pan-African Peppol API
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          Zero-touch UBL 2.1 e-invoicing compliance. Select your backend infrastructure to view the integration docs.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {platforms.map((platform) => (
            <Link 
              key={platform} 
              href={`/integrations/${platform}`}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg hover:border-blue-500 transition-all text-lg font-semibold text-gray-800 capitalize"
            >
              {platform} Integration &rarr;
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}