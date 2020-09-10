import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import MyButton from '../../util/MyButton'
//MUI Material
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import CircularProgress from '@material-ui/core/CircularProgress'
//Icons
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'
//Redux Material
import { connect } from 'react-redux'
import { postBubble, clearErrors } from '../../redux/actions/dataActions'

const styles = {
    temp: {
        position: 'relative'
    },
    closeBtn: {
        position: 'absolute',
        margin: '10px auto 0px 90%',
        color: '#FF0000'
    },
    field: {
        margin: '0 0 20px 0'
    },
    submit: {
        width: 150,
        height: 50,
        padding: 10,
        margin: '10px 35% 20px 37%',
        position: 'relative'
    },
    progress: {
        position: 'absolute'
    }
}

class PostBubble extends Component {
    state = {
        open: false,
        body: '',
        errors: {}
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({
                errors: nextProps.UI.errors
            })
        }
        if(!nextProps.UI.errors && !nextProps.UI.loading){
            this.setState({ 
                body: '',
                open: false,
                errors: {} 
            })
        }
    }

    handleOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.props.clearErrors()
        this.setState({ 
            open: false,
            errors: {} 
        })
    }

    handleChange = (event) => {
        this.setState({
            body: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.postBubble({ body: this.state.body })
    }

    render(){
        const { errors } = this.state
        const { classes, UI: { loading } } = this.props
        return(
            <Fragment>
                <MyButton onClick={this.handleOpen} tip="Post a Bubble">
                    <AddIcon color="secondary" />
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} maxWidth="sm" className={classes.temp} fullWidth>
                    <MyButton onClick={this.handleClose} tip="Close" place="right" btnClassName={classes.closeBtn}>
                        <CloseIcon />
                    </MyButton>
                    <DialogTitle>Post a new Bubble</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                                name="body"
                                type="text"
                                label="Bubble"
                                value={this.state.body}
                                multiline
                                rows= "3"
                                variant="outlined"
                                placeholder="Write anything that's on your mind!!"
                                error={errors.body ? true : false}
                                helperText={errors.body}
                                className={classes.field}
                                maxlength="150"
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <Button 
                                type="submit" 
                                variant="contained" 
                                color="secondary" 
                                className={classes.submit}
                                disabled={loading}
                            >
                                POST
                                {loading && (<CircularProgress size={20} className={classes.progress} />)}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }

}

PostBubble.propTypes = {
    classes: PropTypes.object.isRequired,
    postBubble: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    UI: state.UI
})

const mapActionsToProps = { postBubble, clearErrors }

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PostBubble))