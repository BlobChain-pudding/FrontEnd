import {
    connectBlob,
    getReviews,
    getSlotDetails,
    getSlots,
    getUser,
    getUserSlots,
    personalSign,
    registerUser,
    registerRestaurant,
    postReview,
    createSlot,
    acceptRequest,
    visitedRestaurant,
  } from "./blockchain.js";
  import { getRequests, getRestaurants, remRequest } from "./firebasefunction.js";
  import { postData } from "./requests.js";
  import firebase from '../firebase';
  const apiNewUser = async (email, password, name, isRestaurant) => {
    console.log(email, password, name, isRestaurant);
    const credential = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    const user = credential.user;
    await user.updateProfile({
      displayName: name,
    });
    const token = await user.getIdToken(true);
    let data = {
      token,
      isRestaurant,
    };
    data = await postData("http://localhost:3000/token", data);
    const toSign = String(data.toSign);
    const currentAccount = await connectBlob();
    const sig = await personalSign(toSign);
    data = {
      sig,
      token,
      address: currentAccount,
      name: user.displayName,
      isRestaurant,
    };
    await postData("http://localhost:3000/sig", data);
    if (isRestaurant) await registerRestaurant(user.displayName);
    else await registerUser(user.displayName);
    return user;
  };

  
  const apiGetRestaurants = async () => {
    return getRestaurants();
  };
  
  const apiCreateSlot = async (dateMilli, tableNo, pax) => {
    return createSlot(dateMilli, tableNo, pax);
  };
  
  const apiGetSlots = async (restaurantAddr, isAccepted) => {
    const slots = {};
    const rawSlots = await getSlots(restaurantAddr, isAccepted);
    for (const slot of rawSlots) {
      const date = new Date(Number.parseInt(slot.token.dateTime));
      const dateString = date.toDateString();
      if (!slots[dateString]) slots[dateString] = [];
      slots[dateString].push(slot);
    }
    return slots;
  };
  
  const apiMakeRequest = async (fbUser, restaurantAddr, slotHash) => {
    const token = await fbUser.getIdToken(true);
    await postData("http://localhost:3000/request", {
      resAddr: restaurantAddr,
      slotHash,
      token,
    });
  };
  
  const apiGetRequests = async (uid, type) => {
    const requests = {};
    const rawRequests = await getRequests(uid, type);
    for (const request of rawRequests) {
      const userDetails = await getUser(request.address);
      const slotDetails = await getSlotDetails(request.slotHash);
      const date = new Date(Number.parseInt(slotDetails.dateTime));
      const dateString = date.toDateString();
      if (!requests[dateString]) requests[dateString] = [];
      request["token"] = slotDetails;
      request["user"] = userDetails;
      requests[dateString].push(request);
    }
    return requests;
  };
  
  const apiRejRequest = async (request) => {
    return remRequest(request.docID);
  };
  
  const apiAccRequest = async (request) => {
    await acceptRequest(request.slotHash, request.address);
    return remRequest(request.docID);
  };
  
  const apiGetReservations = async (isVisited) => {
    const currentAccount = await connectBlob();
    const slots = {};
    const rawSlots = await getUserSlots(currentAccount, isVisited);
    for (const slot of rawSlots) {
      const date = new Date(Number.parseInt(slot.token.dateTime));
      const dateString = date.toDateString();
      if (!slots[dateString]) slots[dateString] = [];
      slots[dateString].push(slot);
    }
    return slots;
  };
  
  const apiConfirmVisit = async (slotHash, userAddr) => {
    return visitedRestaurant(slotHash, userAddr);
  };
  
  const apiPostReview = async (content, author, slotHash) => {
    return postReview(content, author, slotHash);
  };
  
  const apiGetReviews = async (restaurantAddr) => {
    const reviews = {};
    const rawReviews = await getReviews(restaurantAddr);
    for (const review of rawReviews) {
      const slotDetails = await getSlotDetails(review[2]);
      const date = new Date(Number.parseInt(slotDetails.dateTime));
      const dateString = date.toDateString();
      if (!reviews[dateString]) reviews[dateString] = [];
      review["token"] = slotDetails;
      reviews[dateString].push(review);
    }
    return reviews;
  };
  
  export {
    apiNewUser,
    // apiExistingUser,
    apiGetRestaurants,
    apiCreateSlot,
    apiGetSlots,
    apiMakeRequest,
    apiGetRequests,
    apiRejRequest,
    apiAccRequest,
    apiGetReservations,
    apiConfirmVisit,
    apiPostReview,
    apiGetReviews,
  };