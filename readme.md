# Prestabot

Bot for lending money in [yotepresto.com](https://www.yotepresto.com/) programmatically.

## Usage

**On console**

Set the environment variables and run the command:

```sh
$ node ./src/controllers/console-controller.js
```

**On AWS Lambda (recommended)**

1. Download this project, install dependencies (`npm install`) and compress everything in a .zip file (`prestabot.zip`).
2. [Create](https://dev.splunk.com/enterprise/docs/devtools/httpeventcollector/useawshttpcollector/createnodejslambdapkg/#Upload-the-deployment-package) an AWS Lambda function and upload the zipped code.
3. Set the handler as: `prestabot/src/controllers/aws-lambda-controller.handler`
4. Set the environment variables.
5. Configure a [Cloudwatch time trigger](https://medium.com/thelorry-product-tech-data/building-a-simple-scheduled-task-with-aws-using-lambda-function-and-amazon-cloudwatch-event-e92e5e2418cf) to run the handler every X minutes (5 to 30 minutes, depending on your judgement and amount to lend).

## Required environment variables

|Variable|Type|Description|
|--------|----|-----------|
|`EMAIL`|String|The email of the account to be authenticated.|
|`PASSWORD`|String|The password of the account to be authenticated, in plain text.|
|`OTP_SECRET`|String|The secret hash used to generate OTPs. See the section below to learn how to get this value for your account.|
|`MIN_INTEREST`|Float|The minimum interest required on a requisition to lend money. For example: `15.9`, `9.9` or `20.9`|
|`MIN_CREDIT_SCORE`|Float|The minimum credit score required on a requisition to lend money. For example: `700`.|
|`MIN_TERM`|Integer|The minimum payment term of the requisitions (in months). Possible values are `6`, `12`, `18`, `24` or `30`.|
|`MAX_TERM`|Integer|The maximum payment term of the requisitions (in months). Possible values are `12`, `18`, `24`, `30` or `36`.|
|`MIN_LEND_AMOUNT`|Integer|The amount in MXN to lend each on each requisition that passed the filters. Must $200 or more and be a multiple of $100. For example: `300`,`500` or `1000`.|
|`MAX_LEND_AMOUNT`|Integer|The amount in MXN to lend each on each requisition that passed the filters and is great deal (ie. it's warranted or has multiple paid loans). Must $200 or more and be a multiple of $100.|

## Getting the OTP Secret

1. Log into your Yotepresto account.
2. Go to Settings -> Security.
3. Under _"Selecciona tu segundo factor de autenticación"_ (select your second authentication factor), select _"App de autenticación"_ (Authentication app).
4. When the QR code is prompted, take a screenshot of it (only the QR code).
5. To go [XZing Decoder](https://zxing.org/w/decode.jspx) or any other service to read a QR's content, and upload it. This will output a link like this: `otpauth://totp/YOTEPRESTO:user@example.com?secret=I3USKO0GA1BMHCIXY76QTQSU2AS6A2GI&issuer=YOTEPRESTO`.
6. Copy the parameter `secret` from the previous URL (`I3USKO0GA1BMHCIXY76QTQSU2AS6A2GI` in the example). **This is the value for the `OTP_SECRET` environment variable**.
7. Now, follow the regular process: scan the QR code with Google Authenticator, Authy or similar; generate a code and enter it in Yotepresto.
8. The second factor must be enabled and you are ready to go. For security, don't forget to **delete your QR code image**.

## FAQ

**Is it safe?**

Yes, the only known issue is: if you change your password manually or set the `PASSWORD` env variable wrong, the bot may lock your account after the 3rd login attempt. In that case, you'll need to unlock your account manually by opening a link you should have received by email.


**What happens if I enable _Autoinvest_ in my account along with this bot?**

_Autoinvest_ is the native "programmatic bot" provided by Yotepresto once your account reaches $20,000 mxn.

If it is active along with _Prestabot_, it may happen one of two things for requisitions that matches both filters for _Autoinvest_ AND _Prestabot_:

A. If _Autoinvest_ lends to a requisition first, _Prestabot_ will be aware and will skip it.
B. If _Prestabot_ lends to a requisition first, _Autoinvest_ **may lend to this requisition again**. So, you'll end up lending twice to some people.

## Support

Do you like this project? support it by [buying me a beer](https://github.com/sponsors/manuelmhtr) 🍺.
