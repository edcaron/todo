import React from 'react'
import { observer } from "mobx-react"
import AppHeading from './AppHeading'
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
    
    const handleAddTodo = () => {
        if(store.newContentTodo === '') {
            return
        }

        let newTodo = store.createTodo()
        newTodo.task = store.newContentTodo
        store.newContentTodo = ''
    }

    return(
        <div>
            <AppHeading text="New todo" />
            <Card>
                <CardContent>
                    <Grid container spacing={4}>
                        <TodoForm handleAddTodo={handleAddTodo}/>
                        <Grid item xs={4} md={2} className={classes.textRight}>
                            <Tooltip title="Add todo">
                                <Button
                                    variant="contained"
                                    color="primary"                                    
                                    onClick={handleAddTodo}
                                    startIcon={<AddIcon />}>
                                    Add
                                </Button>
                            </Tooltip>
                        </Grid>
                    </Grid>                
                </CardContent>
            </Card>
        </div>        
    )
})

export default TodoFormContainer