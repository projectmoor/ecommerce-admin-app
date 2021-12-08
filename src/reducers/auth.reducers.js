import { authConstants } from '../actions/constants'

const initState = {
    token: null,
    user: {
        firstName: '',
        lastName: '',
        email: '',
        picture: ''
    },
    authenticated: false,
    authenticating: false,
    loading: false, // for logout process
    error: null, // for logout error object
    message: '' // for logout success message
}

export default (state = initState, action) => {
    console.log(action.type)
    switch(action.type){
        case authConstants.LOGIN_REQUEST:
            state = {
                ...state,
                authenticating: true
            }
            break
        case authConstants.LOGIN_SUCCESS:
            state = {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                authenticated: true,
                authenticating: false
            }
            break
        case authConstants.LOGIN_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                authenticated: false,
                authenticating: false
            }
            break
        case authConstants.LOGOUT_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break
        case authConstants.LOGOUT_SUCCESS:
            state = {
                ...initState
            }
            break
        case authConstants.LOGOUT_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
            break
}
    return state
}