import * as actionType from '../actions/actionTypes';

const initialState = {

    token : null,
    userId : null,
    error : null,
    loading: false,
    authRedirectPath : '/',
    email : null
}

const reducer = (state = initialState, action) =>{

    switch (action.type) {
        case actionType.AUTH_START:
        return{
        
                ...state,
                error : null,
                loading : true,  
            }
        case actionType.AUTH_SUCCESS:
            return{
                ...state,
                error : null,
                loading : false,
                token : action.idToken,
                userId : action.userId,
                email : action.email
            }

            case actionType.AUTH_FAIL:
            
                return{
                    ...state,
                    error : action.error,
                    loading : false
                }    

            case actionType.AUTH_LOGOUT:

                return{
                    ...state,
                    token : null,
                    userId : null
                }   
                case actionType.SET_REDERECT_PATH:
                    return{
                        ...state,
                        authRedirectPath : action.path
                    }     
    
        default:
            return state;
    }

}

export default reducer