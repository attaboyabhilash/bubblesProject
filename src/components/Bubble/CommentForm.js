import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
//MUI Stuff
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
//Redux
import { connect } from 'react-redux'
import { submitComment } from '../../redux/actions/dataActions'


const styles = {
    form:{
        display: 'flex',
        justifyContent: 'space-between'
    },
    field: {
        width: '85%',
        padding: 0
    },
    visible: {
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 10,
        marginTop: 10
    },
    button:{
        height: 40
    }
}

export class CommentForm extends Component {
    state ={
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
                errors: {} 
            })
        }
    }

    handleChange = (event) => {
        this.setState({
            body: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.submitComment(this.props.bubbleId, { body: this.state.body })
    }

    render() {
        const { classes, authenticated } = this.props
        const errors = this.state.errors
        const commentFormMarkup = authenticated ? (
            <Grid item sm={12}>
                <form onSubmit={this.handleSubmit} className={classes.form}>
                    <TextField 
                        name="body" 
                        type="text" 
                        placeholder="Comment on Bubble" 
                        helperText={errors.comment}
                        error={errors.comment ? true: false}
                        value={this.state.body}
                        onChange={this.handleChange}
                        className={classes.field}
                    />
                    <Button type="submit" variant="contained" color="secondary" className={classes.button}>Post</Button>
                </form>
                <hr className={classes.visible} />
            </Grid>
        ) : null
        return commentFormMarkup
    }
}

CommentForm.propTypes = {
    submitComment: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    bubbleId: PropTypes.string.isRequired,
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    UI: state.UI,
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps, { submitComment })(withStyles(styles)(CommentForm))
