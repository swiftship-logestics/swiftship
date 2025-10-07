import Stripe from 'stripe';
import { readBody, sendError, createError } from 'h3';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-08-27.basil' });

export default async (event: any) => {
  try {
    const body = await readBody(event);
    console.log("body:::::::::::::", body);
    
    const { orderId, amount } = body;
console.log("orderId, amount::::::::::::: ",orderId, amount );

    if (!orderId || !amount) {
      throw createError({ statusCode: 400, statusMessage: 'Missing orderId or amount' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      metadata: { orderId },
    });

    console.log("paymentIntent:::::::::::::::",paymentIntent);
    
    return { clientSecret: paymentIntent.client_secret };
  } catch (err: any) {
    return sendError(event, createError({
      statusCode: 500,
      statusMessage: err.message || 'Internal Server Error'
    }));
  }
};
