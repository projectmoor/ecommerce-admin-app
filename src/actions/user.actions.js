import axios from '../helpers/axios'
import { userConstants } from './constants'

export const signup = (user) => {

	return async (dispatch) => { 
        dispatch({ type: userConstants.USER_REGISTER_REQUEST })
        const res = await axios.post(`/admin/signup`, { 
            ...user // user includes firstName, lastName, email, password
        })

        if(res.status === 201){
            const { message } = res.data // server reply {message: ''}
            dispatch({ 
                type: userConstants.USER_REGISTER_SUCCESS,
                payload: { message } 
            })
        } else {
            if(res.status === 400) {
                dispatch({ 
                    type: userConstants.USER_REGISTER_FAILURE, 
                    payload: { error: res.data.message }
                })
            }
        }
		
	}
}