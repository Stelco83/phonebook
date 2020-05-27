// import * as actionTypes from './actionTypes';
// import axios from '../../axios-orders';

// export const fetchPersonsStart = () => {
//     return {
//         type: actionTypes.FETCH_PERSONS_START
//     }
// }

// export const fetchPersonsSuccess = (persons) => {
//     return {
//         type: actionTypes.FETCH_PERSONS_SUCCESS,
//         persons: persons
//     }
// }

// export const fetchPersonsFail = (error) => {
//     return {
//         type: actionTypes.FETCH_PERSONS_FAIL,
//         error: error
//     }
// }


// export const fetchPersons = (token, userId) => {
//     return dispatch => {
//         dispatch(fetchPersonsStart());

//         const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
//         axios.get('/persons.json' + queryParams )
//             .then(
//                 res => {

//                     const fetchedPersons = [];
//                     for (let key in res.data) {
//                         fetchedPersons.push({
//                             ...res.data[key],
//                             id: key
//                         })
//                     };

//                     dispatch(fetchPersonsSuccess(fetchedPersons))
//                 })
//             .catch(
//                 err => {
//                     dispatch(fetchPersonsFail(err))
//                 });
//     }

// }