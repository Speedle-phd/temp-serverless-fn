const result = document.querySelector('.result')

getProducts()

async function getProducts(){
   try {
      const {data} = await axios('/api/2-basic-api')
      result.innerHTML = data.map(el => {
         const {id, name, image, price} = el
         return `
            <div id=${id}>
               <img src=${image}/>
               <h2>${name}</h2>
               <p>${price}</p>
            </div>
         `
      }).join("")
   } catch (error) {
      result.innerHTML = JSON.stringify(error)
   }
}