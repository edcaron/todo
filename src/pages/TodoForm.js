import React, {useCallback} from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import {StoreContext} from '../StoreContext'
import { observer } from "mobx-react"

const TodoForm = observer((props) => {
    const store = React.useContext(StoreContext)
    
    const handleChange =  useCallback((event) => {
        const {value} = event.target        
        store.newContentTodo = value
    }, [store])

    return(
        <form onSubmit={props.handleSubmit} style={{"display":"flex"}}>
            <Grid item xs={8} md={10}>
                <TextField
                    placeholder="Description"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    onChange={handleChange}
                    value={store.newContentTodo}
                    required={true}
                    autoFocus={true}
                    />    
            </Grid>
            {props.children}
        </form>
    )
})

export default TodoForm