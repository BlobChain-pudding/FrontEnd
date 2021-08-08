
import { GET_RESTAURANTS_SUCCESS, GET_REVIEWS_ERROR, GET_REVIEWS_SUCCESS, GET_RESERVATIONS_SUCCESS, GET_RESTAURANTS_ERROR, GET_RESERVATIONS_ERROR } from '../types';
import { apiGetReservations, apiGetRestaurants, apiGetReviews } from '../../modules/api';

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

