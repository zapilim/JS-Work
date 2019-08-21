const tasks = [
    {
        _id: '5d2ca9e2e03d40b326596aa7',
        completed: false,
        body:
            'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. ' +
            'Exercitation commodo culpa in veniam proident laboris in. ' +
            'Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. ' +
            'Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
        title: 'Eu ea incididunt sunt consectetur fugiat non.',
    },
    {
        _id: '5d2ca9e29c8a94095c4e88e0',
        completed: true,
        body:
            'Aliquip cupidatat ex adipisicing veniam do tempor.' +
            'Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. ' +
            'Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. ' +
            'Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
        title:
            'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
    },
    {
        _id: '5d2ca9e29c8a94095c4e488e0',
        completed: false,
        body:
            'Aliquip cupidatat ex adipisicing veniam do tempor.' +
            'Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. ' +
            'Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. ' +
            'Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
        title:
            'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
    },
    {
        _id: '5d2ca9e29c8a940953c4e88e0',
        completed: true,
        body:
            'Aliquip cupidatat ex adipisicing veniam do tempor.' +
            'Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. ' +
            'Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. ' +
            'Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
        title:
            'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
    },
];

(function (arrOfTasks) {

        const objofTasks = arrOfTasks.reduce((acc, task) => {
            acc[task._id] = task;
            return acc
        }, {});

        const tasksList = document.querySelector('.tasks-list-section .list-group');
        const form = document.forms['addTask'];
        const inputTitle = form.elements['title'];
        const inputBody = form.elements['body'];
        const errorMassage = document.createElement('div');
        errorMassage.textContent = 'Нет текущих задач';
        errorMassage.classList.add('alert', 'alert-danger', 'alert-noTasks');

        form.addEventListener("submit", onFormSubmitHandler);
        tasksList.addEventListener("click", onDeleteHandler);

        renderTasks();

        function renderTasks() {
            const sortTasks = Object.values(objofTasks).sort((a, b) => (
                a.completed - b.completed
            ));
            const fragment = document.createDocumentFragment();
            sortTasks.forEach(task => {
                const li = listItemTamplate(task);
                fragment.appendChild(li);
                const dataCompleted = li.getAttribute('data-task-completed');
                if (dataCompleted === 'true') {
                    li.style.background = '#eafff5';
                }
            });
            tasksList.appendChild(fragment);
            createErrorNoTasks();
        }

        function listItemTamplate(task) {

            const li = document.createElement('li');
            li.classList.add('list-group-item', 'd-flex', 'align-items-center', 'flex-wrap');
            li.setAttribute('data-task-id', task._id);
            li.setAttribute('data-task-completed', task.completed || false);

            const span = document.createElement('span');
            span.textContent = task.title;
            span.style.fontWeight = 'bold';
            span.classList.add('col', 'row');

            const article = document.createElement(('p'));
            article.textContent = task.body;
            article.style.width = '100%';
            article.classList.add('mt-2');

            const buttonBox = document.createElement('div');
            buttonBox.classList.add('ml-auto');

            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('btn', 'btn-danger', 'ml-auto', 'delete-btn');
            deleteBtn.textContent = 'Delete';

            const doneBtn = document.createElement('button');
            doneBtn.classList.add('btn', 'btn-success', 'done-btn', 'mr-1');
            doneBtn.textContent = 'Done';

            li.appendChild(span);
            li.appendChild(buttonBox);

            buttonBox.appendChild(doneBtn);
            buttonBox.appendChild(deleteBtn);
            li.appendChild(article);
            return li;
        }

        function onFormSubmitHandler(e) {
            e.preventDefault();
            const titleValue = inputTitle.value;
            const titleBody = inputBody.value;
            if (!titleValue || !titleBody) {
                alert('Введите title и body');
                return;
            }
            const task = createNewTask(titleValue, titleBody);
            const listItem = listItemTamplate(task);

            tasksList.insertAdjacentElement('afterbegin', listItem);

            form.reset();
            createErrorNoTasks();
        }

        function createNewTask(title, body) {
            const newTask = {
                title,
                body,
                completed: false,
                _id: `task-${Math.random()}`
            };

            objofTasks[newTask._id] = newTask;
            return {...newTask}
        }

        function onDeleteHandler(e) {
            const {target} = e;
            if (target.classList.contains('delete-btn')) {
                const parent = target.closest('[data-task-id]');
                const id = parent.dataset.taskId;
                parent.remove();
                delete objofTasks[id];
                createErrorNoTasks()
            }
        }

        //Если массив с задачами пустой то под формой нужно выводить сообщение об этом, также это же сообщение нужно выводить если вы удалите все задачи.

        function createErrorNoTasks() {
            const tasksCount = tasksList.childElementCount;
            if (objofTasks.length === 0 || tasksCount === 0) {
                tasksList.insertAdjacentElement('beforebegin', errorMassage);
            }
            if (tasksCount !== 0) {
                errorMassage.remove();
            }
        }

        // В каждый элемент li добавить кнопку которая будет делать задачу выполненой. завершенные задачи должны быть подсвечены любым цветом.

        tasksList.addEventListener("click", onDoneTask);

        function onDoneTask(e) {
            const {target} = e;
            if (target.classList.contains('done-btn')) {
                const parent = target.closest('[data-task-completed]');
                const id = parent.dataset.taskId;
                const completed = parent.dataset.taskCompleted;
                if (completed === 'false') {
                    parent.style.background = '#eafff5';
                    parent.setAttribute("data-task-completed", "true");
                    objofTasks[id].completed = true;
                }
                if (completed === 'true') {
                    parent.style.background = 'transparent';
                    parent.setAttribute("data-task-completed", "false");
                    objofTasks[id].completed = false;
                    tasksList.innerHTML = '';
                    renderTasks();
                }
                const unCompleted = document.querySelector('.unCompleted');
                if (unCompleted) {
                    parent.remove();
                    tasksList.innerHTML = '';
                    renderTasks();
                }
                if (!unCompleted) {
                    tasksList.innerHTML = '';
                    renderTasks();
                }

            }
        }

        //Добавить функционал отображения незавершенных задач и всех задач.
        // т.е у вас будет две кнопки над таблицей 1-я "показать все задачи" и 2-я "показать незавершенные задачи",
        // определить завершена задача или нет можно по полю completed в объекте задачи.
        // По умолчанию при загрузке отображаются все задачи.

        renderButtonCheck();

        function renderButtonCheck() {

            const checkButtonBox = document.createElement('div');
            checkButtonBox.classList.add('col', 'text-center', 'mb-3', 'checkerBox');

            const btnAllTask = document.createElement('button');
            btnAllTask.classList.add('btn', 'btn-secondary', 'all-btn', 'm-1');
            btnAllTask.textContent = 'All tasks';

            const btnNotCompletedTask = document.createElement('button');
            btnNotCompletedTask.classList.add('btn', 'btn-warning', 'notCompleted-btn', 'm-1');
            btnNotCompletedTask.textContent = 'Not completed tasks';

            tasksList.insertAdjacentElement('beforebegin', checkButtonBox);

            checkButtonBox.appendChild(btnAllTask);
            checkButtonBox.appendChild(btnNotCompletedTask);

        }

        const buttonBox = document.querySelector('.checkerBox');
        buttonBox.addEventListener("click", onSortTasks);

        function onSortTasks(e) {
            const {target} = e;
            const ul = document.querySelector('.list-group');
            if (target.classList.contains('notCompleted-btn')) {
                const fragment = document.createDocumentFragment();
                const filterCompleted = Object.values(objofTasks).filter(x => x.completed === false);
                ul.classList.add('unCompleted');
                tasksList.innerHTML = '';
                filterCompleted.forEach(task => {
                    const li = listItemTamplate(task);
                    fragment.appendChild(li);
                });
                tasksList.appendChild(fragment);
            } else if (target.classList.contains('all-btn')) {
                ul.classList.remove('unCompleted');
                tasksList.innerHTML = '';
                renderTasks();
            }
        }

    }

)(tasks);
