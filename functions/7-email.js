const sgMail = require('@sendgrid/mail')
const z = require('zod')

const emailSchema = z.object({
   name: z.string().min(2, {message: "Please provide a valid name with at least 2 characters."}),
   email: z.string().email({message: "Please provide a valid email."}),
   subject: z.string().min(5, {message: "Please provide a distinct subject with at least 5 characters"}),
   message: z.string().min(1, "Please provide a message")
})
const apiKeySchema = z.string().startsWith('SG.')

exports.handler = async (e, c) => {
   const emailValidation = emailSchema.safeParse(JSON.parse(e.body))
   if(!emailValidation.success){
      return {
         statusCode: 400,
         body: "Bad inputs. Please try again."
      }
   }

   const {name, email: emailTo, subject, message} = JSON.parse(e.body)
   
   try {
      const apiValidation = apiKeySchema.safeParse(process.env.SENDGRID_API_KEY)
      if(!apiValidation.success){
         return {
            statusCode: 403,
            body: "Permission declined."
         }
      }
      sgMail.setApiKey(process.env.SENDGRID_API_KEY)
      
      const html = `
      <div>
         <h2>Here's a message from ${name} from serverless Emailform:</h2>
         <pre>${message}
         Email-Address to respond to: ${emailTo}</pre>
      </div>
      `
      const msg= {
         to: process.env.EMAIL_TO,
         from: process.env.EMAIL_FROM,
         subject: subject,
         html: html
      }
      await sgMail.send(msg)
      return {
         statusCode: 200,
         body: 'Success',
      }
   } catch (error) {
      console.log(error)
      return {
         statusCode: 400,
         body: JSON.stringify(error)
      }
   }
}
