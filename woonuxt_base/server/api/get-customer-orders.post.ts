import { defineEventHandler, readBody } from 'h3';

interface WooOrderMeta {
  key: string;
  value: any;
}

interface WooOrder {
  id: number;
  databaseId?: number;
  date: string;
  meta_data: WooOrderMeta[];
  [key: string]: any; // for other fields you may use
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email } = body;

  if (!email) return { orders: [] };

  const wcUrl = process.env.WC_API_URL;
  const consumerKey = process.env.CONSUMER_KEY;
  const consumerSecret = process.env.CONSUMER_SECRET;
  const authHeader = `Basic ${Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')}`;

  try {
    // 1️⃣ Fetch customer ID from email
    const customers: any[] = await $fetch(`${wcUrl}/customers?email=${email}`, {
      headers: { Authorization: authHeader },
    });

    if (!customers.length) return { orders: [], error: 'Customer not found' };
    const customerId = customers[0].id;

    // 2️⃣ Fetch orders using customer ID
    const orders = await $fetch(`${wcUrl}/orders?customer=${customerId}&per_page=100`, {
      headers: { Authorization: authHeader },
    });

    const formattedOrders = orders.map((order: any) => {
      const metaObj: Record<string, any> = {};
      order.meta_data.forEach((meta: any) => {
        metaObj[meta.key] = meta.value;
      });
      return { ...order, meta_data: metaObj };
    });

    return { orders: formattedOrders };
  } catch (err: any) {
    return { orders: [], error: err.message };
  }
});
