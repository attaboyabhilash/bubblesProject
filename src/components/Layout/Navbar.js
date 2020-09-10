import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import bubble from '../../bubblesWhite.svg'
import MyButton from '../../util/MyButton'
import PostBubble from '../Bubble/PostBubble'
import Notifications from './Notifications'
//MUI stuff
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
//Icons
import HomeIcon from '@material-ui/icons/Home'




class Navbar extends Component {
    render() {
        const { authenticated } = this.props
        return (
            <AppBar>
                <div className="logo">
                    <img src={bubble} alt="bubble-logo" />
                </div>
                <Toolbar className="nav-container">
                    {authenticated ? (
                        <Fragment>
                            <PostBubble />
                            <Link to="/">
                                <MyButton tip="Home">
                                    <HomeIcon color="secondary" />
                                </MyButton>
                            </Link>
                            <Notifications />
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Button color="secondary" component={Link} to="/login">LogIn</Button>
                            <Button color="secondary" component={Link} to="/">Home</Button>
                            <Button color="secondary" component={Link} to="/signup">SignUp</Button>
                        </Fragment>
                    )}
                </Toolbar>
            </AppBar>
        )
    }
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(Navbar)
