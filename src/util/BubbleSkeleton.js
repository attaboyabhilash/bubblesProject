import React, { Fragment } from 'react'
import BlankProfile from '../blank-profile.png'
import PropTypes from 'prop-types'
//MUI Stuff
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import withStyles from '@material-ui/core/styles/withStyles'

const styles = {
    card:{
        display: 'flex',
        marginBottom: 20,
    },
    content:{
        width: '100%',
        flexDirection: 'column',
        padding: 25
    },
    cover: {
        width: 50,
        height: 50,
        margin: 15,
        minWidth: 50,
        minHeight: 50
    },
    handle: {
        width: 100,
        height: 20,
        background: '#00FFFF',
        marginBottom: 5
    },
    date: {
        width: 100,
        height: 20,
        background: '#EEE',
        marginBottom: 20
    },
    fullLine: {
        height: 20,
        width: '100%',
        background: 'rgba(0,0,0,0.2)',
        marginBottom: 10
    },
    halfLine: {
        height: 20,
        width: '50%',
        background: '#EEE',
        marginBottom: 10
    }
}


const BubbleSkeleton = (props) => {
    const { classes } = props

    const content = Array.from({ length: 5 }).map((item, index) => (
        <Card className={classes.card} key={index}>
            <CardMedia className={classes.cover} image={BlankProfile} />
            <CardContent className={classes.content}>
                <div className={classes.handle} />
                <div className={classes.date} />
                <div className={classes.fullLine} />
                <div className={classes.fullLine} />
                <div className={classes.halfLine} />
            </CardContent>
        </Card>
    ))

    return (
        <Fragment>
            {content}
        </Fragment>
    )
}

BubbleSkeleton.propTypes ={
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(BubbleSkeleton)
