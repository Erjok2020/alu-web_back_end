const request = require('supertest');
const app = require('./8-api');
const { expect } = require('chai');

describe('GET /cart/:id', () => {
  it('should return payment methods for a valid cart id', async () => {
    const res = await request(app).get('/cart/123');
    expect(res.status).to.equal(200);
    expect(res.text).to.equal('Payment methods for cart 123');
  });

  it('should return 404 for invalid cart id', async () => {
    const res = await request(app).get('/cart/abc');
    expect(res.status).to.equal(404);
  });
});
