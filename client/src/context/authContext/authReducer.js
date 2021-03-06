
import {
    AUTH_ERROR,
    LOGIN_FAIL, 
    LOGIN_SUCCESS,
    REGISTER_FAIL, 
    REGISTER_SUCCESS,
    USER_LOADED,
    LOGOUT,
    REMOVE_ALERT,
    SET_ALERT
} from '../ContextTypes'

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch (action.type) {
        
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                isAuthenticated: true,
                loading: false
            }
        case LOGIN_FAIL:
        case REGISTER_FAIL:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                alerts: action.payload,
                user: null
            }
        case SET_ALERT:
            return {
                ...state,
                alerts: action.payload
            }
        case REMOVE_ALERT:
            return {
                ...state,
                alerts: state.alerts.filter(a => a._id !== action.payload)
            }
        default:
            return state;
    }
}