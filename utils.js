import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
import { JWT, USER_TYPE } from './config'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'takisinaja@gmail.com',
    pass: 'takis123'
  }
})

export const sendEmailVerification = async (user, userType) => {
  let { name, id: userId, email } = user
  let token = jwt.sign(
    {
      userId,
      userType,
      email
    },
    JWT.SECRET_KEY
  )

  user.verification_token = token
  await user.save()
  
  let domain = `${userType === USER_TYPE.CUSTOMER ? '' : 'mitra'}.ngopi.men`
  let link = `https://${domain}/token/${token}`

  const mailOptions = {
    from: 'takisinaja@gmail.com',
    to: email,
    subject: 'Email Verification',
    html: `
      <h1>Hi ${name}, welcome to Takis</h1>
      <p>To verify your email, please click the Verify Email bellow</p>
      <div style="margin-top: 38px;
      margin-bottom: 8px;" >
      <a style="padding: 10px 20px;
      border-radius: 10px;
      color: white;
      background: #00BCD4;
      text-decoration: none;" href=${link}>Verify Email</a>
      </div>
      <br />
      <p>or if it is not working you can just copy this link and paste it into your browser</p>
      ${link}
    `
  }

  return await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        reject(error)
      } else {
        console.log('Email sent: ' + info.response)
        resolve(info.response)
      }
    })
  })
}