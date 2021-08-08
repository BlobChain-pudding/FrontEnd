import { GET_SLOTS_SUCCESS, GET_REQUESTS_SUCCESS, AUTH_SIGN_IN_USER, AUTH_SIGN_IN_RESTAURANT, AUTH_SIGN_IN_ERROR, AUTH_SIGNUP_ERROR, GET_SLOTS_ERROR, GET_REQUESTS_ERROR } from './../types';
import firebase from '../../firebase';
import { apiGetRequests, apiGetSlots } from '../../modules/api';
export const signin = (email, password, type, callback) => async dispatch => {
  try{
      firebase.auth().signInWithEmailAndPassword(email, password).then(
      data => {
      console.log(type);
      if(type==="user"){
        dispatch({
          type: AUTH_SIGN_IN_USER,
            payload: {
                displayName: data.user.displayName,
                type: type,
            }
        });
       callback(type);
      }else if(type==="restaurant"){
        dispatch({
          type: AUTH_SIGN_IN_RESTAURANT,
            payload: {
                 displayName: data.user.displayName,
                 type: type,
            }
        });
        callback(type);
      }
    
  });
  }catch(err){
    dispatch({
      type: AUTH_SIGN_IN_ERROR,
    }) 
  };
}

export const signUp = (email, password, type) => async dispatch =>{

}


export const getSlots = (restaurantAddr, isAccepted) => async dispatch =>{
    try{
      const slots = await apiGetSlots(restaurantAddr, isAccepted);
      dispatch({
        type: GET_SLOTS_SUCCESS,
        payload: {
          slots: slots
        }     
    });
    }catch(err){
      dispatch({
        type: GET_SLOTS_ERROR,
      }) 
    }
    
}
export const getRequests = (uid, type) => async dispatch => {
  try{
    const requests = await apiGetRequests(uid, type);
    dispatch({
      type: GET_REQUESTS_SUCCESS,
      payload: {
        requests: requests
      }     
  });
  }catch(err){
    dispatch({
      type: GET_REQUESTS_ERROR,
    }) 
  }
}
