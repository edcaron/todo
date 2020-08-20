import React, {useEffect, useCallback} from 'react'
import TodoItem from '../components/TodoItem'
import { observer } from "mobx-react"
import {StoreContext} from '../StoreContext'
import AppHeading from '../components/AppHeading.js'
import {Button, Grid, Box} from '@material-ui/core'

const TodoListContainer = observer(() => {
	const store = React.useContext(StoreContext)

	const handleChange = useCallback((todo) => {
		todo.completed = !todo.completed
	}, [])

	const handleDelete = useCallback((todo) => {
        todo.delete()
	}, [])

	const handleLoadMore = useCallback(() => {
		store.pageNumber++
	}, [store.pageNumber])

	useEffect(() => {		
		store.loadTodos()
	}, [store.pageNumber])
	
	const todosListItens = store.todos.map ((item) => {
		return <TodoItem
				key={item._id}
				todo={item}
				handleChange={handleChange}
				handleDelete={handleDelete}/>
	})	

	const renderLoadMore = useCallback(() => {
		if(store.hasMore){
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
	}, [store.hasMore, handleLoadMore])

	return (
			<Box mb={20}>
				<AppHeading text="My todos" />
				{todosListItens}		

				{renderLoadMore()}
			</Box>
		)
})

export default TodoListContainer