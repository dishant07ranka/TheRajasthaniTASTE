/**
 * Minimal Node/Express example to create Razorpay order server-side.
 * Install: npm install express body-parser razorpay crypto
 *
 * Notes:
 * - Keep your key_id and key_secret on the server only (never expose key_secret to clients).
 * - Create an order with amount in paise (INR * 100). Return order_id to client.
 * - After payment, verify signature on server using 'razorpay_order_id|razorpay_payment_id' and hmac_sha256 with key_secret.
 */

const express = require('express');
const bodyParser = require('body-parser');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

const razorpay = new Razorpay({
  key_id: 'rzp_test_your_key_here',     // replace with your key_id
  key_secret: 'rzp_test_your_secret'    // replace with your key_secret
});

// Create order endpoint
app.post('/create-order', async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt } = req.body;
    if (!amount || amount <= 0) return res.status(400).send({ error: 'Invalid amount' });

    const options = {
      amount: amount, // amount in paise (e.g., 50000 = ₹500)
      currency,
      receipt: receipt || `rcpt_${Date.now()}`,
      payment_capture: 1
    };
    const order = await razorpay.orders.create(options);
    res.send(order); // send order.id (order_id) to client
  } catch (err) {
    console.error('create-order error', err);
    res.status(500).send({ error: 'Unable to create order' });
  }
});

// Verify payment signature endpoint (called after client notifies server)
app.post('/verify-payment', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const hmac = crypto.createHmac('sha256', razorpay.key_secret);
  hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
  const expected = hmac.digest('hex');
  if (expected === razorpay_signature) {
    // Payment is valid — mark order paid in your DB
    res.send({ ok: true });
  } else {
    res.status(400).send({ ok: false, error: 'Invalid signature' });
  }
});

app.listen(3000, () => console.log('Razorpay example server running on :3000'));
