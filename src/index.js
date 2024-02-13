import Swal from 'sweetalert2';
const apiKey = import.meta.env.VITE_API_KEY;
console.log(apiKey);

const getCoins = async (moeda) => {
    try {
        const request = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${moeda}`);
        const response = await request.json();
        const data = response;
        console.log(data);
        if (data.result === 'error') {
            Swal.fire({
                title: 'Oops...',
                text: 'Moeda não existente!',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            return;
        }
        return data;
    } catch (error) {
        Swal.fire({
            title: 'Oops...',
            text: 'Você precisa informar uma moeda!',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
        console.error(error.message);
    }

};
const input = document.querySelector('#moeda');
const button = document.querySelector('#btn-search');
const resultsBoard = document.querySelector('#results-board');

button.addEventListener('click', async () => {
    const moeda = input.value.toUpperCase();
    const data = await getCoins(moeda);
    const title = document.createElement('h2');
    title.innerHTML = `Valores referentes a ${data.conversion_rates[moeda]} ${moeda}`;
    input.value = '';
    resultsBoard.appendChild(title);
    const list = document.createElement('ul');
    for (const key in data.conversion_rates) {
        const item = document.createElement('li');
        item.innerHTML = `${key}: ${data.conversion_rates[key]}`;
        list.appendChild(item);
    }
    resultsBoard.appendChild(list);
});