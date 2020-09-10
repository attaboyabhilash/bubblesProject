import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import MyButton from '../../util/MyButton'
//Redux Material
import { connect } from 'react-redux'
import { editUserDetails } from '../../redux/actions/userActions'
//MUI Material
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
//Icons
import EditIcon from '@material-ui/icons/Edit'

const styles = {
    button: {
        marginTop: 20
    },
    field: {
        margin: '0px 0px 15px 0px' 
    },
    actions: {
        marginBottom: 25,
        marginRight: 20
    }
}


class EditDetails extends Component {
    state = {
        bio: '',
        website: '',
        location: '',
        open: false
    }
    
    mapUserDetailsToState = (credentials) => {
        this.setState({    
            bio: credentials.bio ? credentials.bio : '',
            website: credentials.website ? credentials.website : '',
            location: credentials.location ? credentials.location : ''
        })
    }

    UNSAFE_componentWillReceiveProps(){
        const { credentials } = this.props
        this.mapUserDetailsToState(credentials)
    }

    handleOpen = () => {
        this.setState({ open: true })
        this.mapUserDetailsToState(this.props.credentials)
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = () => {
        const userDetails = {
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location
        }
        this.props.editUserDetails(userDetails)
        this.handleClose()
    }

    render() {
        const { classes } = this.props
        return (
            <Fragment>
                <MyButton tip="Edit Details" onClick={this.handleOpen} btnClassName={classes.button} place="right">
                    <EditIcon color="secondary" />
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} maxWidth="sm" fullWidth>
                    <DialogTitle>Edit Your Details</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField 
                                name="bio" 
                                type="text" 
                                label="Bio" 
                                value={this.state.bio} 
                                multiline 
                                rows="3" 
                                variant="outlined" 
                                placeholder="A short bio about yourself" 
                                className={classes.field} 
                                onChange={this.handleChange} 
                                fullWidth 
                            />
                            <TextField 
                                name="website" 
                                type="text" 
                                label="Website" 
                                value={this.state.website} 
                                variant="outlined" 
                                placeholder="Your Website" 
                                className={classes.field} 
                                onChange={this.handleChange} 
                                fullWidth 
                            />
                            <TextField 
                                name="location" 
                                type="text" 
                                label="Location" 
                                value={this.state.location} 
                                variant="outlined" 
                                placeholder="City, Country" 
                                className={classes.field} 
                                onChange={this.handleChange} 
                                fullWidth 
                            />
                        </form>
                    </DialogContent>
                    <DialogActions className={classes.actions}>
                        <Button variant="contained" onClick={this.handleClose} color="primary">Cancel</Button>
                        <Button variant="contained" onClick={this.handleSubmit} color="secondary">Save</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

EditDetails.propTypes = {
    classes: PropTypes.object.isRequired,
    editUserDetails: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
})

export default connect(mapStateToProps, {editUserDetails})(withStyles(styles)(EditDetails))
