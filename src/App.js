import React, { Component } from 'react'
import jwtDecode from 'jwt-decode'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import './App.css'
import axios from 'axios'

//Redux
import { Provider } from 'react-redux'
import store from './redux/store'
import { SET_AUTHENTICATED } from './redux/types'
import { logoutUser, getUserData } from './redux/actions/userActions'

//Components
import Navbar from './components/Layout/Navbar'
import AuthRoute from './components/Bubble/AuthRoute'

//Pages
import home from './pages/home'
import login from './pages/login'
import signup from './pages/signup'
import user from './pages/user'

//Utilities
import myTheme from './util/myTheme'


const theme = createMuiTheme(myTheme)

axios.defaults.baseURL = 'https://asia-south1-bubbles-ee7dc.cloudfunctions.net/api'

const token = localStorage.FBIdToken
if(token){
  const decodedToken = jwtDecode(token)
  if(decodedToken.exp * 1000 < Date.now()){
    store.dispatch(logoutUser())
    window.location.href = '/login'
  }else{
    store.dispatch({ type: SET_AUTHENTICATED })
    axios.defaults.headers.common['Authorization'] = token
    store.dispatch(getUserData())
  }
}



export default class App extends Component {


  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Navbar />
            <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <AuthRoute exact path="/login" component={login} />
              <AuthRoute exact path="/signup" component={signup} />
              <Route exact path="/users/:handle" component={user} />
              <Route exact path="/users/:handle/bubble/:bubbleId" component={user} />
            </Switch>
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    )
  }
}

