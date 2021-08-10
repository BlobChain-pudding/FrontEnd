import { GET_SLOTS_SUCCESS, GET_REQUESTS_SUCCESS, AUTH_SIGN_IN_USER, AUTH_SIGN_IN_RESTAURANT, AUTH_SIGN_IN_ERROR, AUTH_SIGNUP_ERROR, GET_SLOTS_ERROR, GET_REQUESTS_ERROR, AUTH_SIGNUP_RESTAURANT_SUCCESS, AUTH_SIGNUP_USER_SUCCESS } from './../types';
import firebase from '../../firebase';
import { apiGetRequests, apiGetSlots, apiNewUser } from '../../modules/api';

export const signin = (email, password, type, callback) => async dispatch => {
  try{
      firebase.auth().signInWithEmailAndPassword(email, password).then(
      data => {
      console.log(data);
      if(type==="user"){
        dispatch({
          type: AUTH_SIGN_IN_USER,
            payload: {
                user: data.user,
                type: type,
            }
        });
       callback(type);
      }else if(type==="restaurant"){
        dispatch({
          type: AUTH_SIGN_IN_RESTAURANT,
            payload: {
                 user: data.user,
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

export const signUp = (email, password, name, type, callback) => async dispatch =>{
  console.log(email, password, name, type);
  try{
    
    if(type==="user"){
      const user = await apiNewUser(email, password, name, false);
      dispatch({
        type: AUTH_SIGNUP_USER_SUCCESS,
          payload: {
              user: user,
              type: type,
          }
      });
     callback(type);
    }else if(type==="restaurant"){
      const user = await apiNewUser(email, password, name, true);
      dispatch({
        type: AUTH_SIGNUP_RESTAURANT_SUCCESS,
          payload: {
               user: user,
               type: type,
          }
      });
      callback(type);
    }
  }catch(err){
    dispatch({
      type: AUTH_SIGNUP_ERROR,
    })
  }
}


export const getSlots = (restaurantAddr, isAccepted) => async dispatch =>{
    console.log(restaurantAddr);
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
