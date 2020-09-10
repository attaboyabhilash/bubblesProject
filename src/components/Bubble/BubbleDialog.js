import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import MyButton from '../../util/MyButton'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import LikeButton from './LikeButton'
import Comments from './Comments'
import CommentForm from './CommentForm'
//MUI Material
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
//Icons
import CloseIcon from '@material-ui/icons/Close'
import UnfoldMore from '@material-ui/icons/UnfoldMore'
import ChatIcon from '@material-ui/icons/Chat'
//Redux Material
import { connect } from 'react-redux'
import { getBubble } from '../../redux/actions/dataActions'

const styles = {
    temp: {
        position: 'relative'
    },
    main: {
        position: 'relative',
        padding: '20px 5px'
    },
    body: {
        marginBottom: 20
    },
    expand: {
        position: 'absolute',
        right: 20
    },
    closeBtn: {
        position: 'absolute',
        margin: '5px 0px 0px 91%',
        color: '#FF0000',
        zIndex: '6'
    },
    image: {
        width: 200,
        height: 200
    },
    invisible: {
        border: 'none',
        margin: 5
    },
    progress: {
        textAlign: 'center',
        margin: '50px 0px'
    },
    visible: {
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginTop: 20,
        marginBottom: 10
    }
}

class BubbleDialog extends Component{
    state = {
        open: false,
        oldPath: '',
        newPath: ''     
    }

    componentDidMount(){
        if(this.props.openDialog){
            this.handleOpen()
        }
    }

    handleOpen = () => {
        let oldPath = window.location.pathname
        const { userHandle, bubbleId } = this.props
        const newPath = `/users/${userHandle}/bubble/${bubbleId}`

        if(oldPath === newPath) oldPath = `/users/${userHandle}`
        window.history.pushState(null, null, newPath)

        this.setState({ open: true, oldPath, newPath })
        this.props.getBubble(this.props.bubbleId)
    }
    handleClose = () => {
        window.history.pushState(null, null, this.state.oldPath)
        this.setState({ open: false })
    }

    render(){
        const { classes, 
                bubble: { bubbleId, body, createdAt, likeCount, commentCount, userImage, userHandle, comments }, 
                UI: { loading }
            } = this.props
        const dialogMarkup = loading ? (
            <div className={classes.progress}>
                <CircularProgress size={75} />
            </div>
        ) : (
            <Grid container spacing={2} className={classes.main}>
                <Grid item sm={5}>
                    <img src={userImage} alt="profile" className={classes.image} />
                </Grid>
                <Grid item sm={7}>
                    <Typography variant="body1" component={Link} to={`/users/${userHandle}`} color="secondary">@{userHandle}</Typography>
                    <Typography variant="body2" color="textSecondary">{dayjs(createdAt).format('h:mm a, MMM DD YYYY')}</Typography>
                    <hr className={classes.invisible} />
                    <Typography variant="h5" className={classes.body}>{body}</Typography>
                    <hr className={classes.invisible} />
                    <div>
                        <LikeButton bubbleId={bubbleId} /><span>{likeCount} Likes</span>
                        <MyButton tip="Comments">
                            <ChatIcon color="secondary" />
                        </MyButton>
                        <span>{commentCount} Comments</span>
                    </div>
                </Grid>
                <hr className={classes.visible} />
                <CommentForm bubbleId={bubbleId} />
                <Comments comments={comments} />
            </Grid>
        )
        return(
            <Fragment>
                <MyButton onClick={this.handleOpen} tip="Expand Bubble" place="right" btnClassName={classes.expand}>
                    <UnfoldMore color="secondary" />
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} maxWidth="sm" className={classes.temp} fullWidth>
                    <MyButton onClick={this.handleClose} tip="Close" place="right" btnClassName={classes.closeBtn}>
                        <CloseIcon />
                    </MyButton>
                    <DialogContent>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }

}

BubbleDialog.propTypes = {
    bubbleId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    bubble: PropTypes.object.isRequired,
    getBubble: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    bubble: state.data.bubble,
    UI: state.UI
})

const mapActionsToProps = {
    getBubble
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(BubbleDialog))