const express = require('express');
const app = express();
app.use(express.json());

const PORT = 7865;
const validCarts = new Set([1, 2, 3, 4, 5]);

app.get('/', (req, res) => {
  res.status(200).send('Welcome to the payment system');
});

app.get('/cart/:id([0-9]+)', (req, res) => {
  const cartId = parseInt(req.params.id, 10);

  if (validCarts.has(cartId)) {
    res.status(200).send(`Payment methods for cart ${cartId}`);
  } else {
    res.status(404).send('Cart not found');
  }
});

app.get('/available_payments', (req, res) => {
  res.status(200).json({
    payment_methods: {
      credit_cards: true,
      paypal: false
    }
  });
});

app.post('/login', (req, res) => {
  const { userName } = req.body;
  
  if (userName) {
    res.status(200).send(`Welcome ${userName}`);
  } else {
    res.status(400).send('User name is required');
  }
});

app.listen(PORT, () => {
  console.log(`API available on localhost port ${PORT}`);
});

module.exports = app;
