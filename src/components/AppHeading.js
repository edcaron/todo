import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles(() => ({
    root: {
        marginTop: 20,
        marginBottom: 10
    }
}))

const AppHeading = ({text}) => {
    const classes = useStyles()

    return (
        <Typography 
            component="h1"
            className={classes.root}
        >
        {text}
        </Typography>
    )
}

export default AppHeading