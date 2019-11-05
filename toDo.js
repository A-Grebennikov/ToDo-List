let toDoItems = [];
const color = ['red', 'green', 'blue', 'yellow'];

const ul = document.getElementById("ul"); // список
const input = document.getElementById("123"); // поле ввода
const container = document.getElementById("container"); // блок с toDo
const colorButton = document.getElementById("colorButton"); // блок с кнопками

let groupButtons = [{ type: "button", className: "check-task btn", caseName: "check-task", value: "check" },
{ type: "button", className: "delete-task btn", caseName: "delete-task", value: "del" },
{ type: "button", className: "redbtn btn", caseName: "redbtn", value: null },
{ type: "button", className: "greenbtn btn", caseName: "greenbtn", value: null },
{ type: "button", className: "bluebtn btn", caseName: "bluebtn", value: null },
{ type: "button", className: "yellowbtn btn", caseName: "yellowbtn", value: null }];

let singleButtons = [{ type: "button", className: "delete-task btn", caseName: "delete", value: "del" },
{ type: "button", className: "check-task btn", caseName: "check", value: "check" },
{ type: "button", className: "redbtn btn", caseName: "red", value: null },
{ type: "button", className: "greenbtn btn", caseName: "green", value: null },
{ type: "button", className: "bluebtn btn", caseName: "blue", value: null },
{ type: "button", className: "yellowbtn btn", caseName: "yellow", value: null }];

function createGroupButton() {
    groupButtons.map((item) => {
        let name = document.createElement("input");
        name.value = item.value;
        name.type = item.type;
        name.className = item.className;
        name.onclick = function (e) {
            buttonForGroupTasks(e, `${item.caseName}`);
        }
        colorButton.prepend(name);
    })
}
createGroupButton();

function randomColor(arr) {
    let clr = Math.floor(Math.random() * arr.length);
    return arr[clr];
}

function addToDo(task) {
    const toDo = {
        task,
        complete: false,
        id: Date.now(),
        color: randomColor(color),
        flag: false,
        checked: '',
    };
    toDoItems.push(toDo);
    createlist(toDoItems);
}

const form = document.getElementsByClassName('newToDo')[0]; // добавление объекта в массив по нажатию enter
form.addEventListener('keypress', event => {
    text = input.value
    if (event.key === "Enter" && text !== '') {
        addToDo(form.value)
        form.value = '';
    }
});

function createlist(arr) {
    let listToDelete = document.getElementsByTagName('ul')[0];
    listToDelete.innerHTML = "";
    for (let i = 0; i < arr.length; i++) {

        const li = document.createElement("li");
        li.className = `todo-id ${arr[i].color}`;
        ul.prepend(li);

        const divLeft = document.createElement("div");
        divLeft.className = "left";
        li.prepend(divLeft);

        const divRight = document.createElement("div");
        divRight.className = "right";
        li.append(divRight);

        const checkbox = document.createElement("input"); // checkbox
        checkbox.type = "checkbox";
        checkbox.checked = `${arr[i].checked}`;
        checkbox.className = "check-task btn";
        checkbox.id = `${arr[i].id}`;
        checkbox.onclick = function flag(e) {
            toDoItems.map((item) => {
                (item.id == e.target.id && item.checked == '') ? (item.flag = !item.flag, item.checked = '1') :
                    (item.id == e.target.id && item.checked == '1') ? (item.flag = !item.flag, item.checked = '') : null;
            })
        }
        divLeft.prepend(checkbox);

        const outputText = document.createElement("span");  // окружение текста
        outputText.dataset.key = `${arr[i].complete}`;
        divLeft.append(outputText);

        let textnode = document.createTextNode(`${arr[i].task}`); // сам текст
        outputText.prepend(textnode);

        function createSingleButtons() {
            singleButtons.map((item) => {
                let name = document.createElement("input");
                name.value = item.value;
                name.type = item.type;
                name.className = item.className;
                name.id = `${item.caseName + arr[i].id}`;
                name.onclick = function (e) {
                    buttonForSingleTask(e, item.caseName);
                }
                divRight.prepend(name);
            })
        }
        createSingleButtons();
    }
}

function buttonForGroupTasks(e, r) {
    toDoItems.map((item) => {
        switch (r) {
            case 'check-task':
                item.flag && (item.complete = !item.complete);
                break;
            case 'delete-task':
                item.flag && (toDoItems = toDoItems.filter(item => !item.flag));
                break;
            case 'redbtn':
                item.flag && (item.color = 'red');
                break;
            case 'greenbtn':
                item.flag && (item.color = 'green');
                break;
            case 'bluebtn':
                item.flag && (item.color = 'blue');
                break;
            case 'yellowbtn':
                item.flag && (item.color = 'yellow');
                break;
        }
    })
    createlist(toDoItems);
}

function buttonForSingleTask(e, r) {
    toDoItems.map((item) => {
        console.log('item', item);
        console.log('target', e.target);
        switch (r) {
            case 'check':
                'check' + item.id == e.target.id && (item.complete = !item.complete);
                break;
            case 'delete':
                'delete' + item.id == e.target.id && (toDoItems.splice(toDoItems.indexOf(item), 1));
                break;
            case 'red':
                'red' + item.id == e.target.id && (item.color = 'red');
                break;
            case 'green':
                'green' + item.id == e.target.id && (item.color = 'green');
                break;
            case 'blue':
                'blue' + item.id == e.target.id && (item.color = 'blue');
                break;
            case 'yellow':
                'yellow' + item.id == e.target.id && (item.color = 'yellow');
                break;
        }
    })
    createlist(toDoItems);
}