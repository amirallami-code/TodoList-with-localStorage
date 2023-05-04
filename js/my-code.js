let $ = document

const inputElem = $.getElementById('itemInput')
const addButton = $.getElementById('addButton')
const clearButton = $.getElementById('clearButton')
const todoListElem = $.getElementById('todoList')

let todosArray = []

function addNewTodo() {
    let newInputTitle = inputElem.value

    let newTodoObj = {
        id: todosArray.length + 1,
        title: newInputTitle,
        complete: false
    }

    inputElem.value = ''

    todosArray.push(newTodoObj)
    setLocalStorage(todosArray)
    todosGenerator(todosArray)

    inputElem.focus()
}

function setLocalStorage(todosList) {
    localStorage.setItem('todos', JSON.stringify(todosList))
}

function todosGenerator(todosList) {

    let newTodoLiElem, newTodoLabelElem, newTodoCompleteBtn, newTodoDeleteBtn

    todoListElem.innerHTML = ''

    todosList.forEach(function (todo) {
        todoListElem.insertAdjacentHTML('beforeend', '<li class="completed well"><label>' + todo.title + '</label><button class="btn btn-success" onclick="editTodo(' + todo.id + ')">Complete</button><button class="btn btn-danger" onclick="removeTodo(' + todo.id + ')">Delete</button></li>')

        if (todo.complete) {
            newTodoLiElem.className = 'uncompleted well'
            newTodoCompleteBtn.innerHTML = 'UnComplete'
        }
    })
}

function editTodo(todoId) {

    let localStorageTodos = JSON.parse(localStorage.getItem('todos'))

    todosArray = localStorageTodos

    todosArray.forEach(function (todo) {
        if (todo.id === todoId) {
            todo.complete = !todo.complete
        }
    })

    setLocalStorage(todosArray)
    todosGenerator(todosArray)
}

function removeTodo(todoId) {
    let localStorageTodos = JSON.parse(localStorage.getItem('todos'))

    todosArray = localStorageTodos

    let mainTodoIndex = todosArray.findIndex(function (todo) {
        return todo.id === todoId
    })

    todosArray.splice(mainTodoIndex, 1)

    setLocalStorage(todosArray)
    todosGenerator(todosArray)
}

function getLocalStorage() {
    let localStorageTodos = JSON.parse(localStorage.getItem('todos'))

    if (localStorageTodos) {
        todosArray = localStorageTodos
    } else {
        todosArray = []
    }

    todosGenerator(todosArray)
}

function addTodoWithEnter(event) {
    if (event.code === 'Enter') {
        addNewTodo()
    }
}

function clearTodos() {
    todosArray = []
    todosGenerator(todosArray)
    localStorage.removeItem('todos')
}

window.addEventListener('load', getLocalStorage)
clearButton.addEventListener('click', clearTodos)
addButton.addEventListener('click', addNewTodo)
inputElem.addEventListener('keydown', addTodoWithEnter)