const sinon = require('sinon');
const Utils = require('./utils');
const sendPaymentRequestToApi = require('./5-payment');

describe('sendPaymentRequestToApi', () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = sinon.spy(console, 'log');
  });

  afterEach(() => {
    consoleSpy.restore();
  });

  it('should call Utils.calculateNumber with SUM, 100, 20', () => {
    sendPaymentRequestToApi(100, 20);
    sinon.assert.calledWith(consoleSpy, 'The total is: 120');
  });

  it('should call Utils.calculateNumber with SUM, 10, 10', () => {
    sendPaymentRequestToApi(10, 10);
    sinon.assert.calledWith(consoleSpy, 'The total is: 20');
  });
});
