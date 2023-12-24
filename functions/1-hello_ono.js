// domain/.netlify/functions/1-hello_ono
exports.handler = async(event, context) => {
   // console.log(event)
   // console.log(context)
   return {
      statusCode: 200,
      body: 'Hello Ono. This is a serverless function.'
   }
}