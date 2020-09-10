import { SET_BUBBLES, LIKE_BUBBLE, UNLIKE_BUBBLE, LOADING_DATA, DELETE_BUBBLE, POST_BUBBLE, SET_BUBBLE, SUBMIT_COMMENT } from '../types'

const initialState = {
    bubbles: [],
    bubble: {},
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case LOADING_DATA: 
            return {
                ...state,
                loading: true
            }
        case SET_BUBBLES:
            return {
                ...state,
                bubbles: action.payload,
                loading: false
            }
        case SET_BUBBLE:
            return {
                ...state,
                bubble: action.payload
            }
        case LIKE_BUBBLE:
        case UNLIKE_BUBBLE:
            let index = state.bubbles.findIndex((bubble) => bubble.bubbleId === action.payload.bubbleId)
            state.bubbles[index] = action.payload
            if(state.bubble.bubbleId === action.payload.bubbleId){
                let comments = state.bubble.comments
                state.bubble = action.payload
                state.bubble.comments = comments
            }
            return {
                ...state
            }
        case DELETE_BUBBLE:
            let index1 = state.bubbles.findIndex(bubble => bubble.bubbleId === action.payload)
            state.bubbles.splice(index1, 1)
            return {
                ...state
            }
        case POST_BUBBLE:
            return {
                ...state,
                bubbles: [
                    action.payload,
                    ...state.bubbles
                ]
            }
        case SUBMIT_COMMENT:
            return{
                ...state,
                bubble: {
                    ...state.bubble,
                    comments: [
                        action.payload,
                        ...state.bubble.comments
                    ]
                }
            }
        default:
            return state
    }
}