import { combineReducers } from 'redux';
import * as type from './types';

function getUserDataReducer(state={}, action){
    switch(action.type){
        case (type.AUTH_SIGN_IN_CLIENT):
            return({
                ...action.payload,
                type: "client",
                success: true,
            })
        case (type.AUTH_SIGN_IN_RESTAURANT):
            return({
                ...action.payload,
                type: "restaurant",
                success: true,
            })
        case (type.AUTH_SIGN_IN_ERROR):
            return({
                ...state,
                success: false,
            })
        default:
            return({
                ...state,
                success: false,
            })
    }   
}

function getRestaurantsReducer(state = [], action) {
    switch(action.type){
        case (type.GET_RESTAURANTS_SUCCESS):
            return({
                ...action.payload,
                success: true,
            })
        case (type.GET_RESTAURANTS_ERROR):
            return({
                restaurants:[],
                ...state,
                success: false,
            })
        default:
            return({
                restaurants:[],
                ...state,
                success: false,
            })
    }   
}

function getSlotsReducer(state = {}, action) {
    switch(action.type){
        case (type.GET_SLOTS_SUCCESS):
            return({
                ...action.payload,
                success: true,
            })
        case (type.GET_SLOTS_ERROR):
            return({
                ...state,
                success: false,
            })
        default:
            return({
                ...state,
                success: false,
            })
    }   
}

function getReviewsReducer(state = {}, action) {
    switch(action.type){
        case (type.GET_REVIEWS_SUCCESS):
            return({
                ...action.payload,
                success: true,
            })
        case (type.GET_REVIEWS_ERROR):
            return({
                ...state,
                success: false,
            })
        default:
            return({
                ...state,
                success: false,
            })
    }   
}

function getReservationsReducer(state = {}, action) {
    switch(action.type){
        case (type.GET_RESERVATIONS_SUCCESS):
            return({
                ...action.payload,
                success: true,
            })
        case (type.GET_RESERVATIONS_ERROR):
            return({
                ...state,
                success: false,
            })
        default:
            return({
                ...state,
                success: false,
            })
    }   
}

function getRequestsReducer(state = {}, action) {
    switch(action.type){
        case (type.GET_REQUESTS_SUCCESS):
            return({
                ...action.payload,
                success: true,
            })
        case (type.GET_REQUESTS_ERROR):
            return({
                ...state,
                success: false,
            })
        default:
            return({
                ...state,
                success: false,
            })
    }   
}


export const rootReducer = combineReducers({
    getUserDataReducer,
    getRestaurantsReducer,
    getReservationsReducer,
    getSlotsReducer,
    getReviewsReducer,
    getRequestsReducer,
});