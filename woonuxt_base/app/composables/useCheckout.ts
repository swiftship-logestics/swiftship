import type { CheckoutInput, CreateAccountInput, UpdateCustomerInput } from '#gql';
import { toRaw } from 'vue';
export function useCheckout() {
  const orderInput = useState<any>('orderInput', () => {
    return {
      customerNote: '',
      paymentMethod: '',
      shipToDifferentAddress: false,
      metaData: [{ key: 'order_via', value: 'WooNuxt' }],
    };
  });

  const isProcessingOrder = useState<boolean>('isProcessingOrder', () => false);

  // if Country or State are changed, calculate the shipping rates again
  async function updateShippingLocation() {
    const { customer, viewer } = useAuth();
    const { isUpdatingCart, refreshCart } = useCart();

    isUpdatingCart.value = true;

    try {
      if (!viewer?.value?.id) {
        throw new Error('Viewer ID is missing.');
      }

      const { updateCustomer } = await GqlUpdateCustomer({
        input: {
          id: viewer.value.id,
          shipping: orderInput.value.shipToDifferentAddress ? customer.value.shipping : customer.value.billing,
          billing: customer.value.billing,
        } as UpdateCustomerInput,
      });

      if (updateCustomer) await refreshCart();
    } catch (error) {
      console.error('Error updating shipping location:', error);
    } finally {
      isUpdatingCart.value = false;
    }
  }

  async function openPayPalWindow(redirectUrl: string): Promise<boolean> {
    return new Promise((resolve) => {
      const width = 750;
      const height = 750;
      const left = window.innerWidth / 2 - width / 2;
      const top = window.innerHeight / 2 - height / 2 + 80;
      const payPalWindow = window.open(redirectUrl, '', `width=${width},height=${height},top=${top},left=${left}`);
      const timer = setInterval(() => {
        if (payPalWindow && payPalWindow.closed) {
          clearInterval(timer);
          resolve(true);
        }
      }, 500);
    });
  }

//   const processCheckout = async (isPaid = false): Promise<any> => {
//     const { customer, loginUser } = useAuth();
//     console.log("customer:::::::::::::::::::::",customer.value);
    
//     const router = useRouter();
//     const { replaceQueryParam } = useHelpers();
//     const { cart, emptyCart, refreshCart } = useCart();

//     isProcessingOrder.value = true;

//     const { username, password, shipToDifferentAddress } = orderInput.value;
//     const billing = customer.value?.billing;
//     const shipping = shipToDifferentAddress ? customer.value?.shipping : billing;
//     const shippingMethod = cart.value?.chosenShippingMethods;

//     try {
//       let checkoutPayload: CheckoutInput = {
//         billing,
//         shipping,
//         shippingMethod,
//         metaData: orderInput.value.metaData,
//         paymentMethod: orderInput.value.paymentMethod.id,
//         customerNote: orderInput.value.customerNote,
//         shipToDifferentAddress,
//         transactionId: orderInput.value.transactionId,
//         isPaid,
//       };
//       console.log("checkoutPayload::::::::::::::",checkoutPayload);
      
//       // Create account
//       if (orderInput.value.createAccount) {
//         checkoutPayload.account = { username, password } as CreateAccountInput;
//         console.log("checkoutPayload.account:::::::::::::::::::",checkoutPayload.account);
        
//       } else {
//         console.log("else::::::::::::::");
        
//         // Remove account from checkoutPayload if not creating account otherwise it will create an account anyway
//         checkoutPayload.account = null;
//       }

//       const { checkout } = await GqlCheckout(checkoutPayload);

//       console.log("checkout::::::::::::",checkout);
      

//       // Login user if account was created during checkout
//       if (orderInput.value.createAccount) {
//         await loginUser({ username, password });
//       }

//       const orderId = checkout?.order?.databaseId;
//       console.log("orderId:::::::::::::::",orderId);
      
//       const orderKey = checkout?.order?.orderKey;
//        console.log("orderKey:::::::::::::::",orderKey);
//       const orderInputPaymentId = orderInput.value.paymentMethod.id;
//       console.log("orderInputPaymentId:::::::::::::::",orderInputPaymentId);
//       const isPayPal = orderInputPaymentId === 'paypal' || orderInputPaymentId === 'ppcp-gateway';

//       // PayPal redirect
//       if ((await checkout?.redirect) && isPayPal) {
//         const frontEndUrl = window.location.origin;
//         let redirectUrl = checkout?.redirect ?? '';
//         const payPalReturnUrl = `${frontEndUrl}/checkout/order-received/${orderId}/?key=${orderKey}&from_paypal=true`;
//         const payPalCancelUrl = `${frontEndUrl}/checkout/?cancel_order=true&from_paypal=true`;

//         redirectUrl = replaceQueryParam('return', payPalReturnUrl, redirectUrl);
//         redirectUrl = replaceQueryParam('cancel_return', payPalCancelUrl, redirectUrl);
//         redirectUrl = replaceQueryParam('bn', 'WooNuxt_Cart', redirectUrl);

//         const isPayPalWindowClosed = await openPayPalWindow(redirectUrl);

//         if (isPayPalWindowClosed) {
//           router.push(`/checkout/order-received/${orderId}/?key=${orderKey}&fetch_delay=true`);
//         }
//       } else {
//         router.push(`/checkout/order-received/${orderId}/?key=${orderKey}`);
//       }
// console.log("checkout?.result:::::::::::::::",checkout?.result);

//       if ((await checkout?.result) !== 'success') {
//         alert('There was an error processing your order. Please try again.');
//         // window.location.reload();
//         // return checkout;
//       } else {
//         // await emptyCart();
//         // await refreshCart();
//       }
//     } catch (error: any) {
//       const errorMessage = error?.gqlErrors?.[0].message;

//       if (errorMessage?.includes('An account is already registered with your email address')) {
//         alert('An account is already registered with your email address');
//         return null;
//       }

//       alert(errorMessage);
//       return null;
//     } finally {
//       isProcessingOrder.value = false;
//     }
//   };



//   const processCheckout = async (isPaid = false): Promise<any> => {
//   const { customer } = useAuth();
//   const router = useRouter();
//   const { replaceQueryParam } = useHelpers();
//   const { cart, emptyCart, refreshCart } = useCart();

//   isProcessingOrder.value = true;

//   const billing = customer.value?.billing;
//   const shipping = orderInput.value.shipToDifferentAddress ? customer.value?.shipping : billing;
//   const shippingMethod = cart.value?.chosenShippingMethods;

//   try {
//     // Prepare checkout payload
//     const checkoutPayload: CheckoutInput = {
//       billing,
//       shipping,
//       shippingMethod,
//       metaData: orderInput.value.metaData,
//       paymentMethod: orderInput.value.paymentMethod.id,
//       customerNote: orderInput.value.customerNote,
//       shipToDifferentAddress: orderInput.value.shipToDifferentAddress,
//       transactionId: orderInput.value.transactionId,
//       isPaid,
//       account: null, // no account creation
//     };

//     console.log("checkoutPayload::::::::::::::", checkoutPayload);

//     // Execute checkout
//     const { checkout } = await GqlCheckout(checkoutPayload);

//     const order = checkout?.order;
//     const orderId = order?.databaseId;
//     const orderKey = order?.orderKey;

//     if (!orderId) {
//       console.error("Order creation failed", order);
//       alert("Error creating order. Please try again.");
//       return null;
//     }

//     // Redirect after checkout (if needed)
//     const orderInputPaymentId = orderInput.value.paymentMethod.id;
//     const isPayPal = orderInputPaymentId === 'paypal' || orderInputPaymentId === 'ppcp-gateway';

//     if (checkout?.redirect && isPayPal) {
//       const frontEndUrl = window.location.origin;
//       let redirectUrl = checkout.redirect ?? '';
//       const payPalReturnUrl = `${frontEndUrl}/checkout/order-received/${orderId}/?key=${orderKey}&from_paypal=true`;
//       const payPalCancelUrl = `${frontEndUrl}/checkout/?cancel_order=true&from_paypal=true`;

//       redirectUrl = replaceQueryParam('return', payPalReturnUrl, redirectUrl);
//       redirectUrl = replaceQueryParam('cancel_return', payPalCancelUrl, redirectUrl);
//       redirectUrl = replaceQueryParam('bn', 'WooNuxt_Cart', redirectUrl);

//       const isPayPalWindowClosed = await openPayPalWindow(redirectUrl);

//       if (isPayPalWindowClosed) {
//         router.push(`/checkout/order-received/${orderId}/?key=${orderKey}&fetch_delay=true`);
//       }
//     } else {
//       router.push(`/checkout/order-received/${orderId}/?key=${orderKey}`);
//     }

//     // Clear cart after successful checkout
//     await emptyCart();
//     await refreshCart();

//     return order; // return the order object so you can get orderId for Stripe
//   } catch (error: any) {
//     const errorMessage = error?.gqlErrors?.[0]?.message || error.message || 'Unknown error';
//     console.error("Checkout error:", errorMessage);
//     alert(errorMessage);
//     return null;
//   } finally {
//     isProcessingOrder.value = false;
//   }
// };




// const processCheckout = async (isPaid = false): Promise<any> => {
//   const { customer } = useAuth();
//   const { cart } = useCart();
// console.log("customer::::::::::::::::::",customer.value);

//   const billing = customer.value?.billing;
//   const shipping = orderInput.value.shipToDifferentAddress ? customer.value?.shipping : billing;
//   const shippingMethod = cart.value?.chosenShippingMethods;
// console.log("billing::::::::::::::::::",billing);
// console.log("shipping::::::::::::::::::",shipping);
// console.log("shippingMethod::::::::::::::::::",shippingMethod);

//   try {
//     const checkoutPayload: CheckoutInput = {
//       billing,
//       shipping,
//       shippingMethod,
//       metaData: [
//         ...orderInput.value.metaData,
//         { key: 'stripe_payment_pending', value: isPaid ? 'false' : 'true' }
//       ],
//       paymentMethod: orderInput.value.paymentMethod.id,
//       customerNote: orderInput.value.customerNote,
//       shipToDifferentAddress: orderInput.value.shipToDifferentAddress,
//       isPaid,
//   account :  null
//     };
// console.log("checkoutPayload:::::::::::::",checkoutPayload);


//     //  // Create account
//     //   if (orderInput.value.createAccount) {
//     //     checkoutPayload.account = { username, password } as CreateAccountInput;
//     //     console.log("checkoutPayload.account:::::::::::::::::::",checkoutPayload.account);
        
//     //   } else {
//     //     console.log("else::::::::::::::");
        
//     //     // Remove account from checkoutPayload if not creating account otherwise it will create an account anyway
//     //     checkoutPayload.account = null;
//     //   }

//     const { checkout } = await GqlCheckout(checkoutPayload);
//     const order = checkout?.order;
//     console.log("order:::::::::::::::",order);
    
// console.log("order.databaseid::::::::::::::::",order?.databaseId);

//     if (!order?.databaseId) {
//       throw new Error("Order creation failed");
//     }

//     return order;
//   } catch (error: any) {
//     const errorMessage = error?.gqlErrors?.[0]?.message || error.message || 'Unknown error';
//     console.error("Checkout error:", errorMessage);
//     throw new Error(errorMessage);
//   }
// };



const processCheckout = async (isPaid = false): Promise<any> => {
  const { customer, loginUser } = useAuth(); 

  const router = useRouter();
  const { replaceQueryParam } = useHelpers();
  const { cart, emptyCart, refreshCart } = useCart();

  isProcessingOrder.value = true;

  // if (!customer.value?.billing?.email) {
  //   console.log("generate customer email random::::::::::::::::::::::::::::::::::");
    
  //   // const randomEmail = `testuser_${Math.floor(Math.random() * 10000)}@mailinator.com`;

  //   customer.value = {
  //    email: "user@mailinator.com"
  //   };
  // }

  const { shipToDifferentAddress } = orderInput.value;
  const billing = {
  ...customer.value.billing,
  email: customer.value.billing.email || customer.value.email
};
  const shipping = shipToDifferentAddress ? customer.value.shipping : billing;
  const shippingMethod = cart.value?.chosenShippingMethods;

  try {
    let checkoutPayload: CheckoutInput = {
      billing,
      shipping,
      shippingMethod,
      metaData: orderInput.value.metaData,
      paymentMethod: orderInput.value.paymentMethod.id,
      customerNote: orderInput.value.customerNote,
      shipToDifferentAddress,
      transactionId: orderInput.value.transactionId,
      isPaid,
      account: null, 
    };

    const { checkout } = await GqlCheckout(checkoutPayload);
    const order = checkout?.order;

    if (!order?.databaseId) {
      throw new Error("Order creation failed");
    }

    return order;
  } catch (error: any) {
    const errorMessage = error?.gqlErrors?.[0]?.message;
    alert(errorMessage ?? 'Unknown error');
    return null;
  } finally {
    isProcessingOrder.value = false;
  }
};



  return {
    orderInput,
    isProcessingOrder,
    processCheckout,
    updateShippingLocation,
  };
}
