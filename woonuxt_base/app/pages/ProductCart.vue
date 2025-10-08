<script setup lang="ts">
import { ref, computed } from 'vue';
import { useCart } from '#imports';

const product = ref({
  name: '111 test Product',
  description: '123 description',
  price: 29
});

const { cart, addToCart, emptyCart, isShowingCart, toggleCart, refreshCart } = useCart();

const adding = ref(false);
const success = ref(false);
const productId = ref<number | null>(null);

const totalItems = computed(() => {
  if (!cart.value?.contents?.nodes) return 0;
  return cart.value.contents.nodes.reduce(
    (sum, item) => sum + (item.quantity ?? 0),
    0
  );
});


const handleAddToCart = async () => {
  adding.value = true;
  success.value = false;

  try {
    const response = await $fetch('/api/create-product', {
      method: 'POST',
      body: {
        name: product.value.name,
        type: 'simple',
        regular_price: product.value.price.toString(),
        description: product.value.description,
        status: 'publish'
      }
    });

    const productId = (response as any).id;    
    if (!productId) throw new Error('Failed to create product');

     await emptyCart();
    const addcart = await addToCart({ productId, quantity: 1 });

    success.value = true;

    window.location.href = `/checkout`;

  } catch (err) {
    console.error('Error adding product or navigating to checkout:', err);
  } finally {
    adding.value = false;
  }
};


// const goToCheckout = async () => {
//   try {
//     await refreshCart();
//     const cartId = (cart.value as any)?.id;
//     if (!cartId) throw new Error('Cart ID not found');
//     window.location.href = `/checkout?cartId=${cartId}`;
//   } catch (err) {
//     console.error('Checkout failed:', err);
//   }
// };
</script>

<template>

  
  <div class="max-w-md mx-auto p-6 bg-white shadow rounded-lg m-[50px]">
    <h2 class="text-2xl font-bold mb-2">{{ product.name }}</h2>
    <p class="text-gray-600 mb-4">{{ product.description }}</p>
    <p class="font-semibold mb-4">$ {{ product.price }}</p>

    <button
      @click="handleAddToCart"
      :disabled="adding"
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
    >
      {{ adding ? 'Processing...' : 'Add to Cart' }}
    </button>

    <p v-if="success" class="mt-2 text-green-600 font-medium">
      Product added to cart!
    </p>

  </div>
</template>
