import React, {useEffect} from 'react';
import TodoItem from './TodoItem'
import { observer } from "mobx-react"
import {StoreContext} from '../StoreContext'
import AppHeading from './AppHeading.js'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

const TodoList = observer(() => {
	const store = React.useContext(StoreContext);
	//const todos =  store.getTodos;
	const isLoading = store.isLoading;

	const handleChange = (todo) => {
		todo.completed = !todo.completed
	}

	const handleDelete = (todo) => {
        todo.delete()
	}

	const handleLoadMore = () => {
		console.log(store.pageNumber)
		store.pageNumber++
		console.log(store.pageNumber)
	}

	useEffect(() =>{		
		store.loadTodos()
	}, [store, store.pageNumber])
	
	const todosListItens = store.todos.map ((item) => {

		return <TodoItem
				key={item._id}
				todo={item}
				handleChange={handleChange}
				handleDelete={handleDelete}/>
	})	

	console.log('render lista +  ' +isLoading)
	return (
			<>
				<AppHeading text="My todos" />
				{todosListItens}		

				<Grid item xs={12}>
					<Button
						variant="contained"                                
						onClick={handleLoadMore}>
						Load more
					</Button>
				</Grid>
			</>
		);
})

export default TodoList;