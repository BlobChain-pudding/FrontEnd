
import { GET_RESTAURANTS_SUCCESS, GET_REVIEWS_SUCCESS, GET_RESERVATIONS_SUCCESS } from './../types';
// export const POST_APPLY_TOKEN = 'APPLY_TOKEN'
// export const GET_RESERVATIONS = 'GET_RESERVATIONS';
// export const POST_REVIEW = 'POST_REVIEW';
// export const GET_REVIEWS = 'GET_REVIEWS';
// export const GET_USER_HISTORY = 'GET_USER_HISTORY';

export const getRestaurants = () => async dispatch => {
    dispatch({
        type: GET_RESTAURANTS_SUCCESS,
        payload: 
        {
            restaurants:[{
              "name": "My Restaurant",
              "address": "0xdbfda8454b62fb973b837168a93316093347f437"
            }]
          }
    });

}



export const getReviews = (restaurandAddr) => async dispatch => {
    dispatch({
        type: GET_REVIEWS_SUCCESS,
        payload:
        {
            "Tue Aug 03 2021": [
              {
                "0": "This is a review",
                "1": "EYLeong",
                "2": "0x8bf8a434bae025a8c8e73fd0e80c6d1bb24f423c6cee7765d340ce8ac4dc0efd",
                "token": {
                  "0": "My Restaurant",
                  "1": "0xDBfDa8454b62FB973B837168A93316093347f437",
                  "2": "1627931326667",
                  "3": "1",
                  "4": "4",
                  "5": "0xDBfDa8454b62FB973B837168A93316093347f437",
                  "6": true,
                  "7": true,
                  "8": true,
                  "restaurantName": "My Restaurant",
                  "restaurantAddress": "0xDBfDa8454b62FB973B837168A93316093347f437",
                  "dateTime": "1627931326667",
                  "tableNo": "1",
                  "pax": "4",
                  "ownerAddress": "0xDBfDa8454b62FB973B837168A93316093347f437",
                  "visited": true,
                  "accepted": true,
                  "exist": true
                }
              },
              {
                "0": "This is a review",
                "1": "EYLeong",
                "2": "0x819338bbca11b199df8832e11a4bb224f95add3557421f79090a87f7cf7fa32a",
                "token": {
                  "0": "My Restaurant",
                  "1": "0xDBfDa8454b62FB973B837168A93316093347f437",
                  "2": "1627930037347",
                  "3": "1",
                  "4": "4",
                  "5": "0xDBfDa8454b62FB973B837168A93316093347f437",
                  "6": true,
                  "7": true,
                  "8": true,
                  "restaurantName": "My Restaurant",
                  "restaurantAddress": "0xDBfDa8454b62FB973B837168A93316093347f437",
                  "dateTime": "1627930037347",
                  "tableNo": "1",
                  "pax": "4",
                  "ownerAddress": "0xDBfDa8454b62FB973B837168A93316093347f437",
                  "visited": true,
                  "accepted": true,
                  "exist": true
                }
              }
            ]
          }
    })
}

export const getReservations = () => async dispatch =>{
    dispatch({
        type: GET_RESERVATIONS_SUCCESS,
        payload:
        {
            "Tue Aug 03 2021": [
              {
                "token": {
                  "0": "My Restaurant",
                  "1": "0xDBfDa8454b62FB973B837168A93316093347f437",
                  "2": "1627931326667",
                  "3": "1",
                  "4": "4",
                  "5": "0xc12CC487AB3Bdf25bf19F72397D240e60cD67f38",
                  "6": false,
                  "7": true,
                  "8": true,
                  "restaurantName": "My Restaurant",
                  "restaurantAddress": "0xDBfDa8454b62FB973B837168A93316093347f437",
                  "dateTime": "1627931326667",
                  "tableNo": "1",
                  "pax": "4",
                  "ownerAddress": "0xc12CC487AB3Bdf25bf19F72397D240e60cD67f38",
                  "visited": false,
                  "accepted": true,
                  "exist": true
                },
                "hash": "0x8bf8a434bae025a8c8e73fd0e80c6d1bb24f423c6cee7765d340ce8ac4dc0efd"
              }
            ]
          }
    })
}

