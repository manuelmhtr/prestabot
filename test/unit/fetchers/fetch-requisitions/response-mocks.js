const nock = require('nock');

const host = 'https://api.yotepresto.com';
const path = '/v2/investor/requisition_listings';
const successfulResponse = {
  status: 200,
  headers: {
    client: '-7Ir9uON5T-GdCv4bi57lw',
    expiry: '1592268274',
    uid: 'example@email.com',
    'access-token': 'MMWNZjjMaeA5B5VYK9eARA',
    'token-type': 'Bearer',
  },
  data: {
    "requisitions": [
      {
        "id": 1097112,
        "zell_app_id": 1282244,
        "qualification": "B2",
        "rate": "16.9",
        "destination": "Pagar Deudas",
        "term": 12,
        "approved_amount": "100000.0",
        "credit_report": {
          "history_antiquity": 20,
          "score": 722
        },
        "zapopan": true,
        "number_of_credits": 3,
        "loan_detail": {
          "missing_amount": "44600.00",
          "days_to_end": 13
        },
        "funded_amount": "400.0",
        "hidden": false,
        "ticket_counts": 0,
        "to_be_approved_amount": "0.0"
      },
      {
        "id": 3628144,
        "zell_app_id": 6637230,
        "qualification": "A6",
        "rate": "13.9",
        "destination": "Gastos Familiares",
        "term": 36,
        "approved_amount": "310000.0",
        "credit_report": {
          "history_antiquity": 12,
          "score": 681
        },
        "zapopan": true,
        "number_of_credits": 2,
        "loan_detail": {
          "missing_amount": "143500.0",
          "days_to_end": 24
        },
        "funded_amount": "0.0",
        "hidden": false,
        "ticket_counts": 0,
        "to_be_approved_amount": "0.0"
      },
      {
        "id": 3543838,
        "zell_app_id": 6550272,
        "qualification": "B4",
        "rate": "18.9",
        "destination": "Pagar Deudas",
        "term": 36,
        "approved_amount": "400000.0",
        "credit_report": {
          "history_antiquity": 11,
          "score": 673
        },
        "zapopan": false,
        "number_of_credits": 1,
        "loan_detail": {
          "missing_amount": "226100.0",
          "days_to_end": 24
        },
        "funded_amount": "0.0",
        "hidden": false,
        "ticket_counts": 0,
        "to_be_approved_amount": "0.0"
      }
    ],
  }
};

const mockSuccess = ({ accessToken }) => {
  const { status, data, headers } = successfulResponse;
  nock(host, { reqheaders: TestUtils.getExpectedHeaders(accessToken) })
    .get(path)
    .reply(status, data, headers);
};

module.exports = {
  mockSuccess,
};
