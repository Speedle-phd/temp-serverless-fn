const dotenv = require('dotenv')
const Airtable = require('airtable-node')
dotenv.config()
const airtablePat = process.env.AIRTABLE_PAT
const baseId = 'app3G4undptQJQCJY'
const options = {
   // endpointUrl: 'https://api.airtable.com',
   apiKey: airtablePat
}
const airtable = new Airtable(options).base(baseId).table('products')

exports.handler = async(e,c) => {
   console.log(e.rawQuery)
   if(!e.rawQuery){
      const {records: data} = await airtable.list()
      return {
         headers: {
            'Access-Control-Allow-Origin': '*',
         },
         statusCode: 200,
         body: JSON.stringify(data)
      }
   } else {
      const singleItemId = e.rawQuery.split("=").at(-1)
      const singleItem = await airtable.retrieve(singleItemId)
      console.log(singleItem)
      return {
         headers: {
            'Access-Control-Allow-Origin': '*',
         },
         statusCode: 200,
         body: JSON.stringify(singleItem),
      }
   }
}