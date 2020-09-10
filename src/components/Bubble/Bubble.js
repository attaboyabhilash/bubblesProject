import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import withStyles from '@material-ui/core/styles/withStyles' 
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types'
import MyButton from '../../util/MyButton'
import DeleteBubble from './DeleteBubble'
import BubbleDialog from './BubbleDialog'
import LikeButton from './LikeButton'
//MUI elements
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
//Redux
import { connect } from 'react-redux'

//Icons
import ChatIcon from '@material-ui/icons/Chat'


const styles = {
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 10,
    },
    image: {
        width: 50,
        height: 50,
        margin: 15,
        minWidth: 50,
        minHeight: 50
    },
    content: {
        padding: '17px 15px 17px 0px'
    },
    body: {
        margin: '20px 0px'
    }
}

class Bubble extends Component {

    render() {
        dayjs.extend(relativeTime)
        const { classes, 
                bubble: { body, createdAt, userImage, userHandle, bubbleId, likeCount, commentCount },
                user: { authenticated, credentials: { handle } } 
            } = this.props
        
        const deleteButton = authenticated && userHandle === handle ? (
            <DeleteBubble bubbleId={bubbleId} />
        ) : null
        return (
            <Card className={classes.card}>
                <CardMedia image={userImage} title="profile image" className={classes.image} />
                <CardContent className={classes.content}>
                    <Typography variant="body1" component={Link} to={`/users/${userHandle}`} color="secondary">@{userHandle}</Typography>
                    {deleteButton}
                    <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                    <Typography variant="h5" className={classes.body}>{body}</Typography>
                    <LikeButton bubbleId={bubbleId} /> <span>{likeCount} Likes</span>
                    <MyButton tip="Comments">
                        <ChatIcon color="secondary" />
                    </MyButton>
                    <span>{commentCount} Comments</span>
                    <BubbleDialog bubbleId={bubbleId} userHandle={userHandle} openDialog={this.props.openDialog} />
                </CardContent>
            </Card>
        )
    }
}

Bubble.propTypes = {
    user: PropTypes.object.isRequired,
    bubble: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(withStyles(styles)(Bubble))
