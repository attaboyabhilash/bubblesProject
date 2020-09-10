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
import { signupUser } from '../redux/actions/userActions'

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


class signup extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
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
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        }
        this.props.signupUser(newUserData, this.props.history)
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    render() {
        const { classes, UI: { loading } } = this.props
        const { errors } = this.state
        return (
            <form noValidate onSubmit={this.handleSubmit} className={classes.root} >
                <Typography variant="h4" className={classes.title}>SignUp</Typography><br/>
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
                <TextField 
                    id="confirmPassword" 
                    name="confirmPassword"
                    type="password"
                    label="Confirm Password"
                    variant="outlined"
                    className={classes.field}
                    helperText={errors.confirmPassword}
                    error={errors.confirmPassword ? true : false}   
                    value={this.state.confirmPassword} 
                    onChange={this.handleChange} 
                    fullWidth
                /><br/>
                <TextField 
                    id="handle" 
                    name="handle"
                    type="text"
                    label="Handle"
                    variant="outlined"
                    className={classes.field}
                    helperText={errors.handle}
                    error={errors.handle ? true : false}   
                    value={this.state.handle} 
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
                    {loading ? <CircularProgress size={20} className={classes.progress} /> : "SignUp"}
                </Button>
                </div><br/>
                <Typography variant="h6" className={classes.redirect}>
                    Already have an account? <Typography variant="h6" component={Link} to="/login" className={classes.link}>LogIn</Typography>
                </Typography>
            </form>
        )
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})



export default connect(mapStateToProps, { signupUser })(withStyles(styles)(signup))
