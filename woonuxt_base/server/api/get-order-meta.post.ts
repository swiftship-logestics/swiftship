import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { orderNumber } = body;

  if (!orderNumber) return { orderMeta: null, error: 'Order number is required' };

  const wcUrl = process.env.WC_API_URL;
  const consumerKey = process.env.CONSUMER_KEY;
  const consumerSecret = process.env.CONSUMER_SECRET;
  const authHeader = `Basic ${Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')}`;

  try {
    const orders: any[] = await $fetch(`${wcUrl}/orders?search=${orderNumber}`, {
      headers: { Authorization: authHeader },
    });

    if (!orders.length) return { orderMeta: null, error: 'Order not found' };

    const order = orders[0];


    const metaObj: Record<string, any> = {};
    order.meta_data.forEach((meta: any) => {
      metaObj[meta.key] = meta.value;
    });
    return {
      orderMeta: {
        deliveryJobId: metaObj['tookan_job_id'] || null,
        pickupJobId: metaObj['tookan_pickup_job_id'] || null,
        deliveryTrackingLink: metaObj['tookan_delivery_tracing_link'] || null,
        pickupTrackingLink: metaObj['tookan_pickup_tracking_link'] || null,
      },
    };
  } catch (err: any) {
    return { orderMeta: null, error: err.message };
  }
});
