import React from 'react'
import AppHeading from './AppHeading'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import Tooltip from '@material-ui/core/Tooltip'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import { CardContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {StoreContext} from '../StoreContext'
import { observer } from "mobx-react"

const useStyles = makeStyles(() => ({
    textRight: {
      textAlign: "right"
    },
  }))

const TodoForm = observer(() => {
    const classes = useStyles()
    const store = React.useContext(StoreContext);
    
    const handleSubmit = (event) =>{
        event.preventDefault()
         
        handleAddTodo()
    }    

    const handleAddTodo = () => {
        if(store.newContentTodo === '') {
            return
        }

        let newTodo = store.createTodo()
        newTodo.task = store.newContentTodo
        store.newContentTodo = ''
    }

    const handleChange = (event) =>{
        const {value} = event.target        
        store.newContentTodo = value
    }

    const renderFormGrid = () => {
        return (
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
    }

    const renderActionGrid= () => {
        return (
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
        )
    }

    return(
        <div>
            <AppHeading text="New todo" />
            <Card>
                <CardContent>
                    <Grid container spacing={4}>
                        {renderFormGrid()}
                        {renderActionGrid()}
                    </Grid>                
                </CardContent>
            </Card>
        </div>        
    )
})

export default TodoForm