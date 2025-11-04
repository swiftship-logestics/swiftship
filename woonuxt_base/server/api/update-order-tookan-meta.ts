import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { orderId, tookanResponse } = body;

  if (!orderId || !tookanResponse?.data?.data) {
    return { error: 'Missing orderId or Tookan response data' };
  }

  const wcUrl = process.env.WC_API_URL;
  const consumerKey = process.env.CONSUMER_KEY;
  const consumerSecret = process.env.CONSUMER_SECRET;

  try {
    const authHeader = `Basic ${Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')}`;

    const fieldsToSave = [
      'customer_address', 'customer_name', 'deliveryAddressNotFound', 'deliveryOrderId',
      'delivery_job_hash', 'delivery_job_id', 'delivery_tracing_link', 'job_hash',
      'job_id', 'job_pickup_address', 'job_pickup_name', 'job_token',
      'order_id', 'pickupOrderId', 'pickup_job_hash', 'pickup_job_id', 'pickup_tracking_link'
    ];
console.log("my data:::::::::::::::::::::::::::::::::::::::",tookanResponse);

    const tookanData = tookanResponse.data.data.data; 

    const metaData = fieldsToSave
      .filter(key => tookanData[key] !== undefined) 
      .map(key => ({
        key: `tookan_${key}`,
        value: tookanData[key]
      }));

    console.log('Meta data to save::::::::', metaData);

    const response = await $fetch(`${wcUrl}/orders/${orderId}`, {
      method: 'PUT',
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/json',
      },
      body: {
        meta_data: metaData
      }
    });

    console.log('✅ WooCommerce order updated with filtered Tookan meta:', response);
    return { success: true, data: response };
  } catch (err: any) {
    console.error('❌ Failed to update WooCommerce order with Tookan meta:', err);
    return { error: err.message };
  }
});
