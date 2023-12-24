

async function getSingleItem () {
   const url = new URL(location.href)
   const id = url.searchParams.get('id')
   const { data } = await axios('/api/3-airtable?id=' + id)
   result.innerHTML = `<img src=${data.fields.image[0].url} width="400px" />`

}
getSingleItem()