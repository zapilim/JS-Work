/*------------------------Example 1-----------------------*/

function multiply() {
    if (arguments.length === 0) {
        return 0;
    }
    let result = 1;
    for (let i = 0; arguments.length > i; i++) {
        result *= arguments[i];
    }
    return result;
}

multiply(5, 2, 3);
multiply();

/*------------------------Example 2-----------------------*/

function reverseString(str) {
    return str.split('').reverse().join('');
}

reverseString('test');

/*------------------------Example 3-----------------------*/

function getCodeStringFromText(str) {
    let newStr = '';
    for (let i = 0; str.length > i; i++) {
        newStr += str.charCodeAt(i) + ' ';
    }
    return newStr;
}

getCodeStringFromText('hello');

/*------------------------Example 4-----------------------*/

function random(a) {
    let min = 1;
    let max = 10;
    let randomNumber = Math.floor(Math.random() * (max - min)) + min;
    if (a > 10) {
        alert(`Ваш аргумент ${a}. Необходим меньше 10`)
    } else if (a < 1) {
        alert(`Ваш аргумент ${a}. Необходим больше 0`)
    } else {
        if (a !== randomNumber) {
            alert(`Вы не угадали ваше число ${a} а выпало число ${randomNumber}`);
        } else {
            alert('Вы выиграли')
        }
    }
}

random(5);

/*------------------------Example 5-----------------------*/

function getArray(n) {
    let newArr = [];
    for (let i = 1; i <= n; i++) {
        newArr.push(i);
    }
    return newArr;
}

getArray(10);

/*------------------------Example 6-----------------------*/

function doubleArray(n) {
    return [...n, ...n];
}

doubleArray([1, 2, 3]);

/*------------------------Example 7-----------------------*/

function changeCollection() {
    for (let i = 0; arguments.length > i; i++) {
        arguments[i].shift();
    }
    return [arguments];
}

changeCollection([1, 2, 3], ['a', 'b', 'c']);

/*------------------------Example 8-----------------------*/

function funcGetUsers(users, field, value) {
    if (users !== undefined && field !== undefined && value !== undefined) {
        return users.filter(user => user[field] === value);
    } else {
        alert('Переданы не все аргументы')
    }
}

funcGetUsers([{
    name: 'Rita',
    gender: 'female',
    age: 29
},
    {
        name: 'Alex',
        gender: 'male',
        age: 13
    },
    {
        name: 'Alex',
        gender: 'male',
        age: 25
    },
    {
        name: 'Elena',
        gender: 'female',
        age: 76
    }
], 'gender', 'male');
