const result = document.querySelector('.result')

const getAirtable = async() => {
   const {data} = await axios('/api/3-airtable')
   result.innerHTML = data.map(el => {
   const {id, fields: {desc, name, price, image} } = el
   const url = image[0].url
      return `
      <a href="./product.html?id=${id}">
         <div id=${id}>
            <img src=${url} width="200px" />
            <h4>${name} - ${desc}</h4>
            <p>${price}</p>
         </div>
         </a>
      `
   }).join("")
}
getAirtable()