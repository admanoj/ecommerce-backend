const nodemailer=require('nodemailer')

const sendEmail=options=>{
    const trasnport = nodemailer.createTransport({
       
            host: process.env.SMPT_HOST,
            port: process.env.SMPT_PORT,
            auth: {
              user: process.env.SMPT_USER,
              pass: process.env.SMPT_PASS
            }
          });

          const mailOptions={
              from:options.from,
              to:options.to,
              subject:options.subject,
              text:options.text,
              html:options.html
          }
          trasnport.sendMail(mailOptions)
    
}


module.exports=sendEmail