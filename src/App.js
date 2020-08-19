import React from 'react'
import NavBar from './components/NavBar'
import TodoListContainer from './components/TodoListContainer'
import TodoFormContainer from './components/TodoFormContainer'
import Container from '@material-ui/core/Container'
import {StoreProvider} from './StoreContext'

const App = () => {
	return (
		<StoreProvider>
			<NavBar />
			<Container maxWidth="md" mb={50}>
				<TodoFormContainer/>
				<TodoListContainer/>			  			
			</Container>
		</ StoreProvider>
		)
}

export default App