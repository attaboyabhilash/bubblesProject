import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
//MUI Stuff
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'


const styles = {
    commentImage:{
        width: 50,
        height: 50,
        marginTop: 10
    },
    invisible: {
        border: 'none',
        margin: 5
    },
    visible: {
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 10,
        marginTop: 10
    }
}

class Comments extends Component{
    render(){
        const { comments, classes } = this.props
        return(
            <Grid container>
                {comments.map((comment, index) => {
                    const { body, createdAt, userImage, userHandle } = comment
                    return (
                        <Fragment key={createdAt}>
                            <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={2}>
                                        <img src={userImage} alt="comment-profile" className={classes.commentImage} />
                                    </Grid>
                                    <Grid item sm={9}>
                                        <div className={classes.commentData}>
                                            <Typography variant="body1" component={Link} to={`/users/${userHandle}`} color="secondary">
                                                {userHandle}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {dayjs(createdAt).format('h:mm a, MMM DD YYYY')}
                                            </Typography>
                                            <hr className={classes.invisible} />
                                            <Typography variant="body1">
                                                {body}
                                            </Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {index !== comments.length - 1 && (<hr className={classes.visible} />)}
                        </Fragment>
                    )
                })}
            </Grid>
        )
    }
}

Comments.propTypes = {
    classes: PropTypes.object.isRequired,
    comments: PropTypes.array.isRequired
}

export default withStyles(styles)(Comments)