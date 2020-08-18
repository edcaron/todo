const SERVER_URI = 'http://localhost:5000';

export default class TodoTransport {
 
    onReceiveTodoUpdate = () => {
        console.log('onReceiveTodoUpdate')
    }

    fetchTodos = async (pageNumber) =>{
        console.log('fetchTodos')
        try {
            const api_call = await fetch(`${SERVER_URI}/todos/${pageNumber}`)

            const data = await api_call.json();
            console.log(data);

            return data;
        } catch (error) {
            console.error(error)   
            return []
        }
    }

    saveTodo = async (json) =>{
        console.log('saveTodo', json)

        const action = !json._id ? 'add' : `update/${json._id}`

        try {
            const api_call = await fetch(`${SERVER_URI}/todos/${action}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(json),
            })
            const data =  await api_call.json();

            // return data._id;
        } catch (error) {
            console.error(error)   
            return false
        }
    }

    deleteTodo = async (id) =>{
        console.log('delete id ' +id)

        try {
            const api_call = await fetch(`${SERVER_URI}/todos/${id}`,{
                method: 'DELETE'
            })

            const data = await api_call.json();
            console.log(data);

            return data;
        } catch (error) {
            console.error(error)   
            return []
        }
    }
}

