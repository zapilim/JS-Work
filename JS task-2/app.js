/*------------------------Example 1.1-----------------------*/

/*Используя rest оператор и деструктуризацию, создать функцию, которая принимает
любое количество аргументов и возвращает объект, содержащий первый аргумент и массив из остатка:*/

function func() {
    let [first, ...other] = arguments;
    return {
        first: first,
        other: other
    };
}

console.log(func('a', 'b', 'c', 'd'));
func('a', 'b', 'c', 'd');

/*------------------------Example 1.2-----------------------*/

/*Организовать функцию getInfo, которая принимает объект вида
{ name: ...,  info: { employees: [...], partners: [ … ]  } }
и выводит в консоль имя (если имени нет, показывать ‘Unknown’) и первые две компании из массива partners:
*/

const getInfo = (data) => {
    let {
        name,
        info: {
            partners: [companyOne, companyTwo]
        }
    } = data;
    if (name === undefined) {
        name = 'Unknown';
        console.log(name);
        console.log(`Partners: ${companyOne} ${companyTwo}`);
    } else {
        console.log(`Name:  ${name}`);
        console.log(`Partners: ${companyOne} ${companyTwo}`);
    }
};

const organisation = {
    name: 'Google',
    info: {
        employees: ['Vlad', 'Olga'],
        partners: ['Microsoft', 'Facebook', 'Xing']
    }
};

getInfo(organisation);

/*------------------------Example 2.1-----------------------*/

// Переделать функцию с использованием функции-стрелки (в методе reduce тоже использовать arrow function):

const sum = (...args) => {
    if (!args.length) return 0;
    return args.reduce((prev, next) => {
        return prev + next;
    });
};

sum(1, 2, 3, 4); // 10
sum(); // 0

/*------------------------Example 3.1-----------------------*/
/*Создать две функции и дать им осмысленные названия:
- первая функция принимает массив и колбэк (одна для всех вызовов)
- вторая функция (колбэк) обрабатывает каждый элемент массива (для каждого вызова свой callback)

Первая функция возвращает строку “New value: ” и результат обработки:

firstFunc([‘my’, ‘name’, ‘is’, ‘Trinity’], handler1) → “New value: MyNameIsTrinity”
firstFunc([10, 20, 30], handler2) → “New value: 100, 200, 300,”
firstFunc([{age: 45, name: ‘Jhon’}, {age: 20, name: ‘Aaron’}], handler3) →
“New value: Jhon is 45, Aaron is 20,”
firstFunc([‘abc’, ‘123’], handler4) → “New value: cba, 321,” // строки инвертируются*/

const result = (data, callback) => {
    callback(data);
    return `New value: ${callback(data)}`
};

const joinArray = array => {
    const arr = [];
    array.forEach(item => {
        arr.push(item.charAt(0).toUpperCase() + item.slice(1))
    });
    return arr.join('');
};

const newValue = array => {
    return array.map(x => x * 10).join(', ');
};

const userInfo = array => {
    const arr = [];

    array.forEach(item => {
        if (item.hasOwnProperty('name') && item.hasOwnProperty('age')) {
            arr.push(`${item.name} is ${item.age}`)
        } else {
            console.log('Не корректный юзер!');
        }
    });
    console.log(arr.join(', '));
    return arr.join(', ');
};

const invertString = array => {
    const arr = [];
    array.forEach(item => {
        arr.push(item.split('').reverse().join(''))
    });
    return arr.join(', ')
};

result(['my', 'name', 'is', 'Trinity'], joinArray)
result([10, 20, 30], newValue);
result([{
    age: 45,
    name: 'Jhon'
}, {
    age: 20,
    name: 'Aaron'
}], userInfo);
result(['abc', '123'], invertString);

/*------------------------Example 3.2-----------------------*/
/*
Написать аналог метода every.
Создайте функцию every, она должна принимать первым аргументом массив чисел
(обязательно проверьте что передан массив) вторым аргументом callback (обязательно проверьте что передана функция)
функция должна возвращать true или false в зависимости от результата вызова callback (проверить число больше 5).
Callback  должен принимать один элемент массива, его индекс в массиве и весь массив.
*/

const every = (arr, callback) => {
    if (Array.isArray(arr) && typeof callback == 'function') {
        const newArr = []
        for (let i = 0; i < arr.length; i++) {
            newArr.push(callback(arr[i], arr.indexOf(arr[i]), arr));
        }
        for (var i = 0; i < newArr.length - 1; i++) {
            if (newArr[i] !== newArr[i + 1]) {
                return false;
            }
        }
        return true;
    } else {
        if (Array.isArray(arr) === false) {
            return alert(`Передаваемый аргумент ${arr} не является массивом`);
        } else {
            return alert(`Передаваемый аргумент ${callback} не является функцией`);
        }
    }
};

const condition = (el, item, arr) => {
    return el > 5;
};

console.log(every([6, 12, 10, 30, 44, 1], condition));
every([6, 12, 10, 30, 44, 1], condition);
