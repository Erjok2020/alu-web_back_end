const request = require('supertest');
const app = require('./9-api');
const { expect } = require('chai');

describe('POST /cart', () => {
  it('should return 200 for valid payment', async () => {
    const res = await request(app)
      .post('/cart')
      .send({ cartId: '123', creditCard: '1234567890123456' });
    expect(res.status).to.equal(200);
    expect(res.text).to.equal('Payment successful');
  });

  it('should return 402 for invalid payment', async () => {
    const res = await request(app)
      .post('/cart')
      .send({ cartId: '123', creditCard: '1111222233334444' });
    expect(res.status).to.equal(402);
    expect(res.text).to.equal('Payment required');
  });

  it('should return 400 for missing cartId or creditCard', async () => {
    const res = await request(app)
      .post('/cart')
      .send({});
    expect(res.status).to.equal(400);
    expect(res.text).to.equal('Missing cartId or creditCard');
  });
});
