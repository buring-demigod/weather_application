const weather_form = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


weather_form.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;
    messageOne.textContent = 'loading information';
    messageTwo.textContent = "";

    fetch(`/weather?address=${location}`)
        .then(response => response.json())
        .then(data => {

            if (data.error) {
                messageOne.textContent = data.error;
            }

            else {
                messageOne.textContent = data.forecast;
                messageTwo.textContent = data.location;
            }
        });
});