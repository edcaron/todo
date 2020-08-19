import { observable, decorate, reaction, computed } from "mobx"

export default class Todo {
    _id = null

    completed = false
    task = ""

    store = null

     /**
     * Indicates whether changes in this object
     * should be submitted to the server
     */
    autoSave = true

    /**
     * Disposer for the side effect that automatically
     */
    saveHandler = null

    constructor(store, _id = '') {
        this.store = store
        this._id = _id

        this.saveHandler =  reaction(
            // observe everything that is used in the JSON:
            () => this.asJson,
            // if autoSave is on, send json to server
            async (json) => {
                if (this.autoSave) {
                    const createdId = await this.store.transportLayer.saveTodo(json)

                    if(createdId){
                        this._id = createdId
                    }
                }
            }
        )
    }

    /**
     * Remove this todo from the client and server
     */
    delete = async () => {
        const isDeleted = await this.store.transportLayer.deleteTodo(this._id)

        if(isDeleted){
            this.store.removeTodo(this)
        }
    }

    get asJson() {
        return {
            _id: this._id,
            completed: this.completed,
            task: this.task
        }
    }

    /**
     * Update this todo with information from the server
     */
    updateFromJson(json) {
        this.autoSave = false // make sure our changes aren't sent back to the server
        this.completed = json.completed
        this.task = json.task
        this.autoSave = true
    }

    dispose() {
        // clean up the observer
        this.saveHandler()
    }
}

decorate(Todo, {
    completed: observable,
    task:  observable,
    _id: observable,
    asJson: computed
  })