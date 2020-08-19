const SERVER_URI = 'http://localhost:5000'

export default class TodoTransport {
     fetchTodos = async (pageNumber) =>{
        try {
            const api_call = await fetch(`${SERVER_URI}/todos/${pageNumber}`)

            const data = await api_call.json()

            return data
        } catch (error) {
            console.error(error)
            alert ('Error loading todos, Sorry')
            return []
        }
    }

    saveTodo = async (json) =>{
        try {
            const action = !json._id ? 'add' : `update/${json._id}`
        
            const api_call = await fetch(`${SERVER_URI}/todos/${action}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(json),
            })
            const data =  await api_call.json()

            return data._id
        } catch (error) {
            console.error(error)
            alert ('Error loading todos, Sorry')
            return false
        }
    }

    deleteTodo = async (id) =>{

        try {
            const api_call = await fetch(`${SERVER_URI}/todos/${id}`,{
                method: 'DELETE'
            })

            const data = await api_call.json()

            return data
        } catch (error) {
            console.error(error)
            alert ('Error loading todos, Sorry')
            return []
        }
    }
}

