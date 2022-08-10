const { get } = require('lodash');
const { getAccessToken } = require('../../parsers');

const parseOrder = (data) => {
  return {
    ticketId: data.ticket_id,
    status: data.status,
    amount: parseFloat(data.amount),
  };
};

module.exports = (response) => {
  const { headers, data } = response;

  const allOrders = get(data, 'orders.0');
  const orders = Object.keys(allOrders).reduce((prev, key) => {
    return prev.concat(allOrders[key]);
  }, []);

  return {
    accessToken: getAccessToken(headers),
    orders: (orders || []).map(parseOrder),
    processingOrders: parseInt(data.processing_orders, 10),
  }
};
