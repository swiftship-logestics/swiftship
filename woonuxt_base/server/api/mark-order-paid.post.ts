import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  
  const { orderId, transactionId } = body;
  

  if (!orderId || !transactionId) {
    return { error: 'Missing orderId or transactionId' };
  }

  const wcUrl = "https://development.brstdev.com/swiftship/wp-json/wc/v3"
; 
  const consumerKey = process.env.CONSUMER_KEY;
  const consumerSecret = process.env.CONSUMER_SECRET;

  try {
    const authHeader = `Basic ${Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')}`;

    const response = await $fetch(`${wcUrl}/orders/${orderId}`, {
      method: 'PUT',
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/json',
      },
      body: {
        status: 'processing',
        meta_data: [
          { key: 'transaction_id', value: transactionId }
        ]
      }
    });

    return { success: true, data: response };
  } catch (err: any) {
    return { error: err.message };
  }
});
