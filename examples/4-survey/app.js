const title = document.querySelector('.title h2')
const result = document.querySelector('.result')

getVotes()

async function getVotes(){
   const {data} = await axios('/api/4-survey')
   result.innerHTML = data.map(el => {
      const {id, fields: {room, votes}} = el
      return `
         <li id=${id}>
            <div class="key">${room.slice(0, 2)}</div>
            <header>
               <h4>${room}</h4>
               <p>${votes} votes</p>
            </header>
            <button class="vote-up">
               <i class="fa-solid fa-check-to-slot"></i>
            </button>
         </li>
      `
   }).join("")
   addClickEvent()
}

function addClickEvent(){
   const buttons = [...document.querySelectorAll('.vote-up')]
   buttons.forEach(btn => {
      btn.addEventListener('click', handleVote)
   })
}

async function handleVote (e) {
   title.textContent = "Loading..."
   const {target: t} = e
   const parentLi = t.closest('li')
   const voteDOM = parentLi.querySelector('header>p')
   const oldValue = +voteDOM.textContent.split(" ")[0]
   const id = parentLi.id
   const res = await axios.put('/api/4-survey', {id, oldValue})
   const {data: {fields: {votes}}} = res
   voteDOM.textContent = votes + " votes"
   title.textContent = "Survey"
}