import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { orderId } = body;

  if (!orderId) return { error: 'Missing orderId' };

  const wcUrl = process.env.WC_API_URL;
  const consumerKey = process.env.CONSUMER_KEY;
  const consumerSecret = process.env.CONSUMER_SECRET;
  const authHeader = `Basic ${Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')}`;

  try {
    const response = await $fetch(`${wcUrl}/orders/${orderId}`, {
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/json',
      },
    });

    return { success: true, data: response };
  } catch (err: any) {
    return { error: err.message };
  }
});
