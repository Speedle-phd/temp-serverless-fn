## Netlify.toml

Tell info to netlify and custom-setups

## functions

CJS-Syntax

- exports.handler (netlify looking for handler (fixed name))

- exports.handler = async (event, context, [callback]) => {}
   - Event, Context as given arguments (naming is convention)

- exports.handler = async (e,c,[cb]) => {
   return {
      statusCode: number
      body: string
   }
  }
   - body needs to be string. If you want to return obj => JSON.stringify(body)
   - Returning a server response.

NOTE: If you leave our cb you don't need to specify async.
Without cb it's a async/await scenario.

# event

infos of the incoming request.

# context

Context data i.e. Auth-Stuff

# redirects

:code:<netlify.toml>

[[redirects]]
   from = '' <-- custom path with wildcard (/api/*)
   to = '' <-- to actual path with param (/.netlify/functions/:splat)
   status=200