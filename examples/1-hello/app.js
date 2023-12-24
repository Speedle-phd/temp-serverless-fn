

getResponse()

async function getResponse(){
   const res = await axios('/api/1-hello_ono')
   result.innerHTML = res.data
}