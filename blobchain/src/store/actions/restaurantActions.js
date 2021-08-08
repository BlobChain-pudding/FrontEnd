import { CREATE_TOKEN_SUCCESS, CREATE_TOKEN_ERROR} from '../types';
import CreateTokens from './../../containers/Restaurant/CreateTokens/CreateTokens';
// export const POST_APPLY_TOKEN = 'APPLY_TOKEN'
// export const GET_RESERVATIONS = 'GET_RESERVATIONS';
// export const POST_REVIEW = 'POST_REVIEW';
// export const GET_REVIEWS = 'GET_REVIEWS';
// export const GET_USER_HISTORY = 'GET_USER_HISTORY';

export const postCreateTokens = (unixTime, tableNum, pax) => async dispatch => {
    dispatch({
        type: CREATE_TOKEN_SUCCESS,
        payload: 
        {
            success: true,  
        }
    });

}