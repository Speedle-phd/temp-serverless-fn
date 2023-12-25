require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET)
exports.handler = async(e,c) => {
   const {purchase, total_amount, shipping_fee} = JSON.parse(e.body)
   function calculateOrderAmount(purchase){
      // here there should be like a database call to verify the amount the user is going to pay.
      // From DB get the items and double check the amount
      const amount = purchase.reduce((total, curr) => {
         total += curr.price
         return total
      }, 0)
      console.log(amount === total_amount)
      return total_amount + shipping_fee
   }
   try {
      const paymentIntent = await stripe.paymentIntents.create({
         amount: calculateOrderAmount(purchase),
         currency: "usd"
      })
      return {
         statusCode: 200,
         body: JSON.stringify({clientSecret: paymentIntent.client_secret})
      }
   } catch (error) {
      console.log(error)
      return {
         statusCode: 500,
         body: JSON.stringify({error: error.message})
      }
   }

   
}