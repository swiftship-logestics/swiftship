// server/api/send-user-account-email.post.ts
export default defineEventHandler(async (event) => {

  const { username, email, password } = await readBody(event);

  if (!username || !email || !password) {
    return { success: false, message: 'Missing username, email, or password' };
  }

  try {
    await $fetch(`${process.env.VITE_BACKEND_API}/api/shipments/send-user-account-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.VITE_AUTH_TOKEN}`,
      },
      body: { username, email, password },
    });

    console.log("Account details sent successfully.");
    return { success: true };
  } catch (err) {
    console.error("Failed to send account details:", err);
    return { success: false, message: (err as any).message || 'Unknown error' };
  }
});
