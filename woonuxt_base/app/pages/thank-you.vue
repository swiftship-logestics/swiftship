<script setup lang="ts">
const route = useRoute();
const orderId = route.query.orderId as string || null;
const { emptyCart, refreshCart } = useCart();
if (!orderId) {
  window.location.href = '/';
} else {
  onMounted(async () => {
    await emptyCart();
    await refreshCart();
  });
}

</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen gap-4 text-center p-4">
    <h1 class="text-4xl font-bold text-green-600">Thank You!</h1>
    <p class="text-lg">Your order is confirmed.</p>
    <p class="text-md">Order ID: <strong>{{ orderId }}</strong></p>
   <NuxtLink to="/" class="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">
  Go Back to Home
</NuxtLink>
  </div>
</template>
