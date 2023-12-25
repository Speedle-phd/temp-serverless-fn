const nameInput = document.querySelector('.name-input')
const emailInput = document.querySelector('.email-input')
const subjectInput = document.querySelector('.subject-input')
const messageInput = document.querySelector('.message-input')
const form = document.querySelector('.form')
const btn = document.querySelector('.submit-btn')
const alert = document.querySelector('.alert')
const title = document.querySelector('.title')
alert.style.display = 'none'


form.addEventListener('submit', async(e) => {
   e.preventDefault()
   btn.textContent = "Sending..."
   const formData = new FormData(e.target)
   const entries = Object.fromEntries([...formData.entries()])
   try {
      const res = await axios.post('/api/7-email', { ...entries })
      
      if(res.data === "Success"){
         alert.style.display = "block"
         alert.style.color = "green"
         alert.textContent = "Successfully sent email"
         setTimeout(() => alert.style.display = "none", 3000)
         form.reset()
      }
   } catch (error) {

      alert.style.display = 'block'
      alert.style.color = 'red'
      alert.textContent = JSON.stringify(error.response.data)
      setTimeout(() => (alert.style.display = 'none'), 3000)
   }

   btn.textContent = 'SEND'
   
})