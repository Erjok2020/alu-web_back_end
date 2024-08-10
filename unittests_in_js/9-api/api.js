const express = require('express');
const app = express();
app.use(express.json());

const validCreditCards = ['1234567890123456', '2345678901234567'];

app.post('/cart', (req, res) => {
  const { cartId, creditCard } = req.body;

  if (!cartId || !creditCard) {
    return res.status(400).send('Missing cartId or creditCard');
  }

  if (validCreditCards.includes(creditCard)) {
    return res.status(200).send('Payment successful');
  } else {
    return res.status(402).send('Payment required');
  }
});

app.listen(7865, () => {
  console.log('API available on localhost port 7865');
});

module.exports = app;
