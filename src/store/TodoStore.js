import { observable, decorate, computed, action } from "mobx"
import Todo from '../domains/Todo.js'

export class TodoStore {
    transportLayer
    todos = []
    isLoading = true

    newContentTodo = ''
    pageNumber = 1

    constructor(transportLayer) {
        this.transportLayer = transportLayer // server request maker
        // this.transportLayer.onReceiveTodoUpdate((updatedTodo) =>
        //     this.updateTodoFromServer(updatedTodo)
        // )

        //this.loadTodos()
    }

    /**
     * Fetches todos from the server
     */
    async loadTodos() {
        console.log('loadTodos')
        this.isLoading = true

        const fetchedTodos = await this.transportLayer.fetchTodos(this.pageNumber)
        console.log(fetchedTodos.length)
        fetchedTodos.forEach((json) => this.updateTodoFromServer(json))

        this.isLoading = false
    }

    /**
     * Update a todo with information from the server. Guarantees a todo
     * only exists once. Might either construct a new todo, update an existing one,
     * or remove a todo if it has been deleted on the server.
     */
    updateTodoFromServer(json) {
        var todo = this.todos.find((todo) => todo._id === json._id)

        if (!todo) {
            console.log('11__novo');
            todo = new Todo(this, json._id)
            this.todos.push(todo)
        }

        if (json.isDeleted) {
            console.log('11__removido');
            this.removeTodo(todo)
        } else {
            console.log('11__atualizado');
            todo.updateFromJson(json)
        }
    }

    /**
     * Creates a fresh todo on the client and server
     */
    createTodo() {
        var todo = new Todo(this)
        this.todos.unshift(todo)
        return todo
    }

    /**
     * A todo was somehow deleted, clean it from the client memory
     */
    removeTodo(todo) {
        this.todos.splice(this.todos.indexOf(todo), 1)
        todo.dispose()
    }

    get getTodos() {
        // console.log('getTodos')
        // const limit = 5
        // const page = (this.pageNumber) || 1
        // let skip = (limit * (page - 1))

        // if(skip > this.todos.length){
        //     skip -= this.todos.length 
        // }

        // console.log(this.todos.length, skip, (skip + limit))
        // return this.todos.slice(skip, (skip + limit))
    }
}

decorate(TodoStore, {
    todos: observable,
    isLoading:  observable,
    newContentTodo: observable,
    pageNumber: observable,
    getTodos: computed,
    removeTodo: action,
    createTodo: action
  })
  