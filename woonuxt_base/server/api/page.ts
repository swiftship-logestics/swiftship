

export default defineEventHandler(async () => {
  try {
    const res = await $fetch('https://development.brstdev.com/swiftship/wp-json/wp/v2/pages/3');
    return res;
  } catch (err) {
    return {
      error: true,
      message: err instanceof Error ? err.message : String(err)
    };
  }
});
