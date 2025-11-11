<script setup lang="ts">
import { OrderStatusEnum } from '#woo';
const { query, params, name } = useRoute();
const { customer } = useAuth();
const { formatDate, formatPrice } = useHelpers();
const { t } = useI18n();

const order = ref<Order | null>(null);
const orderMeta = ref<any>(null); // store meta info
const iframeSrc = ref<string | null>(null);
const fetchDelay = ref<boolean>(query.fetch_delay === 'true');
const delayLength = 2500;
const isLoaded = ref<boolean>(false);
const errorMessage = ref('');
const trackingType = ref<'delivery' | 'pickup' | null>(null);
const trackingId = ref<string | null>(null);
const iframeLoading = ref<boolean>(false);
const isGuest = computed(() => !customer.value?.email);
const isSummaryPage = computed<boolean>(() => name === 'order-summary');
const isCheckoutPage = computed<boolean>(() => name === 'order-received');
const orderIsNotCompleted = computed<boolean>(() => order.value?.status !== OrderStatusEnum.COMPLETED);
const hasDiscount = computed<boolean>(() => !!parseFloat(order.value?.rawDiscountTotal || '0'));
const downloadableItems = computed(() => order.value?.downloadableItems?.nodes || []);

onBeforeMount(() => {
  /**
   * This is to close the child PayPal window we open on the checkout page.
   * It will fire off an event that redirects the parent window to the order summary page.
   */
  if (isCheckoutPage.value && (query.cancel_order || query.from_paypal || query.PayerID)) window.close();
});

onMounted(async () => {
  if (!customer.value?.email) {
    window.location.href = '/';
    return;
  }

  await getOrder();
  /**
   * WooCommerce sometimes takes a while to update the order status.
   * This is a workaround to fetch the order again after a delay.
   * The length of the delay might need to be adjusted depending on your server.
   */


  if (isCheckoutPage.value && fetchDelay.value && orderIsNotCompleted.value) {
    setTimeout(() => {
      getOrder();
    }, delayLength);
  }
});

async function getOrder() {
  try {
    const data = await GqlGetOrder({ id: params.orderId as string });
    if (data.order) {
      order.value = data.order;
      await fetchOrderMeta(order.value.orderNumber);
    } else {
      errorMessage.value = 'Could not find order';
    }
  } catch (err: any) {
    errorMessage.value = err?.gqlErrors?.[0].message || 'Could not find order';
  }
  isLoaded.value = true;
}

// Fetch WooCommerce order meta
async function fetchOrderMeta(orderNumber: string) {
  if (!orderNumber) return;

  try {
    const res = await $fetch('/api/get-order-meta', {
      method: 'POST',
      body: { orderNumber },
    });

    orderMeta.value = res.orderMeta || null;
  } catch (err) {
    console.error('Failed to fetch order meta:', err);
  }
}

// Load tracking link into iframe
const loadTracking = (type: 'delivery' | 'pickup', id: string) => {
  if (!id) return;
  trackingType.value = type;
  trackingId.value = id;
  iframeSrc.value = `https://app.tookanapp.com/tracking/index.html?jobID=${id}`;
  iframeLoading.value = true;

  setTimeout(() => {
    iframeLoading.value = false;
  }, 2000);
};


const refreshOrder = async () => {
  isLoaded.value = false;
  await getOrder();
};

useSeoMeta({
  title() {
    return isSummaryPage.value ? t('messages.shop.orderSummary') : t('messages.shop.orderReceived');
  },
});
</script>

<template>
  <div
    class="w-full min-h-[600px] flex items-center p-4 text-gray-800 md:bg-white md:rounded-xl md:mx-auto md:shadow-lg md:my-24 md:mt-8 md:max-w-5xl md:p-16 flex-col">
    <div v-if="!isLoaded" class="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div class="flex flex-col items-center">
        <div class="w-12 h-12 border-4 border-[#248BC6] border-t-transparent rounded-full animate-spin"></div>
        <p class="text-[#248BC6] font-semibold mt-4 text-lg">Loading...</p>
      </div>
    </div>
    <template v-else>
      <div v-if="order" class="w-full">
        <template v-if="isSummaryPage">
          <div class="flex items-center gap-4">
            <NuxtLink to="/my-account?tab=orders" class="inline-flex items-center justify-center p-2 border rounded-md"
              title="Back to orders" aria-label="Back to orders">
              <Icon name="ion:chevron-back-outline" />
            </NuxtLink>
            <h1 class="text-xl font-semibold">{{ $t('messages.shop.orderSummary') }}</h1>
          </div>
        </template>
        <template v-else-if="isCheckoutPage">
          <div class="flex items-center justify-between w-full mb-2">
            <h1 class="text-xl font-semibold">{{ $t('messages.shop.orderReceived') }}</h1>
            <button v-if="orderIsNotCompleted" type="button"
              class="inline-flex items-center justify-center p-2 bg-white border rounded-md" title="Refresh order"
              aria-label="Refresh order" @click="refreshOrder">
              <Icon name="ion:refresh-outline" />
            </button>
          </div>
          <p>{{ $t('messages.shop.orderThanks') }}</p>
        </template>
        <hr class="my-8" />
      </div>
      <div v-if="order && !isGuest" class="flex-1 w-full">
        <div class="flex items-start justify-between">
          <div class="w-[21%]">
            <div class="mb-2 text-xs text-gray-400 uppercase">{{ $t('messages.shop.order') }}</div>
            <div class="leading-none">#{{ order.databaseId! }}</div>
          </div>
          <div class="w-[21%]">
            <div class="mb-2 text-xs text-gray-400 uppercase">{{ $t('messages.general.date') }}</div>
            <div class="leading-none">{{ formatDate(order.date) }}</div>
          </div>
          <div class="w-[21%]">
            <div class="mb-2 text-xs text-gray-400 uppercase">{{ $t('messages.general.status') }}</div>
            <OrderStatusLabel v-if="order.status" :order="order" />
          </div>
          <div class="w-[21%]">
            <div class="mb-2 text-xs text-gray-400 uppercase">{{ $t('messages.general.paymentMethod') }}</div>
            <div class="leading-none">{{ order.paymentMethodTitle }}</div>
          </div>
        </div>

        <template v-if="order.lineItems">
          <hr class="my-8" />

          <div class="grid gap-2">
            <div v-for="item in order.lineItems.nodes" :key="item.id" class="flex items-center justify-between gap-8">
              <!-- <NuxtLink v-if="item.product?.node" :to="`/product/${item.product.node.slug}`">
                <NuxtImg
                  class="w-16 h-16 rounded-xl"
                  :src="item.variation?.node?.image?.sourceUrl || item.product.node?.image?.sourceUrl || '/images/placeholder.png'"
                  :alt="item.variation?.node?.image?.altText || item.product.node?.image?.altText || 'Product image'"
                  :title="item.variation?.node?.image?.title || item.product.node?.image?.title || 'Product image'"
                  width="64"
                  height="64"
                  loading="lazy" />
              </NuxtLink> -->
              <div class="flex-1 leading-tight">
                {{ item.variation ? item.variation?.node?.name : item.product?.node.name! }}
              </div>
              <div class="text-sm text-gray-600">Qty. {{ item.quantity }}</div>
              <span class="text-sm font-semibold">{{ formatPrice(item.total!) }}</span>
            </div>
          </div>
        </template>

        <hr class="my-8" />

        <div v-if="downloadableItems.length && !orderIsNotCompleted">
          <DownloadableItems :downloadableItems="downloadableItems" />
          <hr class="my-8" />
        </div>

        <div>
          <div class="flex justify-between">
            <span>{{ $t('messages.shop.subtotal') }}</span>
            <span v-html="order.subtotal"></span>
          </div>
          <div class="flex justify-between">
            <span>{{ $t('messages.general.tax') }}</span>
            <span v-html="order.totalTax"></span>
          </div>
          <div class="flex justify-between">
            <span>{{ $t('messages.general.shipping') }}</span>
            <span v-html="order.shippingTotal"></span>
          </div>
          <div v-if="hasDiscount" class="flex justify-between text-primary">
            <span>{{ $t('messages.shop.discount') }}</span>
            <span>- <span v-html="order.discountTotal"></span></span>
          </div>
          <hr class="my-8" />
          <div class="flex justify-between">
            <span class>{{ $t('messages.shop.total') }}</span>
            <span class="font-semibold" v-html="order.total"></span>
          </div>
        </div>

        <!-- Show tracking link if available -->
        <div v-if="orderMeta && (orderMeta.deliveryJobId || orderMeta.pickupJobId)"
          class="mt-8 border-t pt-4 text-sm text-gray-700">

          <h3 class="text-2xl font-bold text-center  mb-2">
            Tracking Deatils
          </h3>
          <!-- Delivery -->
          <div class="w-full flex flex-col md:flex-row md:justify-between md:items-center gap-2">
            <div class="flex flex-col md:flex-row md:gap-4">
              <span class="font-medium text-l">Delivery Job ID:</span>
              <span class="text-m font-semibold ml-1">{{ orderMeta.deliveryJobId || '-' }}</span>
              <span class="font-medium text-l">Delivery Tracking ID:</span>
              <span class="text-m font-semibold ml-1">{{ orderMeta.deliveryTrackingLink || '-' }}</span>
            </div>
            <button v-if="orderMeta.deliveryTrackingLink"
              class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-m"
              @click="loadTracking('delivery', orderMeta.deliveryTrackingLink)">
              Track Delivery
            </button>
          </div>

          <!-- Pickup -->
          <div class="w-full flex flex-col md:flex-row md:justify-between md:items-center mt-4 gap-2">
            <div class="flex flex-col md:flex-row md:gap-4">
              <span class="font-medium text-l">Pickup Job ID:</span>
              <span class="text-m font-semibold ml-1"> {{ orderMeta.pickupJobId || '-' }}</span>
              <span class="font-medium text-l">Pickup Tracking ID:</span>
              <span class="text-m font-semibold ml-1">{{ orderMeta.pickupTrackingLink || '-' }}</span>
            </div>
            <button v-if="orderMeta.pickupTrackingLink"
              class="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-m"
              @click="loadTracking('pickup', orderMeta.pickupTrackingLink)">
              Track Pickup
            </button>
          </div>


          <!-- Buttons properly below IDs -->
          <!-- <div class="flex gap-2 mb-4">
    <button
      v-if="orderMeta.deliveryTrackingLink"
      class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
      @click="loadTracking('delivery', orderMeta.deliveryTrackingLink)"
    >
      Track Delivery
    </button>

    <button
      v-if="orderMeta.pickupTrackingLink"
      class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
      @click="loadTracking('pickup', orderMeta.pickupTrackingLink)"
    >
      Track Pickup
    </button>
  </div> -->

          <!-- Iframe for tracking -->
          <div v-if="iframeSrc || iframeLoading" class="mt-4">
            <h3 class="text-2xl font-bold text-center mb-4">
              {{ trackingType === 'delivery' ? 'Delivery Tracking' : 'Pickup Tracking' }}
            </h3>

            <div v-if="iframeLoading" class="flex items-center justify-center h-[400px] border rounded">
              <div class="flex flex-col items-center">
                <div class="w-12 h-12 border-4 border-[#248BC6] border-t-transparent rounded-full animate-spin"></div>
                <p class="text-[#248BC6] font-semibold mt-4 text-lg">Loading...</p>
              </div>
            </div>

            <iframe v-show="!iframeLoading" :src="iframeSrc" class="w-full h-[400px] border rounded"
              frameborder="0"></iframe>
          </div>

        </div>





      </div>
      <div v-else-if="errorMessage" class="flex flex-col items-center justify-center flex-1 w-full gap-4 text-center">
        <Icon name="ion:sad-outline" size="96" class="text-gray-700" />
        <h1 class="text-xl font-semibold">Error</h1>
        <div v-if="errorMessage" class="text-sm text-red-500" v-html="errorMessage" />
      </div>
    </template>
    <div v-if="order" class="w-full mt-8 flex justify-end">
      <button @click="$router.push('/my-account?tab=orders')"
        class="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
        Go Back
        <Icon name="ion:chevron-forward-outline" class="w-5 h-5" />
      </button>
    </div>
  </div>


</template>
