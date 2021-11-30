fetch('https://swapi.dev/api/people').then(data => data.json()).then(data => {createCard(data.results), createPagination(data)});

// 1. Делаем запрос по определенному URL
// 2. then() служит для обработки ответа от сервера
// 3. В первом then нужно распарсить ответ(JSON)
// 4. После того как данные распарсили, в следующий then приходят обычные js-данные

function createCard(array) {
    array.forEach(item => document.querySelector('.block1').innerHTML += `
        <div class="row">
            <div class="col s12 m6">
                <div class="card">
                    <div class="card-image">
                        <img style="width: 100%" src="image/photo.jpg">
                        <span class="card-title">${item.name}</span>
                    </div>
                    <div class="card-content">
                        <p>Мой рост: ${item.height} <br> Моя масса: ${item.mass} <br> Цвет волос: ${item.hair_color} <br> Цвет кожи: ${item.skin_color}</p>
                    </div>
                </div>
            </div>
        </div>
        `
    );
}

function createPagination(data) {

    const pagination = document.querySelector('.pagination');

    pagination.innerHTML += `
        <button class="page-btn start-page">В начало</button>
        <button class="page=btn" id="prev" disabled> < </button>
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
        <button class="page-btn" id="next"> > </button>
        <button class="page-btn end-page">В конец</button>
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