import * as actionTypes from './actionTypes';
import axios from 'axios';


export const authStart = (authData) => {

    return {
        type: actionTypes.AUTH_START,
        authData: authData
    }
}
export const authSuccess = (token, userId, email) => {

    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
        email : email
    }
}
export const authFail = (error) => {

    return {
        type: actionTypes.AUTH_FAIL,
        error: error

    }
}
export const logout = () => {

    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    }
}

export const auth = (email, password, isSignup) => {

    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD-MBdzb-nLw0Emxjfz6xgesmKn-2ljds0';
        if (isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD-MBdzb-nLw0Emxjfz6xgesmKn-2ljds0 ';
        }
        axios.post(url, authData)

            .then(res => {

                const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', res.data.localId);
                localStorage.setItem('email', res.data.email);
                
                dispatch(authSuccess(res.data.idToken, res.data.localId,res.data.email))
                dispatch(checkAuthTimeout(res.data.expiresIn))

            })
            .catch(err => {
                dispatch(authFail(err.response.data.error))
            }
            )
    }

    

}

export const setAuthRederectPath = (path) => {

    return {
        type: actionTypes.SET_REDERECT_PATH,
        path: path
    }
}
export const authCheckState = () => {

    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate >= new Date()) {
                const userId = localStorage.getItem('userId');
                const email = localStorage.getItem('email');
                dispatch(authSuccess(token, userId,email));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));

            }
            else {
                dispatch(logout())
            }

        }

    }

}  