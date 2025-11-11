// server/api/login.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username, password } = body;

  if (!username || !password) {
    throw createError({ statusCode: 400, message: 'Missing username or password' });
  }

  try {

    const wcBaseUrl = process.env.WC_API_URL;

    const response = await $fetch(`${wcBaseUrl}/jwt-auth/v1/token`, {
      method: 'POST',
      body: {
        username,
        password
      }
    });

    // You can store token in cookie or return it to frontend
    return response;
  } catch (err: any) {
    console.error('Login error:', err);
    throw createError({ statusCode: 500, message: err?.message || 'Failed to login' });
  }
});
