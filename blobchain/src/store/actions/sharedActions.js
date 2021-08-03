import { GET_SLOTS_SUCCESS, GET_REQUESTS_SUCCESS, AUTH_SIGN_IN_CLIENT } from './../types';

export const signinClient = () => async dispatch => {
    dispatch({
        type: AUTH_SIGN_IN_CLIENT,
        payload: {
            name:"Caleb Foo",
            pubAddr: "0123242349820394",
        }
    })

}


export const getSlots = (restaurantAddr, isAccepted) => async dispatch =>{
    dispatch({
        type: GET_SLOTS_SUCCESS,
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
                  "5": "0xDBfDa8454b62FB973B837168A93316093347f437",
                  "6": false,
                  "7": false,
                  "8": true,
                  "restaurantName": "My Restaurant",
                  "restaurantAddress": "0xDBfDa8454b62FB973B837168A93316093347f437",
                  "dateTime": "1627931326667",
                  "tableNo": "1",
                  "pax": "4",
                  "ownerAddress": "0xDBfDa8454b62FB973B837168A93316093347f437",
                  "visited": false,
                  "accepted": false,
                  "exist": true
                },
                "hash": "0x8bf8a434bae025a8c8e73fd0e80c6d1bb24f423c6cee7765d340ce8ac4dc0efd"
              }
            ]
          }
    })
}

export const getRequests = (uid, type) => async dispatch => {
    dispatch({
        type: GET_REQUESTS_SUCCESS,
        payload:
        {
            "Tue Aug 03 2021": [
              {
                "userUID": "DIgBr8q6oANza4fByt1WLKpbSKH3",
                "slotHash": "0x7238cde176e78a69087b940edc0f69fceedc17f90716461a6cbc5991691fde01",
                "resUID": "x8l8tLYNTCNJ03PqQKgBVF2utH53",
                "address": "0xc12cc487ab3bdf25bf19f72397d240e60cd67f38",
                "docID": "9MIF9rzLySKjzADiJ0EN",
                "token": {
                  "0": "My Restaurant",
                  "1": "0xDBfDa8454b62FB973B837168A93316093347f437",
                  "2": "1627966538191",
                  "3": "1",
                  "4": "4",
                  "5": "0xDBfDa8454b62FB973B837168A93316093347f437",
                  "6": false,
                  "7": false,
                  "8": true,
                  "restaurantName": "My Restaurant",
                  "restaurantAddress": "0xDBfDa8454b62FB973B837168A93316093347f437",
                  "dateTime": "1627966538191",
                  "tableNo": "1",
                  "pax": "4",
                  "ownerAddress": "0xDBfDa8454b62FB973B837168A93316093347f437",
                  "visited": false,
                  "accepted": false,
                  "exist": true
                },
                "user": {
                  "0": "EYLeong",
                  "1": "0xc12CC487AB3Bdf25bf19F72397D240e60cD67f38",
                  "2": "0",
                  "3": "2",
                  "4": true,
                  "userName": "EYLeong",
                  "userAddress": "0xc12CC487AB3Bdf25bf19F72397D240e60cD67f38",
                  "outstandingReservations": "0",
                  "totalReservations": "2",
                  "exist": true
                }
              }
            ]
          }
    })
}
