/*-----------------------Example 1.1---------------------*/
/*Создать функцию, которая принимает два элемента.
 Функция проверяет, является ли первый элемент родителем для второго:

    isParent(parent, child);
isParent(document.body.children[0], document.querySelector('mark'));
// true так как первый див является родительским элементом для mark

isParent(document.querySelector('ul'), document.querySelector('mark'));
// false так ul НЕ является родительским элементом для mark
Функция принимает только DOM объекты.*/

const isParent = (parent, child) => {
    return parent.contains(child);
};

console.log(isParent(document.body.children[0], document.querySelector('mark')));
console.log(isParent(document.querySelector('ul'), document.querySelector('mark')));

/*-----------------------Example 1.2---------------------*/
/*2. Получить список всех ссылок, которые не находятся внутри списка ul*/

const getLinks = () => {
    const allLinks = document.querySelectorAll('a');
    const linkArray = [];
    allLinks.forEach(item => {
        let parent = item.parentElement;
        while (true) {
            if (parent === null) {
                linkArray.push(item);
                break;
            } else if (parent.tagName === 'UL') {
                break;
            }
            parent = parent.parentElement;
        }
    });
    return linkArray;
};

console.log(getLinks());

/*-----------------------Example 1.3---------------------*/
/*3. Найти элемент, который находится перед и после списка ul*/

const foundElement = el => {
    console.log(el.previousElementSibling);
    console.log(el.nextElementSibling);
};

foundElement(document.querySelector("ul"));

/*-----------------------Example 2.1---------------------*/
/*
Дан массив пользователей, его можно скопировать отсюда из первой задачи, создать таблицу вида:
Условия:
    В конце таблицы обязательно последняя tr должна содержать total balance всех пользователей из таблицы при этом он должен быть всегда выровнен по правому краю.
    Количество пользователей может быть любым.
    Таблица и все ее содержимое должно создаваться через js, в разметке у вас может быть только контейнер какой то.
    В коде у вас должна быть переменная которая будет содержать в виде объекта список полей и заголовков th которые будут выводиться в таблице. Что то типа { name: ‘Name’, email: ‘Email’... } соответственно ключ объекта это ваше поле которое вы хотите вывести из объекта пользователя а значение это заголовок th.
*/

let users = [
    {
        "_id": "5d220b10e8265cc978e2586b",
        "isActive": true,
        "balance": 2853.33,
        "age": 20,
        "name": "Buckner Osborne",
        "gender": "male",
        "company": "EMPIRICA",
        "email": "bucknerosborne@empirica.com",
        "phone": "+1 (850) 411-2997",
        "registered": "2018-08-13T04:28:45 -03:00",
        "nestedField": {total: 300}
    },
    {
        "_id": "5d220b10144ef972f6c2b332",
        "isActive": true,
        "balance": 1464.63,
        "age": 38,
        "name": "Rosalie Smith",
        "gender": "female",
        "company": "KATAKANA",
        "email": "rosaliesmith@katakana.com",
        "phone": "+1 (943) 463-2496",
        "registered": "2016-12-09T05:15:34 -02:00",
        "nestedField": {total: 400}
    },
    {
        "_id": "5d220b1083a0494655cdecf6",
        "isActive": false,
        "balance": 2823.39,
        "age": 40,
        "name": "Estrada Davenport",
        "gender": "male",
        "company": "EBIDCO",
        "email": "estradadavenport@ebidco.com",
        "phone": "+1 (890) 461-2088",
        "registered": "2016-03-04T03:36:38 -02:00",
        "nestedField": {total: 200}
    }
];

const wrapper = document.getElementById('new_table');
const newTable = document.createElement('table');
newTable.id = 'is_table';

function userTable(users) {
    const createTbody = document.createElement('tbody');
    createTbody.id = 'is_tbody';
    const createThead = document.createElement('thead');
    createThead.id = 'is_thead';
    const titlesThead = ['#', 'Name', 'Email', 'Balance'];
    let totalBalance = 0;

    titlesThead.map(item => {
        let th = document.createElement('th');
        th.textContent = item;
        createThead.appendChild(th);
    });

    users.forEach((user, i) => {
        let trRow = document.createElement('tr');
        titlesThead.forEach((title) => {
            if (title === '#') {
                let td = document.createElement('td');
                td.textContent = i + 1;
                trRow.appendChild(td);
            }

            if (title === 'Name') {
                let td = document.createElement('td');
                td.textContent = user.name;
                trRow.appendChild(td);
            }

            if (title === 'Email') {
                let td = document.createElement('td');
                td.textContent = user.email;
                trRow.appendChild(td);
            }

            if (title === 'Balance') {
                let td = document.createElement('td');
                td.textContent = user.balance;
                trRow.appendChild(td);
                totalBalance += user.balance;
            }
        });
        createTbody.appendChild(trRow);
    });

    newTable.appendChild(createThead);
    newTable.appendChild(createTbody);

    let trTotalBalance = document.createElement('tr');
    let totalTd = document.createElement('td');
    totalTd.id = 'is_total';
    totalTd.textContent = 'Total balance: ' + parseInt(totalBalance);
    totalTd.setAttribute('colspan', '4');
    trTotalBalance.style.cssText = 'text-align : right';
    trTotalBalance.appendChild(totalTd);
    createTbody.appendChild(trTotalBalance);
    return wrapper.appendChild(newTable);
}

userTable(users);

/*-----------------------Example 3.1---------------------*/
/*1.По нажатию на кнопку "btn-msg" должен появиться алерт с тем текстом который находится в атрибуте data-text у кнопки.*/

const clickEvent = () => {
    const isParent = document.getElementById('btn-msg');
    isParent.addEventListener('click', function () {
        return alert(isParent.getAttribute('data-text'));
    });
};

clickEvent();

/*-----------------------Example 3.2---------------------*/
/*3. При нажатии на любой узел документа показать в элементе с id=tag имя тега нажатого элемента.*/

const clickNode = () => {
    document.addEventListener('click', function (event) {
        const isId = document.getElementById('tag');
        return isId.innerHTML = 'Tag: ' + event.target.tagName;
    });
};

clickNode();

/*-----------------------Example 3.3---------------------*/
/*7. Из презентации “Занятие 7 - Манипуляция DOM.
Работа с атрибутами.” дополнить функционал для таблицы из задачи 6.
Создать кнопку которая будет при клике сортировать пользователей по возрастанию или убыванию поля balance
при этом в кнопке должна показываться стрелка в какую сторону сейчас отсортированы пользователи.
Иконки можете взять с font awesome, в качестве фреймворка использовался bootstrap.*/

const createSortButton = () => {
    const sortButton = document.createElement('button');
    sortButton.textContent = 'Sort';
    sortButton.className = 'sort-button btn btn-success';
    wrapper.insertBefore(sortButton, wrapper.firstChild);
    document.addEventListener('click', function (event) {
        //sort if < or >
        if (event.target.className === 'sort-button btn btn-success') {
            sortButton.innerHTML = 'Sort ' + '<i class="fa fa-arrow-down" aria-hidden="true"></i>';
            users = users.sort((userMin, userMax) => (
                userMin.balance < userMax.balance ? -1 : 1
            ));
            const oldTbody = document.getElementById('is_tbody');
            const oldThead = document.getElementById('is_thead');
            const mainTable = document.getElementById('is_table');
            mainTable.removeChild(oldThead);
            mainTable.removeChild(oldTbody);
            userTable(users)
        }
    });
};

createSortButton();


