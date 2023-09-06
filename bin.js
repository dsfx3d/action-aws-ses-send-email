import {SESClient, SendEmailCommand} from "@aws-sdk/client-ses";
import {getInput} from "@actions/core";

const subject = getInput("subject", {required: true});
const from = getInput("from", {required: true});
const to = getInput("to", {required: true});
const body = getInput("body", {required: false});
const htmlBody = getInput("html_body", {required: false});
const cc = getInput("cc", {required: false});
const bcc = getInput("bcc", {required: false});
const replyTo = getInput("reply_to", {required: false});

const command = new SendEmailCommand({
  Destination: {
    ToAddresses: [to],
    CcAddresses: cc ? [cc] : undefined,
    BccAddresses: bcc ? [bcc] : undefined,
  },
  Message: {
    Subject: {
      Data: subject,
      Charset: "utf8",
    },
    Body: {
      Text: {
        Data: body,
        Charset: "utf8",
      },
      Html: {
        Data: htmlBody,
        Charset: "utf8",
      },
    },
  },
  Source: from,
  ReplyToAddresses: replyTo ? [replyTo] : undefined,
});

new SESClient({}).send(command);
