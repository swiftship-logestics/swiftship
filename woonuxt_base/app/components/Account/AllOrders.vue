<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuth } from '../../composables/useAuth';
const { formatDate } = useHelpers();

const orders = ref<any[]>([]);
const isLoading = ref(true);
const error = ref('');

const { viewer } = useAuth();

onMounted(async () => {
  if (!viewer.value) return;

  try {
    // Fetch all orders of the customer
    const data = await $fetch('/api/get-customer-orders', {
      method: 'POST',
      body: { email: viewer.value.email } // assuming orders are linked to customer email
    });
    orders.value = data.orders || [];
  } catch (err: any) {
    error.value = err.message || 'Failed to fetch orders';
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="w-full overflow-x-auto">
    <div v-if="isLoading" class="flex justify-center py-12">
      <LoadingIcon />
    </div>
    <div v-else-if="error" class="text-red-500 py-4">{{ error }}</div>
    <table v-else class="min-w-full border border-gray-200 rounded-lg overflow-hidden bg-white">
      <thead class="bg-gray-100 text-left">
        <tr>
          <th class="px-4 py-2">Order ID</th>
          <th class="px-4 py-2">Delivery Job ID</th>
          <th class="px-4 py-2">Pickup Job ID</th>
          <th class="px-4 py-2">Delivery Tracking</th>
          <th class="px-4 py-2">Pickup Tracking</th>
          <th class="px-4 py-2">Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id" class="border-t border-gray-200">
          <td class="px-4 py-2">{{ order.id }}</td>
          <td class="px-4 py-2">{{ order.meta_data?.tookan_job_id || '-' }}</td>
          <td class="px-4 py-2">{{ order.meta_data?.tookan_pickup_job_id || '-' }}</td>
          <td class="px-4 py-2">
            <a v-if="order.meta_data?.tookan_delivery_tracing_link" 
               :href="order.meta_data.tookan_delivery_tracing_link" 
               target="_blank" class="text-blue-600 underline">
               Track
            </a>
            <span v-else>-</span>
          </td>
          <td class="px-4 py-2">
            <a v-if="order.meta_data?.tookan_pickup_tracking_link" 
               :href="order.meta_data.tookan_pickup_tracking_link" 
               target="_blank" class="text-blue-600 underline">
               Track
            </a>
            <span v-else>-</span>
          </td>
          <td class="px-4 py-2">{{ formatDate(order.date_created) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
