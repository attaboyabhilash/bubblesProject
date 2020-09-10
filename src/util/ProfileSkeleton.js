import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import BlankProfile from '../blank-profile.png'
//MUI Stuff
import Paper from '@material-ui/core/Paper'
//Icons Material
import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'


const styles = {
    paper: {
        padding: 20,
        position: 'relative'
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
            '& button': {
                position: 'absolute',
                top: '80%',
                left: '80%'
            }
        },
        '& .profile-image': {
            width: 200,
            height: 200,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%'
        },
        '& .profile-details': {
            textAlign: 'center',
            '& span, svg': {
                verticalAlign: 'middle'
            },
            '& a': {
                color: '#00FFFF',
                textDecoration: 'none'
            }
        },
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
        },
        '& svg.button': {
            '&:hover': {
                cursor: 'pointer'
            }
        }
    },
    buttons: {
        textAlign: 'center',
        '& a': {
            margin: '20px 10px'
        }
    },
    handle: {
        width: 100,
        height: 20,
        background: '#00FFFF',
        margin: 'auto',
        marginBottom: 5
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
    },
    flexer: {
        display: 'flex',
        justifyContent: 'space-evenly'
    }
}

const ProfileSkeleton = (props) => {
    const { classes } = props
    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img src={BlankProfile} alt="profile-blank" className="profile-image" />
                </div>
                <hr />
                <div className="profile-details">
                    <div className={classes.handle}/>
                    <hr />
                    <div className={classes.fullLine}/>
                    <div className={classes.fullLine}/>
                    <hr />
                    <div className={classes.flexer}>
                        <LocationOn color="secondary" /><div className={classes.halfLine} />
                    </div>
                    <hr/>
                    <div className={classes.flexer}>
                        <LinkIcon color="secondary" /><div className={classes.halfLine} />
                    </div>
                    <hr />
                    <div className={classes.flexer}>
                        <CalendarToday color="secondary" /><div className={classes.halfLine} />
                    </div>
                </div>
            </div>
        </Paper>
    )
}

ProfileSkeleton.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ProfileSkeleton)
