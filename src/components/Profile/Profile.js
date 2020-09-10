import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import dayjs from 'dayjs'
import EditDetails from './EditDetails'
import MyButton from '../../util/MyButton'
import ProfileSkeleton from '../../util/ProfileSkeleton'
//MUI material
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import MuiLink from '@material-ui/core/Link'
//Icons Material
import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import EditIcon from '@material-ui/icons/Edit'
import CalendarToday from '@material-ui/icons/CalendarToday'
import KeyboardReturn from '@material-ui/icons/KeyboardReturn'
//Redux Material
import { connect } from 'react-redux'
import { logoutUser, uploadImage } from '../../redux/actions/userActions'


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
    logout: {
        position: 'absolute',
        right: '25px',
        marginTop: 20
    }
}

class Profile extends Component {

    handleImageChange = (event) => {
        const image = event.target.files[0]
        //send to server 
        const formData = new FormData()
        formData.append('image', image, image.name)
        this.props.uploadImage(formData)

    }
    handleEditPicture = () => {
        const fileUpload = document.getElementById('imageUpload')
        fileUpload.click()
    }
    handleLogout = () => {
        this.props.logoutUser()
    }

    render() {
        const { classes, user: { credentials: { handle, createdAt, imageUrl, bio, website, location }, loading, authenticated } } = this.props
        let profileMarkup = !loading ? (authenticated ? (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={imageUrl} alt="profile" className="profile-image" />
                        <input type="file" id="imageUpload" hidden="hidden" onChange={this.handleImageChange} />
                        <MyButton tip="Edit Profile Picture" onClick={this.handleEditPicture} btnClassName="button" place="right">
                            <EditIcon color="secondary" />
                        </MyButton>
                    </div>
                    <hr />
                    <div className="profile-details">
                        <MuiLink component={Link} to={`/users/${handle}`} color="secondary" variant="h5">
                            @{handle}
                        </MuiLink>
                        <hr />
                        {bio && <Typography variant="body2">{bio}</Typography>}
                        <hr />
                        {location && (
                            <Fragment>
                                <LocationOn color="secondary" /> <span>{location}</span>
                                <hr />
                            </Fragment>
                        )}
                        {website && (
                            <Fragment>
                                <LinkIcon color="secondary" />
                                <a href={website} target="_blank" rel="noopener noreferrer">
                                    {' '}{website}
                                </a>
                                <hr />
                            </Fragment>
                        )}
                        <CalendarToday color="secondary" />{' '}<span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                    </div>
                    <MyButton tip="LogOut" onClick={this.handleLogout} btnClassName={classes.logout} place="right">
                        <KeyboardReturn color="secondary"/>
                    </MyButton>
                    <EditDetails />
                </div>
            </Paper>
        ) : (
            <Paper className={classes.paper}>
                <Typography variant="body2" align="center">
                    No Profile Found, Please logIn Again.
                    <div className={classes.buttons}>
                        <Button variant="contained" color="secondary" component={Link} to="/login">
                            LogIn
                        </Button>
                        <Button variant="contained" color="primary" component={Link} to="/signup">
                            SignUp
                        </Button>
                    </div>
                </Typography>
            </Paper>
        )) : (<ProfileSkeleton />)
        
        return profileMarkup
    }
}

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = { logoutUser, uploadImage }

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile))
