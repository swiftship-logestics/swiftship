<script setup lang="ts">
import { loadStripe } from '@stripe/stripe-js';
import type { Stripe, StripeElements, CreateSourceData, StripeCardElement } from '@stripe/stripe-js';
// import { GqlGetStripePaymentIntent } from '../composables/useStripe';
import { getStripeClientSecret } from '../composables/useStripe';

const { t } = useI18n();
const { query } = useRoute();
const { cart, isUpdatingCart, paymentGateways } = useCart();
const { customer, viewer } = useAuth();
const { orderInput, isProcessingOrder, processCheckout } = useCheckout();
const runtimeConfig = useRuntimeConfig();
const stripeKey = runtimeConfig.public?.STRIPE_PUBLISHABLE_KEY || null;

const buttonText = ref<string>(isProcessingOrder.value ? t('messages.general.processing') : t('messages.shop.checkoutButton'));
const isCheckoutDisabled = computed<boolean>(() => isProcessingOrder.value || isUpdatingCart.value || !orderInput.value.paymentMethod || !stripe.value);

const isInvalidEmail = ref<boolean>(false);
const stripe1: Stripe | null = stripeKey ? await loadStripe(stripeKey) : null;

const stripe = ref<Stripe | null>(null);


onMounted(async () => {
  if (stripeKey) {
    stripe.value = await loadStripe(stripeKey);
  }
});


const elements = ref();
const isPaid = ref<boolean>(false);

onBeforeMount(async () => {
  if (query.cancel_order) window.close();
});

const payNow = async () => {
  buttonText.value = t('messages.general.processing');

  try {

    const orderResult = await processCheckout(false);

    if (!orderResult?.databaseId) throw new Error("Order not created");

    interface StripeIntentResponse {
      clientSecret: string;
    }

    const rawPrice = orderResult.total ?? 0; // e.g., "₹19.00" or 19.00
    const numericPrice = Number(String(rawPrice).replace(/[^\d.-]/g, '')); // removes ₹, $ etc.
    const amount = Math.round(numericPrice * 100);

    const response = await $fetch<StripeIntentResponse>('/api/create-stripe-intent', {
      method: 'POST',
      body: {
        orderId: orderResult.databaseId,
        amount
      }
    });


    const clientSecret = response.clientSecret;

    // 3. Confirm payment with Stripe.js
    if (stripe.value && elements.value) {
      const cardElement = elements.value.getElement('card') as StripeCardElement;


      const { error, paymentIntent } = await stripe.value.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement }
      });

      if (error) {
        console.error("Stripe payment error:", error);
        buttonText.value = t('messages.shop.placeOrder');
        return;
      }

      if (paymentIntent?.status === 'succeeded') {
        orderInput.value.transactionId = paymentIntent.id;
        // 4. Mark as paid in WooCommerce
        // await processCheckout(true);

        // STEP 4: Mark order as paid in WooCommerce via API
        await $fetch('/api/mark-order-paid', {
          method: 'POST',
          body: {
            orderId: orderResult.databaseId,
            transactionId: paymentIntent?.id
          }
        });


        // 5. Redirect to order received page
        window.location.href = `/checkout/order-received/${orderResult.databaseId}/?key=${orderResult.orderKey}`;
      }
    }
  } catch (err) {
    console.error("Checkout failed:", err);
    buttonText.value = t('messages.shop.placeOrder');
  }
};



// const payNow = async () => {
//   buttonText.value = t('messages.general.processing');

//   try {
//     // STEP 1: Create the WooCommerce order (unpaid)
//     const orderResult = await processCheckout(false); 
//     console.log("orderResult:::::::::::", orderResult);

//     if (!orderResult?.databaseId) throw new Error("Order not created");

//     // STEP 2: Get Stripe client secret from backend
//     const rawPrice = orderResult.total ?? 0;
//     const numericPrice = Number(String(rawPrice).replace(/[^\d.-]/g, ''));
//     const amount = Math.round(numericPrice * 100);

//     const response = await $fetch<{ clientSecret: string }>('/api/create-stripe-intent', {
//       method: 'POST',
//       body: {
//         orderId: orderResult.databaseId,
//         amount
//       }
//     });

//     const clientSecret = response.clientSecret;
//     if (!clientSecret) throw new Error("Stripe client secret not found");

//     // STEP 3: Confirm card payment with Stripe
//     if (stripe.value && elements.value) {
//       const cardElement = elements.value.getElement('card') as StripeCardElement;

//       const { error, paymentIntent } = await stripe.value.confirmCardPayment(clientSecret, {
//         payment_method: { card: cardElement },
//       });

//       if (error) {
//         console.error("Stripe payment error:", error);
//         buttonText.value = t('messages.shop.placeOrder');
//         return;
//       }

//       if (paymentIntent?.status === 'succeeded') {
//         // STEP 4: Mark order as paid
//         await processCheckout(true);

//         // STEP 5: Redirect to order confirmation
//         window.location.href = `/checkout/order-received/${orderResult.databaseId}/?key=${orderResult.orderKey}`;
//       }
//     }
//   } catch (err) {
//     console.error("Checkout failed:", err);
//     buttonText.value = t('messages.shop.placeOrder');
//   }
// };



const handleStripeElement = (stripeElements: StripeElements): void => {
  elements.value = stripeElements;
};

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const checkEmailOnBlur = (email?: string | null): void => {
  if (email) isInvalidEmail.value = !emailRegex.test(email);
};

const checkEmailOnInput = (email?: string | null): void => {
  if (email && isInvalidEmail.value) isInvalidEmail.value = !emailRegex.test(email);
};

useSeoMeta({
  title: t('messages.shop.checkout'),
});
</script>

<template>
  <div class="flex flex-col min-h-[600px]">
    <template v-if="cart && customer">
      <div v-if="cart.isEmpty" class="flex flex-col items-center justify-center flex-1 mb-12 ">
        <Icon name="ion:cart-outline" size="156" class="opacity-25 mb-5" />
        <h2 class="text-2xl font-bold mb-2">{{ $t('messages.shop.cartEmpty') }}</h2>
        <span class="text-gray-400 mb-4">{{ $t('messages.shop.addProductsInYourCart') }}</span>
        <NuxtLink to="/products"
          class="flex items-center justify-center gap-3 p-2 px-3 mt-4 font-semibold text-center text-white rounded-lg shadow-md bg-primary hover:bg-primary-dark">
          {{ $t('messages.shop.browseOurProducts') }}
        </NuxtLink>
      </div>

      <form v-else class="container flex flex-wrap items-start gap-8 my-16 justify-evenly lg:gap-20"
        @submit.prevent="payNow">
        <div class="grid w-full max-w-2xl gap-8 checkout-form md:flex-1">
          <!-- Customer details -->
          <div v-if="!viewer && customer.billing">
            <h2 class="w-full mb-2 text-2xl font-semibold leading-none">Contact Information</h2>
            <!-- <p class="mt-1 text-sm text-gray-500">Already have an account? <a href="/my-account"
                class="text-primary text-semibold">Log in</a>.</p> -->
            <div class="w-full mt-4">
              <label for="email">{{ $t('messages.billing.email') }}</label>
              <input v-model="customer.billing.email" placeholder="johndoe@email.com" autocomplete="email" type="email"
                name="email" :class="{ 'has-error': isInvalidEmail }" @blur="checkEmailOnBlur(customer.billing.email)"
                @input="checkEmailOnInput(customer.billing.email)" required />
              <Transition name="scale-y" mode="out-in">
                <div v-if="isInvalidEmail" class="mt-1 text-sm text-red-500">Invalid email address</div>
              </Transition>
            </div>
            <template v-if="orderInput.createAccount">
              <div class="w-full mt-4">
                <label for="username">{{ $t('messages.account.username') }}</label>
                <input v-model="orderInput.username" placeholder="johndoe" autocomplete="username" type="text"
                  name="username" required />
              </div>
              <div class="w-full my-2" v-if="orderInput.createAccount">
                <label for="email">{{ $t('messages.account.password') }}</label>
                <PasswordInput id="password" class="my-2" v-model="orderInput.password" placeholder="••••••••••"
                  :required="true" />
              </div>
            </template>
            <div v-if="!viewer" class="flex items-center gap-2 my-2">
              <label for="creat-account">Create an account?</label>
              <input id="creat-account" v-model="orderInput.createAccount" type="checkbox" name="creat-account" />
            </div>
          </div>

          <div>
            <h2 class="w-full mb-3 text-2xl font-semibold">{{ $t('messages.billing.billingDetails') }}</h2>
            <BillingDetails v-model="customer.billing" />
          </div>

          <label v-if="cart.availableShippingMethods && cart.availableShippingMethods.length > 0"
            for="shipToDifferentAddress" class="flex items-center gap-2">
            <span>{{ $t('messages.billing.differentAddress') }}</span>
            <input id="shipToDifferentAddress" v-model="orderInput.shipToDifferentAddress" type="checkbox"
              name="shipToDifferentAddress" />
          </label>

          <Transition name="scale-y" mode="out-in">
            <div v-if="orderInput.shipToDifferentAddress">
              <h2 class="mb-4 text-xl font-semibold">{{ $t('messages.general.shippingDetails') }}</h2>
              <ShippingDetails v-model="customer.shipping" />
            </div>
          </Transition>

          <!-- Shipping methods -->
          <div v-if="cart.availableShippingMethods && cart.availableShippingMethods.length">
            <h3 class="mb-4 text-xl font-semibold">{{ $t('messages.general.shippingSelect') }}</h3>
            <ShippingOptions :options="cart.availableShippingMethods?.[0]?.rates"
              :active-option="cart.chosenShippingMethods?.[0]" />
          </div>

          <!-- Pay methods -->
          <div v-if="paymentGateways?.nodes.length" class="mt-2 col-span-full">
            <h2 class="mb-4 text-xl font-semibold">{{ $t('messages.billing.paymentOptions') }}</h2>
            <PaymentOptions v-model="orderInput.paymentMethod" class="mb-4" :paymentGateways />
            <StripeElement v-if="stripe" v-show="orderInput.paymentMethod.id == 'stripe'" :stripe
              @updateElement="handleStripeElement" />
          </div>

          <!-- Order note -->
          <div>
            <h2 class="mb-4 text-xl font-semibold">{{ $t('messages.shop.orderNote') }} ({{
              $t('messages.general.optional') }})
            </h2>
            <textarea id="order-note" v-model="orderInput.customerNote" name="order-note" class="w-full min-h-[100px]"
              rows="4" :placeholder="$t('messages.shop.orderNotePlaceholder')"></textarea>
          </div>
        </div>

        <OrderSummary>
          <!-- <button
            class="flex items-center justify-center w-full gap-3 p-3 mt-4 font-semibold text-center text-white rounded-lg shadow-md bg-primary hover:bg-primary-dark disabled:cursor-not-allowed disabled:bg-gray-400"
            :disabled="isCheckoutDisabled"> -->
              <button
            class="flex items-center justify-center w-full gap-3 p-3 mt-4 font-semibold text-center text-white rounded-lg shadow-md bg-primary hover:bg-primary-dark disabled:cursor-not-allowed disabled:bg-gray-400"
            disabled>
            {{ buttonText }}
            <LoadingIcon v-if="isProcessingOrder" color="#fff" size="18" />
          </button>
        </OrderSummary>
      </form>
    </template>
    <LoadingIcon v-else class="m-auto" />
  </div>
</template>

<style lang="postcss">
.checkout-form input[type='text'],
.checkout-form input[type='email'],
.checkout-form input[type='tel'],
.checkout-form input[type='password'],
.checkout-form textarea,
.checkout-form select,
.checkout-form .StripeElement {
  @apply bg-white border rounded-md outline-none border-gray-300 shadow-sm w-full py-2 px-4;
}

.checkout-form input.has-error,
.checkout-form textarea.has-error {
  @apply border-red-500;
}

.checkout-form label {
  @apply my-1.5 text-xs text-gray-600 uppercase;
}

.checkout-form .StripeElement {
  padding: 1rem 0.75rem;
}
</style>
