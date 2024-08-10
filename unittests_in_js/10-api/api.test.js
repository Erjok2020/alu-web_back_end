const request = require('supertest');
const app = require('./10-api');
const { expect } = require('chai');

describe('API Endpoints', () => {
  describe('GET /', () => {
    it('should return the welcome message', async () => {
      const res = await request(app).get('/');
      expect(res.status).to.equal(200);
      expect(res.text).to.equal('Welcome to the payment system');
    });
  });

  describe('GET /cart/:id', () => {
    it('should return payment methods for a valid cart ID', async () => {
      const res = await request(app).get('/cart/1');
      expect(res.status).to.equal(200);
      expect(res.text).to.equal('Payment methods for cart 1');
    });

    it('should return 404 for an invalid cart ID', async () => {
      const res = await request(app).get('/cart/999');
      expect(res.status).to.equal(404);
      expect(res.text).to.equal('Cart not found');
    });

    it('should return 404 for a non-numeric cart ID', async () => {
      const res = await request(app).get('/cart/abc');
      expect(res.status).to.equal(404);
    });
  });

  describe('GET /available_payments', () => {
    it('should return available payment methods', async () => {
      const res = await request(app).get('/available_payments');
      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal({
        payment_methods: {
          credit_cards: true,
          paypal: false
        }
      });
    });
  });

  describe('POST /login', () => {
    it('should return a welcome message for a valid userName', async () => {
      const res = await request(app).post('/login').send({ userName: 'John' });
      expect(res.status).to.equal(200);
      expect(res.text).to.equal('Welcome John');
    });

    it('should return 400 if userName is not provided', async () => {
      const res = await request(app).post('/login').send({});
      expect(res.status).to.equal(400);
      expect(res.text).to.equal('User name is required');
    });
  });
});
