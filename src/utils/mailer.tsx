import nodemailer from 'nodemailer'
import {MailtrapTransport} from "mailtrap"
import bcrypt from 'bcryptjs'
import { User } from '@/models/user.model'
import { log } from 'console'

export const sendMail = async({email, emailType, userId}:any) => {
  try {

    log("SEND MAIL UTIL CALLED :: ", email, emailType, userId);

    const hashedToken = await bcrypt.hash(Date.now().toString(), 10)

    if( emailType === "VERIFY" ){
      const user = await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now()+600000
      })
    }else{
      const user = await User.findByIdAndUpdate(userId, {
        forgetPasswordToken: hashedToken,
        forgetPasswordTokenExpiry: Date.now()+600000
      })
    }

    const TOKEN = process.env.NODEMAILER_TOKEN || "";

    const transport = nodemailer.createTransport(
      MailtrapTransport({
        token: TOKEN,
      })
    );

    const sender = {
      address: "hello@demomailtrap.co",
      name: "NextJS Auth Mailtrap",
    };

    const mailOptions = {
      from: sender,
      to: email,
      subject: emailType==="VERIFY" ? "VERIFY YOUR EMAIL" : "RESET YOUR PASSWORD" ,
      html: `<p> Click <a href="${process.env.DOMAIN}/${emailType.toLowerCase()}?token=${hashedToken}">here</a> to ${emailType==="VERIFY"? "verify your email" : "reset your password" } or copy and paste the link below in your browser. LINK:<br>${process.env.DOMAIN}/${emailType.toLowerCase()}?token=${hashedToken}`
    }

    const response = await transport.sendMail(mailOptions)

    log('Mail sent successfully:: ', response);

    return response
    
  } catch (error) {
    console.log('something went wrong while sending email::', error);
    throw(error)
  }
}

