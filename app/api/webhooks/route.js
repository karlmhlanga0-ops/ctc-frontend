import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request) {
  const payload = await request.json();
  const signature = request.headers.get('x-octothorp-signature');

  // 1. Verify the signature (Security best practice)
  const expectedSignature = crypto
    .createHmac('sha256', process.env.OCTOTHORP_WEBHOOK_SECRET)
    .update(JSON.stringify(payload))
    .digest('hex');

  if (signature !== expectedSignature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  // 2. Handle the Event
  switch (payload.event_type) {
    case 'invoice.cleared':
      console.log(`Invoice ${payload.data.order_id} cleared with ID: ${payload.data.clearance_id}`);
      // TODO: Update your database status to 'Cleared'
      break;
    case 'invoice.rejected':
      console.error(`Invoice ${payload.data.order_id} rejected.`);
      // TODO: Alert the merchant to fix the invoice
      break;
    default:
      console.log(`Unhandled event type: ${payload.event_type}`);
  }

  // 3. Return a 200 OK so Octothorp knows you received it
  return NextResponse.json({ received: true }, { status: 200 });
}