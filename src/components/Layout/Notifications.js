import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles' 
//MUI Material
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Badge from '@material-ui/core/Badge'
//Icons
import NotificationsIcon from '@material-ui/icons/Notifications'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ChatIcon from '@material-ui/icons/Chat'
//Redux
import { connect } from 'react-redux'
import { markNotificationsRead } from '../../redux/actions/userActions'

const styles = {
    menu: {
        position: 'absolute',
        top: 16
    }
}

class Notifications extends Component{
    state = {
        anchorEl: null
    }

    handleOpen = (event) => {
        this.setState({ anchorEl: event.target })
    }

    handleClose = () => {
        this.setState({ anchorEl: null })
    }

    onMenuOpened = () => {
        let unreadNotificationsIds = this.props.notifications
            .filter(not => !not.read)
            .map(not => not.notificationId)
        this.props.markNotificationsRead(unreadNotificationsIds)
    }

    render(){
        const { classes } = this.props
        const notifications = this.props.notifications
        const anchorEl = this.state.anchorEl
        dayjs.extend(relativeTime)

        let notificationIcon
        if(notifications && notifications.length > 0){
            notifications.filter(not => not.read === false).length > 0
            ? (notificationIcon = (
                <Badge badgeContent={notifications.filter(not => not.read === false).length} color="secondary">
                        <NotificationsIcon color="secondary"/>
                    </Badge>
            )): (notificationIcon = <NotificationsIcon color="secondary"/>) 
        }else{
            notificationIcon = <NotificationsIcon color="secondary"/>
        }

        let notificationsMarkup = 
            (notifications && notifications.length > 0) ? (
                notifications.map(not => {
                    const verb = not.type === 'like' ? 'liked' : 'commented on'
                    const time = dayjs(not.createdAt).fromNow()
                    const icon = not.type === 'like' ? (
                        <FavoriteIcon color="secondary" style={{marginRight: 10}} />
                    ) : (
                        <ChatIcon color="secondary" style={{marginRight: 10}} />
                    )

                    return (
                        <MenuItem key={not.createdAt} onClick={this.handleClose}>
                            {icon}
                            <Typography component={Link} variant="body2" to={`/users/${not.recipient}/bubble/${not.bubbleId}`}>
                                {not.sender} {verb} your bubble {time}
                            </Typography>
                        </MenuItem>
                    )
                })
            ) : (
                <MenuItem onClick={this.handleClose}>
                    You have no notifications yet
                </MenuItem>
            )

        return(
            <Fragment>
                <Tooltip title="Notifications">
                    <IconButton aria-owns={anchorEl ? 'simple-menu' : undefined} aria-haspopup="true" onClick={this.handleOpen}>
                        {notificationIcon}
                    </IconButton>    
                </Tooltip> 
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose} onEntered={this.onMenuOpened} className={classes.menu}>
                    {notificationsMarkup}
                </Menu>
            </Fragment>
        )
    }
}

Notifications.propTypes = {
    classes: PropTypes.object.isRequired,
    markNotificationsRead: PropTypes.func.isRequired,
    notifications: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    notifications: state.user.notifications
})

export default connect(mapStateToProps, { markNotificationsRead })(withStyles(styles)(Notifications))