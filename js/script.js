fetch('https://swapi.dev/api/people').then(data => data.json()).then(data => {createCard(data.results), createPagination(data)});

// 1. Делаем запрос по определенному URL
// 2. then() служит для обработки ответа от сервера
// 3. В первом then нужно распарсить ответ(JSON)
// 4. После того как данные распарсили, в следующий then приходят обычные js-данные

function createCard(array) {
    document.querySelector('.block').innerHTML = '';
    array.forEach(item => document.querySelector('.block').innerHTML += `
            <div class="card">
                <div class="card-image">
                    <img style="width: 100%" src="image/photo.jpg">
                    <span class="card-title">${item.name}</span>
                </div>
                <div class="card-content">
                    <p>Мой рост: ${item.height} <br> Моя масса: ${item.mass} <br> Цвет волос: ${item.hair_color} <br> Цвет кожи: ${item.skin_color}</p>
                </div>
            </div>
        `
    );
}

function createPagination(data) {

    const pagination = document.querySelector('.pagination');

    pagination.innerHTML += `
        <button class="start-page">В начало</button>
        <button id="prev" disabled> < </button>
    `;

    let numberPage = 1;

    for (let i = 0; i < data.count / 10; i++) {
        if (data.count) {
            pagination.innerHTML += `
                <button class="page-btn">${numberPage++}</button>
            `;
        }
    }

    pagination.innerHTML += `
        <button id="next"> > </button>
        <button class="end-page">В конец</button>
    `;

    changePage();

}

function changePage() {

    const page = document.querySelectorAll('.page-btn');

    page.forEach(item => {
        item.addEventListener('click', () => {
            fetch(`https://swapi.dev/api/people/?page=${item.textContent}`).then(data => data.json()).then(data => createCard(data.results));
        });
    });

}

function searchingInfo() {
    const searchValue = document.querySelector('.search').value;

    fetch(`https://swapi.dev/api/people/?search=${searchValue}`).then(data => data.json()).then(data => createCard(data.results));

}

document.querySelector('.search-run').addEventListener('click', () => {
    searchingInfo();
});

/* function cancelSeacrhing() {

    const searchValue = document.querySelector('.search').value;

    if (searchValue == '') {
        fetch('https://swapi.dev/api/people/?page=1').then(data => data.json()).then(data => createCard(data.results));
    }

}

setTimeout(cancelSeacrhing, 2000); */

function cancelSeacrhing() {
    fetch('https://swapi.dev/api/people/?page=1').then(data => data.json()).then(data => createCard(data.results));
}

document.querySelector('.search-cancel').addEventListener('click', () => {
    cancelSeacrhing();
});