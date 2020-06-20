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
        "zell_app_id": "1282244",
        "qualification": "B2",
        "rate": "16.9",
        "destination": "Pagar Deudas",
        "term": 12,
        "approved_amount": "100000.0",
        "loan_detail": {
          "missing_amount": "44600.00",
          "days_to_end": "13"
        },
        "funded_amount": "400.0",
        "hidden": false,
        "credit_report": {
          "score": 722,
          "history_antiquity": 20
        },
        "zapopan": false
      },
      {
        "id": 1121728,
        "zell_app_id": "1308680",
        "qualification": "B6",
        "rate": "20.9",
        "destination": "Automóvil",
        "term": 12,
        "approved_amount": "30000.0",
        "loan_detail": {
          "missing_amount": "0.00",
          "days_to_end": "13"
        },
        "funded_amount": 0,
        "hidden": false,
        "credit_report": {
          "score": 701,
          "history_antiquity": 4
        },
        "zapopan": false
      },
      {
        "id": 1122783,
        "zell_app_id": "1309807",
        "qualification": "B5",
        "rate": "19.9",
        "destination": "Pagar Deudas",
        "term": 24,
        "approved_amount": "50000.0",
        "loan_detail": {
          "missing_amount": "0.00",
          "days_to_end": "13"
        },
        "funded_amount": "24000.0",
        "hidden": false,
        "credit_report": {
          "score": 677,
          "history_antiquity": 11
        },
        "zapopan": false
      },
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
