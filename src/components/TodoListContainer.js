import React, {useEffect, useCallback} from 'react'
import TodoItem from './TodoItem'
import { observer } from "mobx-react"
import {StoreContext} from '../StoreContext'
import AppHeading from './AppHeading.js'
import {Button, Grid} from '@material-ui/core'

const TodoListContainer = observer(() => {
	const store = React.useContext(StoreContext)

	const handleChange = (todo) => {
		todo.completed = !todo.completed
	}

	const handleDelete = (todo) => {
        todo.delete()
	}

	const handleLoadMore = () => {
		store.pageNumber++
	}

	useEffect(() => {		
		console.log('useEffect' + store.pageNumber)
		store.loadTodos()
	}, [store.pageNumber])
	
	const todosListItens = store.todos.map ((item) => {
		return <TodoItem
				key={item._id}
				todo={item}
				handleChange={handleChange}
				handleDelete={handleDelete}/>
	})	

	const renderLoadMore = () => {
		if(!store.hasMore){
			return
		}
		return (
			<Grid item xs={12}>
				<Button
					variant="contained"                                
					onClick={handleLoadMore}>
					Load more
				</Button>
			</Grid>
		)
	}	
	return (
			<>
				<AppHeading text="My todos" />
				{todosListItens}		

				{renderLoadMore()}
			</>
		)
})

export default TodoListContainer