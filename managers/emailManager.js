const nodemailer=require("nodemailer");

const emailManager=async(to,text,html,subject)=>{

    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "6d470afd9cbe72",
          pass: "4706bb42005969"
        }
      });


      await transport.sendMail({
        to:to,
        from:"Info@expensetracker.com",
        text:text,
        html:html,
        subject:subject
      })

}

module.exports=emailManager