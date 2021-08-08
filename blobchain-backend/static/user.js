import { connect } from "./modules/blockchain.js";
import {
  apiExistingUser,
  apiGetRequests,
  apiGetReservations,
  apiGetRestaurants,
  apiGetReviews,
  apiGetSlots,
  apiMakeRequest,
  apiNewUser,
  apiPostReview,
} from "./modules/api.js";

let restaurantAddr;
let slotHash;
let fbUser;

firebase.auth().onAuthStateChanged(async (user) => {
  if (user) {
    fbUser = user;
  } else {
    // go back to login page?
  }
});

document.getElementById("newUserBtn").addEventListener("click", async () => {
  try {
    await apiNewUser("user@blobchain.com", "blobchain", "My User", false);
  } catch (err) {
    console.error(err);
  }
});

document
  .getElementById("existingUserBtn")
  .addEventListener("click", async () => {
    try {
      await apiExistingUser("user@blobchain.com", "blobchain");
    } catch (err) {
      console.error(err);
    }
  });

document
  .getElementById("getRestaurantsBtn")
  .addEventListener("click", async () => {
    try {
      const restaurants = await apiGetRestaurants();
      console.log(JSON.stringify(restaurants));
      restaurantAddr = restaurants[0].address;
    } catch (err) {
      console.error(err);
    }
  });

document.getElementById("getSlotsBtn").addEventListener("click", async () => {
  try {
    const slots = await apiGetSlots(restaurantAddr, "unaccepted");
    console.log(JSON.stringify(slots));
    slotHash = slots[Object.keys(slots)[0]][0].hash;
  } catch (err) {
    console.error(err);
  }
});

document
  .getElementById("makeRequestBtn")
  .addEventListener("click", async () => {
    try {
      await apiMakeRequest(fbUser, restaurantAddr, slotHash);
    } catch (err) {
      console.error(err);
    }
  });

document
  .getElementById("getRequestsBtn")
  .addEventListener("click", async () => {
    try {
      const requests = await apiGetRequests(fbUse.uid, "user");
      console.log(JSON.stringify(requests));
    } catch (err) {
      console.error(err);
    }
  });

document
  .getElementById("getReservationsBtn")
  .addEventListener("click", async () => {
    try {
      const currentAccount = await connect();
      const slots = await apiGetReservations(currentAccount, "unvisited");
      console.log(JSON.stringify(slots));
    } catch (err) {
      console.error(err);
    }
  });

document.getElementById("getPoVBtn").addEventListener("click", async () => {
  try {
    const currentAccount = await connect();
    const slots = await apiGetReservations(currentAccount, "visited");
    console.log(JSON.stringify(slots));
    slotHash = slots[Object.keys(slots)[0]][0].hash;
  } catch (err) {
    console.error(err);
  }
});

document.getElementById("postReviewBtn").addEventListener("click", async () => {
  try {
    await apiPostReview("This is a review", fbUser.user.displayName, slotHash);
  } catch (err) {
    console.error(err);
  }
});

document.getElementById("getReviewsBtn").addEventListener("click", async () => {
  try {
    const reviews = await apiGetReviews(restaurantAddr);
    console.log(JSON.stringify(reviews));
  } catch (err) {
    console.error(err);
  }
});
