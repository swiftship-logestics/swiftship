// server/api/create-tookan-order.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const now = new Date();
    const deliveryDate = new Date();
    deliveryDate.setDate(now.getDate() + 2);

    const tookanPayload = {
      order_id: body.order_id,
      job_description: body.job_description || "No description provided",

      // Pickup
      job_pickup_name: body.job_pickup_name,
      job_pickup_email: body.job_pickup_email,
      job_pickup_phone: body.job_pickup_phone,
      job_pickup_address: body.job_pickup_address, // already includes postal code
      job_pickup_latitude: body.job_pickup_latitude ?? 0,
      job_pickup_longitude: body.job_pickup_longitude ?? 0,
      job_pickup_datetime: body.job_pickup_datetime || new Date().toISOString(),

      // Delivery
      customer_username: body.customer_username,
      customer_email: body.customer_email,
      customer_phone: body.customer_phone,
      customer_address: body.customer_address, // already includes postal code
      job_delivery_datetime: body.job_delivery_datetime || new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(),

      latitude: body.latitude ?? 0,
      longitude: body.longitude ?? 0,
      has_pickup: body.has_pickup ?? 1,
      has_delivery: body.has_delivery ?? 1,
      timezone: body.timezone,
      notify: body.notify ?? 1,
      auto_assignment: body.auto_assignment ?? 1
    };

    console.log("tookanPayload:::::::::::::::::::", tookanPayload);

    const response = await $fetch(`${process.env.VITE_BACKEND_API}/api/shipments/tookan`, {
      method: 'POST',
      body: tookanPayload,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.VITE_AUTH_TOKEN}`
      }
    });

    console.log('✅ Tookan API Response:', response);
    return { success: true, data: response };
  } catch (error: any) {
    console.error('❌ Tookan API Error:', error);
    return {
      success: false,
      message: error.message || 'Failed to create Tookan order'
    };
  }
});
