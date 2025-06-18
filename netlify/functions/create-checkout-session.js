// netlify/functions/create-checkout-session.js
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
      amount, 
      currency = 'gbp', 
      customerEmail, 
      customerName,
      successUrl = 'https://tiffinbox.netlify.app/payment/success',
      cancelUrl = 'https://tiffinbox.netlify.app/payment/cancel',
      description = 'TiffinBox Subscription'
    } = data;

    if (!amount) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required payment information' }),
      };
    }

    // Use the domain from the request for success/cancel URLs if not provided
    let domain = 'https://tiffinbox.netlify.app';
    try {
      if (event.headers.host) {
        const protocol = event.headers.referer?.startsWith('https') ? 'https' : 'http';
        domain = `${protocol}://${event.headers.host}`;
      }
    } catch (e) {
      console.warn('Could not determine domain from request', e);
    }

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: 'TiffinBox Subscription',
              description,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl || `${domain}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${domain}/payment/cancel`,
      customer_email: customerEmail,
      client_reference_id: Date.now().toString(),
      metadata: {
        customerName: customerName || 'Guest',
      },
    });

    // Return the session
    return {
      statusCode: 200,
      body: JSON.stringify({
        id: session.id,
        url: session.url,
        client_secret: session.client_secret,
      }),
    };

  } catch (error) {
    console.error('Error creating checkout session:', error);
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: error.message,
        code: error.code || 'unknown',
      }),
    };
  }
};