import { GqlGetStripePaymentIntent } from '#gql';

export async function getStripeClientSecret() {
  const result = await GqlGetStripePaymentIntent();
  const { stripePaymentIntent } = result;
  if (!stripePaymentIntent?.clientSecret) throw new Error("Stripe client secret not found for order");
  return stripePaymentIntent.clientSecret;
}
