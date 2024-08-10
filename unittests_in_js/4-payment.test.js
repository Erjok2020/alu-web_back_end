const sinon = require('sinon');
const Utils = require('./utils');
const sendPaymentRequestToApi = require('./4-payment');

describe('sendPaymentRequestToApi', () => {
  it('should call Utils.calculateNumber with SUM, 100, 20 and log "The total is: 10"', () => {
    const stub = sinon.stub(Utils, 'calculateNumber').returns(10);
    const spy = sinon.spy(console, 'log');
    sendPaymentRequestToApi(100, 20);
    sinon.assert.calledWith(stub, 'SUM', 100, 20);
    sinon.assert.calledWith(spy, 'The total is: 10');
    stub.restore();
    spy.restore();
  });
});
