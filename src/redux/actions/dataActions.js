import { SET_BUBBLES, LOADING_DATA, LIKE_BUBBLE, UNLIKE_BUBBLE, DELETE_BUBBLE, LOADING_UI, SET_ERRORS, CLEAR_ERRORS, POST_BUBBLE, SET_BUBBLE, STOP_LOADING_UI, SUBMIT_COMMENT } from '../types'
import axios from 'axios'

//Get All Bubbles
export const getBubbles = () => (dispatch) => {
    dispatch({ type: LOADING_DATA})
    axios.get('/bubbles')
        .then(res => {
            dispatch({ 
                type: SET_BUBBLES,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: SET_BUBBLES,
                payload: []
            })
        })
}

//Get One Bubble
export const getBubble = (bubbleId) => (dispatch) => {
    dispatch({ type: LOADING_UI })
    axios.get(`/bubble/${bubbleId}`)
        .then(res => {
            dispatch({
                type: SET_BUBBLE,
                payload: res.data
            })
            dispatch({ type: STOP_LOADING_UI })
        })
        .catch(err => console.log(err))
}

//Post a new Bubble
export const postBubble = (newBubble) => (dispatch) => {
    dispatch({ type: LOADING_UI })
    axios.post('/bubble', newBubble)
        .then(res => {
            dispatch({
                type: POST_BUBBLE,
                payload: res.data
            })
            dispatch(clearErrors())
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

//Like a Bubble
export const likeBubble = (bubbleId) => (dispatch) => {
    axios.get(`/bubble/${bubbleId}/like`)
        .then(res => {
            dispatch({
                type: LIKE_BUBBLE,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

//Unlike a Bubble
export const unlikeBubble = (bubbleId) => (dispatch) => {
    axios.get(`/bubble/${bubbleId}/unlike`)
        .then(res => {
            dispatch({
                type: UNLIKE_BUBBLE,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

//Delete a Bubble
export const deleteBubble = (bubbleId) => (dispatch) => {
    axios.delete(`/bubble/${bubbleId}`)
        .then(() => {
            dispatch({ 
                type: DELETE_BUBBLE, 
                payload: bubbleId
            })
        })
        .catch(err=> console.log(err))
}
//Get User Data
export const getUserData = (userHandle) => (dispatch) => {
    dispatch({ type: LOADING_DATA })
    axios.get(`/user/${userHandle}`)
        .then(res => {
            dispatch({
                type: SET_BUBBLES,
                payload: res.data.bubbles
            })
        })
        .catch(() => {
            dispatch({
                type: SET_BUBBLES,
                payload: null
            })
        })
}

//Submit a Comment
export const submitComment = (bubbleId, commentData) => (dispatch) => {
    axios.post(`/bubble/${bubbleId}/comment`, commentData)
        .then(res => {
            dispatch({
                type: SUBMIT_COMMENT,
                payload: res.data
            })
            dispatch(clearErrors())
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}


//Clear Errors
export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}