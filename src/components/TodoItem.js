import React from 'react'
import AppDialog from './AppDialog.js'
import {makeStyles, Typography, Card, CardHeader, IconButton, Button, FormControlLabel, Checkbox, Tooltip} from '@material-ui/core'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import DeleteIcon from '@material-ui/icons/Delete'
import DoneIcon from '@material-ui/icons/Done'
import { observer } from "mobx-react"

const useStyles = makeStyles(() => ({
    root: {
        maxWidth: '100%',    
        marginBottom: 10
    },
    checkbox: {
        marginRight: 20
    },
    statusDefault: {},
    statusDone: {
        fontStyle: 'italic',
        textDecoration: 'line-through',
        color: '#999'
    },
    avatar: {
        flexShrink: 1,
        wordWrap: 'anywhere'
    },
    cardHeader:{
        padding: "8px 16px"
    }
}))

const TodoItem = observer(({todo, handleChange, handleDelete}) => {
    const classes = useStyles()
    
    const [open, setOpen] = React.useState(false)

    const handleDeleteClick = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const renderLabel = () => {
        const statusClassName = todo.completed ? classes.statusDone : classes.statusDefault
        return (
            <FormControlLabel 
                control={
                    <Checkbox
                        icon={<CheckBoxOutlineBlankIcon />}
                        checkedIcon={<DoneIcon />}
                        checked={todo.completed}
                        onChange={() => handleChange(todo)}
                        color="primary"
                    />
                }
                label={
                    <Typography 
                        component="div"
                        className={statusClassName}>
                        {todo.task}
                    </Typography>
                }
            />
        )
    }

    return (
        <Card className={classes.root}>
            <AppDialog 
                open={open}
                handleClose={handleClose}
                title="Do you really want to delete?"
                children={
                    <Button
                        onClick={() => handleDelete(todo)}
                        color="primary">
                        Yes
                    </Button>
                }
            />
            <CardHeader 
                className={classes.cardHeader}
                classes={{avatar: classes.avatar}}
                avatar={renderLabel()}
                action={
                    <Tooltip title="Delete">
                        <IconButton onClick={handleDeleteClick}>
                            <DeleteIcon />
                        </IconButton>   
                    </Tooltip>
                    }
                />        
        </Card>
    )
})

export default TodoItem