import React, {useCallback} from 'react'
import { observer } from "mobx-react"
import AppHeading from '../components/AppHeading'
import TodoForm from './TodoForm'
import {StoreContext} from '../StoreContext'
import {Grid, Card, Tooltip, Button, CardContent, makeStyles} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles(() => ({
    textRight: {
      textAlign: "right"
    },
}))

const TodoFormContainer = observer(() => {
    const classes = useStyles()
    const store = React.useContext(StoreContext)
    const newContentTodo = store.newContentTodo

    const handleAddTodo = useCallback(() => {
        if(store.newContentTodo === '') {
            return
        }

        let newTodo = store.createTodo()
        newTodo.task = store.newContentTodo
        store.newContentTodo = ''
    }, [newContentTodo])

    const handleSubmit = useCallback((event) =>{
        event.preventDefault()
         
        handleAddTodo()
    }, [handleAddTodo])   
    
    return(
        <>
            <AppHeading text="New todo" />
            <Card>
                <CardContent>                    
                    <TodoForm handleSubmit={handleSubmit} >
                        <Grid item xs={4} md={2} className={classes.textRight}>
                            <Tooltip title="Add todo">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"                                    
                                    startIcon={<AddIcon />}>
                                    Add
                                </Button>
                            </Tooltip>
                        </Grid>
                    </TodoForm>         
                </CardContent>
            </Card>
        </>        
    )
})

export default TodoFormContainer