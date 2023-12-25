
// it takes few minutes

const form = document.querySelector('.form')
const input = document.querySelector('.form-input')
const alert = document.querySelector('.alert')
const result = document.querySelector('.result')
alert.style.display = 'none'

form.addEventListener('submit', async(e) => {
   e.preventDefault()
   const city = input.value
   if(city){
      await getWeather(city)
   }
})


async function getWeather(city){
   const { data } = await axios.post('/api/5-weather', {city})
   result.textContent = JSON.stringify(data)


}