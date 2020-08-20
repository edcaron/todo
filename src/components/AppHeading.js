import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles(() => ({
    root: {
        marginTop: 20,
        fontSize: 17
    }
}))

const AppHeading = ({text}) => {
    const classes = useStyles()

    return (
        <Typography 
            component="h1"
            variant="overline"
            className={classes.root}
        >
        {text}
        </Typography>
    )
}

export default AppHeading