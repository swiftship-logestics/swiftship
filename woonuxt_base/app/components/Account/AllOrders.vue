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
  <div class="bg-white rounded-lg flex shadow min-h-[250px] p-4 md:p-12 justify-center items-center">
    <LoadingIcon  v-if="isLoading" size="24" stroke="2" />
    <div v-else-if="orders.length > 0">
      <table class="w-full text-left table-auto" aria-label="Order List">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Delivery Job ID</th>
            <th>Pickup Job ID</th>
            <th>Delivery Tracking</th>
            <th>Pickup Tracking</th>
            <th >Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id" class="cursor-pointer hover:underline">
            <td class="rounded-l-lg">{{ order.id }}</td>
            <td>{{ order.meta_data?.tookan_job_id || '-' }}</td>
            <td>{{ order.meta_data?.tookan_pickup_job_id || '-' }}</td>
            <td>
              <a v-if="order.meta_data?.tookan_delivery_tracing_link"
                :href="order.meta_data.tookan_delivery_tracing_link" target="_blank" class="text-blue-600 underline">
                Track
              </a>
              <span v-else>-</span>
            </td>
            <td>
              <a v-if="order.meta_data?.tookan_pickup_tracking_link" :href="order.meta_data.tookan_pickup_tracking_link"
                target="_blank" class="text-blue-600 underline">
                Track
              </a>
              <span v-else>-</span>
            </td>
            <td class="rounded-r-lg">{{ formatDate(order.date_created) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
     <div v-else
        class="min-h-[250px] flex items-center justify-center text-gray-500 text-lg">
        No Tickets found.
      </div>
  </div>
</template>

<style lang="postcss" scoped>
tbody tr:nth-child(odd) {
  background-color: #fafafa;
}

tbody tr {
  @apply text-sm text-gray-500 hover:text-gray-800;
}

td,
th {
  @apply py-2 px-3;
}
</style>