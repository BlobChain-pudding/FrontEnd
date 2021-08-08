
import { GET_RESTAURANTS_SUCCESS, GET_REVIEWS_ERROR, GET_REVIEWS_SUCCESS, GET_RESERVATIONS_SUCCESS, GET_RESTAURANTS_ERROR, GET_RESERVATIONS_ERROR, APPLY_TOKEN_SUCCESS,APPLY_TOKEN_ERROR, POST_REVIEW_SUCCESS, POST_REVIEW_ERROR } from '../types';
import { apiGetReservations, apiGetRestaurants, apiGetReviews, apiMakeRequest,apiPostReview } from '../../modules/api';

export const getRestaurants = () => async dispatch => {
  try {
    const restaurants = await apiGetRestaurants();
    dispatch({
      type: GET_RESTAURANTS_SUCCESS,
      payload: {
        restaurants:restaurants,
    }
  })
  } catch (err) {
    dispatch({
      type:GET_RESTAURANTS_ERROR,
    });
  }
}

export const makeRequest = (restaurantAddr, slotHash) => async (dispatch, getState) => {
  try{
    const req = apiMakeRequest(getState().getUserDataReducer.user, restaurantAddr.toLowerCase(), slotHash);
    dispatch({
      type: APPLY_TOKEN_SUCCESS,
      payload: {
        req:req,
      }
    })
  }catch(error){
    dispatch({
      type: APPLY_TOKEN_ERROR,
    })   
  }
}

export const getReviews = (restaurantAddr) => async dispatch => {
    try{
      const reviews = await apiGetReviews(restaurantAddr)
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

export const getReservations = (isVisited) => async dispatch =>{
  try{
    const reservations = await apiGetReservations(isVisited);
    dispatch({
      type: GET_RESERVATIONS_SUCCESS,
      payload: {
        reservations: reservations,
    }});
  } catch(err){
    dispatch({
      type:GET_RESERVATIONS_ERROR,
    })
  }
}


export const submitReviews = (content, author, slotHash) => async dispatch => {
  console.log(content, author, slotHash);
  try{
    const review = await apiPostReview(content, author, slotHash);
    dispatch({
      type: POST_REVIEW_SUCCESS,
      payload: {
        review: review,
    }});
  } catch(err){
    dispatch({
      type:POST_REVIEW_ERROR,
    })
  }
}

