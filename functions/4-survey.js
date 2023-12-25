const dotenv = require('dotenv')
const Airtable = require('airtable-node')
dotenv.config()
const airtablePat = process.env.AIRTABLE_PAT
const baseId = 'app3G4undptQJQCJY'
const options = {
   apiKey: airtablePat,
}
const airtable = new Airtable(options).base(baseId).table('survey')

exports.handler = async (e, c) => {
   const {httpMethod} = e
   if(httpMethod === "GET"){
      const {records: data} = await airtable.list()
      return {
         statusCode: 200,
         body: JSON.stringify(data)
      }
   } else if (httpMethod === "PUT") {
      let {id, oldValue} = JSON.parse(e.body)
      console.log(e.headers["client-ip"])
      const incrementVote = ++oldValue
      const update = await airtable.update(id, {
         votes: incrementVote,
      })
      return {
         statusCode: 200,
         body: JSON.stringify(update)
      }
   }
}
