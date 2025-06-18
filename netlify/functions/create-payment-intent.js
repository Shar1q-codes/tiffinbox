// netlify/functions/create-payment-intent.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  try {
    // Only allow POST method
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method Not Allowed' }),
      };
    }

    // Parse the request body
    const data = JSON.parse(event.body);
    const { 
      paymentMethodId, 
      amount, 
      currency = 'gbp', 
      customerEmail, 
      customerName,
      description = 'TiffinBox Subscription'
    } = data;

    if (!paymentMethodId || !amount) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required payment information' }),
      };
    }

    // Create a customer if we have an email
    let customerId;
    if (customerEmail) {
      // Check if customer already exists
      const customers = await stripe.customers.list({
        email: customerEmail,
        limit: 1,
      });

      if (customers.data.length > 0) {
        customerId = customers.data[0].id;
      } else {
        // Create new customer
        const customer = await stripe.customers.create({
          email: customerEmail,
          name: customerName,
          payment_method: paymentMethodId,
          invoice_settings: {
            default_payment_method: paymentMethodId,
          },
        });
        customerId = customer.id;
      }
    }

    // Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      customer: customerId,
      payment_method: paymentMethodId,
      description,
      confirm: true,
      confirmation_method: 'manual',
      use_stripe_sdk: true,
      metadata: {
        customerId: customerId || 'guest',
        customerEmail: customerEmail || 'guest',
      },
    });

    // Return the PaymentIntent
    return {
      statusCode: 200,
      body: JSON.stringify(paymentIntent),
    };

  } catch (error) {
    console.error('Error creating payment intent:', error);
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: error.message,
        code: error.code || 'unknown',
      }),
    };
  }
};