import React from 'react';
import NavBar from './components/NavBar'
import TodoList from './components/TodoList'
import TodoForm from './components/TodoForm'
import Container from '@material-ui/core/Container'
import './App.css';
import {StoreProvider} from './StoreContext'

const App = () => {
	return (
		<StoreProvider>
			<NavBar />
			<Container maxWidth="md">
				<TodoForm/>
				<TodoList/>			  			
			</Container>
		</ StoreProvider>
		);
}

export default App