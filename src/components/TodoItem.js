import React from 'react'
import AppDialog from './AppDialog.js'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import DoneIcon from '@material-ui/icons/Done';
import { Typography } from '@material-ui/core'
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

    let statusClassName = todo.completed ? classes.statusDone : classes.statusDefault;

    console.log('renderizou ' + todo._id);
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
                classes={{ avatar: classes.avatar }}
                avatar={renderLabel()}
                action={
                    <Tooltip title="Delete">
                        <IconButton   
                                aria-label="settings"
                                onClick={handleDeleteClick}
                            >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                    }
                />        
        </Card>
    )
})

export default TodoItem