import { observable, decorate } from "mobx"
import Todo from '../domains/Todo.js'

export default class TodoStore {
    transportLayer
    todos = []
    isLoading = true

    newContentTodo = ''
    pageNumber = 1
    hasMore = false

    constructor(transportLayer) {
        this.transportLayer = transportLayer //does server requests
    }

    /**
     * Fetches todos from the server
     */
    async loadTodos() {
        this.isLoading = true

        const fetchedTodos = await this.transportLayer.fetchTodos(this.pageNumber)

        this.updateTodos(fetchedTodos.data)

        this.hasMore = fetchedTodos.hasMore

        this.isLoading = false
    }

    /**
     * fill the state with objects from array
     */
    updateTodos(array){
        let newTodos = []

        array.forEach((json) => {
            let todo = this.todos.find((todo) => todo._id === json._id)

            if (!todo) {
                todo = new Todo(this, json._id)
                todo.updateFromJson(json)

                newTodos.push(todo)
            } 
            else if (todo.isDeleted) {
                this.removeTodo(todo)
            } else {
                todo.updateFromJson(todo)
            }  
        })

        this.todos.replace(this.todos.concat(newTodos))
    }

    /**
     * add new todo to list
     */
    createTodo() {
        var todo = new Todo(this)
        this.todos.unshift(todo)

        return todo
    }

    /**
     * when todo is deleted, clean it from the client memory
     */
    removeTodo(todo) {
        this.todos.splice(this.todos.indexOf(todo), 1)
        todo.dispose()

        this.loadTodos()
    }
}

decorate(TodoStore, {
    todos: observable,
    isLoading:  observable,
    hasMore:  observable,
    newContentTodo: observable,
    pageNumber: observable
  })
  