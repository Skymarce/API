fetch('https://swapi.dev/api/people').then(data => data.json()).then(data => {arrayLength = data.results.length, createCard(data.results), createPagination(data), modal(), moveNext(), movePrev(), activedButton()});

// 1. Делаем запрос по определенному URL
// 2. then() служит для обработки ответа от сервера
// 3. В первом then нужно распарсить ответ(JSON)
// 4. После того как данные распарсили, в следующий then приходят обычные js-данные

let arrayLength = 0;

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
                    <button class="btn-more">Подробнее</button>
                </div>
            </div>
        `
    );

}

function createPagination(data) {

    const pagination = document.querySelector('.pagination');

    pagination.innerHTML += `
        <button id="prev"> < </button>
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
    `;

    changePage();

}

function changePage() {

    const page = document.querySelectorAll('.page-btn');

    page.forEach(item => {
        item.addEventListener('click', () => {

            clearActive();

            item.classList.add('active');

            fetch(`https://swapi.dev/api/people/?page=${item.textContent}`).then(data => data.json()).then(data => {createCard(data.results), modal()});

        });
    });

}

function searchingInfo() {

    const searchValue = document.querySelector('.search').value;

    fetch(`https://swapi.dev/api/people/?search=${searchValue}`).then(data => data.json()).then(data => {createCard(data.results), modal()});

}

document.querySelector('.search-run').addEventListener('click', () => {
    searchingInfo();
});

function cancelSeacrhing() {

    fetch('https://swapi.dev/api/people/?page=1').then(data => data.json()).then(data => {createCard(data.results), modal()});

    document.querySelector('.search').value = '';

}

document.querySelector('.search-cancel').addEventListener('click', () => {
    cancelSeacrhing();
});

// Modal

function closeModal() {

    const modal = document.querySelector('.modal-window');

    modal.classList.add('hide');
    modal.classList.remove('show');

}

function openModal() {

    const modal = document.querySelector('.modal-window');

    modal.classList.add('show');
    modal.classList.remove('hide');

}

function modal() {

    const buttonMore = document.querySelectorAll('.btn-more');
    

    buttonMore.forEach(item => {
        item.addEventListener('click', () => {

            let cardName = item.parentElement.parentElement.querySelector('.card-title').textContent;

            fetch(`https://swapi.dev/api/people/?search=${cardName}`).then(data => data.json()).then(data => createCardMore(data.results[0]));

        });
    });

}

function createCardMore(obj) {

    openModal();

    document.querySelector('.modal-block').innerHTML = '';

    document.querySelector('.modal-block').innerHTML += `
        <div class="more-info">
            <p>
                Имя: ${obj.name} <br>
                Рост: ${obj.height} <br>
                Вес: ${obj.height} <br>
                Цвет волос: ${obj.hair_color} <br>
                Цвет кожи: ${obj.skin_color} <br>
                Цвет глаз: ${obj.eye_color} <br>
                Год рождения: ${obj.birth_year} <br>
                Пол: ${obj.gender} <br>
            </p>
        </div>
    `;

}

document.querySelector('.close-modal').addEventListener('click', () => {
    closeModal();
});

function activedButton() {

    const page = document.querySelectorAll('.page-btn');

    page[0].classList.add('active');

}

function clearActive() {

    const page = document.querySelectorAll('.page-btn');

    page.forEach(item => {
        item.classList.remove('active');
    });

}

function moveNext() {
    
    document.querySelector('#next').addEventListener('click', () => {

        let changePage = +document.querySelector('.active').textContent;

        changePage += 1;
        
        if (changePage < arrayLength) {
            fetch(`https://swapi.dev/api/people/?page=${changePage}`).then(data => data.json()).then(data => {createCard(data.results), modal()});
        } 

        clearActive();

        document.querySelectorAll('.page-btn')[changePage - 1].classList.add('active');

    });

}

function movePrev() {
    
    document.querySelector('#prev').addEventListener('click', () => {

        let changePage = +document.querySelector('.active').textContent;

        changePage -= 1;

        if (changePage >= 1) {
            fetch(`https://swapi.dev/api/people/?page=${changePage}`).then(data => data.json()).then(data => {createCard(data.results), modal()});
        }

        clearActive();

        document.querySelectorAll('.page-btn')[changePage - 1].classList.add('active');

    });

}

