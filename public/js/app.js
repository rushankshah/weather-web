const weatherForm = document.querySelector('form')
const query = document.querySelector('input')
const message = document.querySelector('#message-1')
const errorMessage = document.querySelector('#message-2')
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    message.textContent = 'Loading'
    errorMessage.textContent = ''
    const loc = query.value
    fetch('http://localhost:3000/weather?address='+loc).then((resp) => {
        resp.json().then((data) => {
            if (data.error) {
                errorMessage.textContent = data.error
                message.textContent = ''
            }
            else {
                message.textContent = data.forecast
            }
        })
    })
})