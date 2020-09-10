import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import withStyles from '@material-ui/core/styles/withStyles' 
import TextField from '@material-ui/core/TextField'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

//Redux Material
import { connect } from 'react-redux'
import { loginUser } from '../redux/actions/userActions'

const styles = {
    root: {
        margin: '100px auto 0px auto',
        width: '400px',
    },
    title: {
      width: 'fit-content',
      margin: '50px auto 0px auto'
    },
    field: {
      margin: '10px 0px' 
    },
    button: {
      width: 150,
      height: 50,
       padding: 10,
      margin: '10px 31%',
      position: 'relative'
    },
    customError: {
      color: '#FF0000',
      fontSize: '0.8rem',
      paddingLeft: 5
    },
    redirect: {
      margin: '10px auto',
      width: 'fit-content'
     },
    link:{
      color: '#00FFFF'
    },
    progress: {
      position: 'absolute'
    }
}

class login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({
                errors: nextProps.UI.errors
            })
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(userData, this.props.history)
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    render() {
        const { classes, UI: {loading} } = this.props
        const { errors } = this.state
        return (
            <form noValidate onSubmit={this.handleSubmit} className={classes.root} >
                <Typography variant="h4" className={classes.title}>LogIn</Typography><br/>
                <TextField 
                    id="email" 
                    name="email" 
                    type="email" 
                    label="Email" 
                    variant="outlined" 
                    className={classes.field}
                    helperText={errors.email}
                    error={errors.email ? true : false}
                    value={this.state.email} 
                    onChange={this.handleChange}
                    fullWidth
                /><br/>
                <TextField 
                    id="password" 
                    name="password"
                    type="password"
                    label="Password"
                    variant="outlined"
                    className={classes.field}
                    helperText={errors.password}
                    error={errors.password ? true : false}   
                    value={this.state.password} 
                    onChange={this.handleChange} 
                    fullWidth
                /><br/>
                {errors.general && (
                    <Typography variant="body2" className={classes.customError}>
                        {errors.general}
                    </Typography>
                )}<br/>
                <div className={classes.butt}>
                <Button 
                    type="submit"
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={20} className={classes.progress} /> : "LogIn"}
                </Button>
                </div><br/>
                <Typography variant="h6" className={classes.redirect}>
                    Don't have an account? <Typography variant="h6" component={Link} to="/signup" className={classes.link}>SignUp</Typography>
                </Typography>
            </form>
        )
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

const mapActionsToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login))