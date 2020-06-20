# Prestabot

Bot for lending money in [yotepresto.com](https://www.yotepresto.com/) programmatically.

## Environment variables

* `EMAIL`: User email for authentication.
* `PASSWORD`: User password for authentication.
* `OTP_SECRET`: The secret hash used to generate OTPs.
* `MIN_INTEREST`: Min interest required to lend money.
* `MIN_CREDIT_SCORE`: Min credit score required to lend money.
* `MIN_TERM`: Min payment term of the requisitions (in months).
* `MAX_TERM`: Max payment term of the requisitions (in months).
* `LEND_AMOUNT`: Amount in MXN to lend each time.
