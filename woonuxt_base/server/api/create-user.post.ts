// server/api/create-user.post.ts
import type { IncomingMessage } from 'http';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { username, password, email, billing, shipping } = body;

  if (!username || !password || !email) {
    throw createError({ statusCode: 400, message: 'Missing required fields' });
  }

  try {
    const wcBaseUrl = process.env.WC_API_URL; 
    const wcKey = process.env.CONSUMER_KEY;
    const wcSecret = process.env.CONSUMER_SECRET;

    const newUser = await $fetch(`${wcBaseUrl}/customers`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`${wcKey}:${wcSecret}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: {
        email,
        first_name: billing.firstName,
        last_name: billing.lastName,
        username,
        password,
        billing,
        shipping
      }
    });

    return newUser; 
  } catch (err: any) {
    console.error('Error creating user:', err);
    throw createError({ statusCode: 500, message: err?.message || 'Failed to create user' });
  }
});
