import sgMail from "@sendgrid/mail"
import twilio from "twilio"
import dotenv, { parse } from "dotenv";

dotenv.config();

export const sendMessage = async (phno, message) => {
  const accountSid = process.env.TWILLO_AC_SID;
  const authToken = process.env.TWILLO_AUTH_TOKEN;
  const sendMsg = process.env.SEND_MESSAGE
  if (process.env.SEND_MAIL === 'true') {
  const client = new twilio(accountSid, authToken)
  client.messages
    .create({
      body: message,
      from: "+13612669692",
      to: '+91' + phno
    })
    .then(message => console.log(message.sid))
  }else {
    console.log("Please make SEND_MESSAGE env as true to use message service")
    return
  }
}
export const sendMail = async (to, subject, text) => {
 if (process.env.SEND_MAIL === 'true') {
    // create reusable transporter object using the default SMTP transport
    sgMail.setApiKey(process.env.SEND_GRID_MAIL)
    const msg = {
      to: to,
      from: 'panisaumyaranjan@gmail.com',
      subject: subject,
      html: text,
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        console.error(error)
      })
  }else {
    console.log("Please make SEND_MAIL env as true to use mail service")
    return
  }
}