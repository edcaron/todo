import React from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import {StoreContext} from '../StoreContext'
import { observer } from "mobx-react"

const TodoForm = observer((props) => {
    const store = React.useContext(StoreContext)
    
    const handleSubmit = (event) =>{
        event.preventDefault()
         
        props.handleAddTodo()
    }    

    const handleChange = (event) =>{
        const {value} = event.target        
        store.newContentTodo = value
    }

    return(
        <Grid item xs={8} md={10}>
            <form onSubmit={handleSubmit}>
                <TextField
                    placeholder="description"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    onChange={handleChange}
                    value={store.newContentTodo}
                    />    
            </form>
        </Grid>
    )
})

export default TodoForm