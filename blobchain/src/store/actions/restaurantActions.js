import { apiConfirmVisit, apiAccRequest, apiCreateSlot, apiRejRequest, apiGetOwnReviews } from '../../modules/api';
import { CREATE_TOKEN_ERROR, CREATE_TOKEN_SUCCESS, APPROVE_TOKEN_SUCCESS, APPROVE_TOKEN_ERROR, REJECT_TOKEN_SUCCESS, REJECT_TOKEN_ERROR, CONFIRM_VISIT_ERROR, CONFIRM_VISIT_SUCCESS, GET_REVIEWS_SUCCESS, GET_REVIEWS_ERROR } from './../types';
// export const POST_APPLY_TOKEN = 'APPLY_TOKEN'
// export const GET_RESERVATIONS = 'GET_RESERVATIONS';
// export const POST_REVIEW = 'POST_REVIEW';
// export const GET_REVIEWS = 'GET_REVIEWS';
// export const GET_USER_HISTORY = 'GET_USER_HISTORY';
export const getOwnReviews = () => async dispatch => {
    try{
      const reviews = await apiGetOwnReviews()
      dispatch({
        type: GET_REVIEWS_SUCCESS,
        payload: {
          reviews: reviews,
      }});
    } catch(err){
      dispatch({
        type:GET_REVIEWS_ERROR,
      })
    }
}


export const postCreateTokens = (unixTime, tableNum, pax) => async dispatch => {
    console.log(unixTime, parseInt(tableNum), parseInt(pax))
    try{
        const slot = await apiCreateSlot(unixTime, parseInt(tableNum), parseInt(pax));
        dispatch({
            type: CREATE_TOKEN_SUCCESS,
            payload:{
                slot: slot,
            }
        });
    }catch(err){
        dispatch({
            type: CREATE_TOKEN_ERROR,
        });
    }

}

export const confirmVisit = (slotHash, userAddr) => async dispatch => {
    console.log(slotHash, userAddr);
    try{
        const acc = await apiConfirmVisit(slotHash, userAddr);
        dispatch({
            type: CONFIRM_VISIT_SUCCESS,
            payload:{
                res: acc,
            }
        });
    }catch(err){
        dispatch({
             type: CONFIRM_VISIT_ERROR,
        });
    }
}

export const approveApplication = (request) => async dispatch => {
   try{
        const acc = await apiAccRequest(request);
        dispatch({
            type: APPROVE_TOKEN_SUCCESS,
            payload:{
                res: acc,
            }
        });
    }catch(err){
        dispatch({
             type: APPROVE_TOKEN_ERROR,
        });
    }
}


export const rejectApplication = (request) => async dispatch => {
    try{
        const acc = await apiRejRequest(request);
        dispatch({
            type: REJECT_TOKEN_SUCCESS,
            payload:{
                res: acc,
            }
        });
    }catch(err){
        dispatch({
            type: REJECT_TOKEN_ERROR,
        });
    }
}