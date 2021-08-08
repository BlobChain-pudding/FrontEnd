import { connect } from "./modules/blockchain.js";
import {
  apiGetRequests,
  apiGetSlots,
  apiNewUser,
  apiExistingUser,
  apiCreateSlot,
  apiRejRequest,
  apiAccRequest,
  apiConfirmVisit,
} from "./modules/api.js";

let fbUser;
let request;
let userAddr;
let slotHash;

firebase.auth().onAuthStateChanged(async (user) => {
  if (user) {
    fbUser = user;
  } else {
    // go back to login page?
  }
});

document.getElementById("newUserBtn").addEventListener("click", async () => {
  try {
    await apiNewUser(
      "restaurant@blobchain.com",
      "blobchain",
      "My Restaurant",
      true
    );
  } catch (err) {
    console.error(err);
  }
});

document
  .getElementById("existingUserBtn")
  .addEventListener("click", async () => {
    try {
      await apiExistingUser("restaurant@blobchain.com", "blobchain");
    } catch (err) {
      console.error(err);
    }
  });

document.getElementById("addSlotBtn").addEventListener("click", async () => {
  try {
    await apiCreateSlot(new Date(Date.now()), 1, 4);
  } catch (err) {
    console.error(err);
  }
});

document
  .getElementById("getRequestsBtn")
  .addEventListener("click", async () => {
    try {
      const requests = await apiGetRequests(fbUser.user.uid, "restaurant");
      console.log(JSON.stringify(requests));
      request = requests[Object.keys(requests)[0]][0];
    } catch (err) {
      console.error(err);
    }
  });

document.getElementById("rejRequestBtn").addEventListener("click", async () => {
  try {
    await apiRejRequest(request);
  } catch (err) {
    console.error(err);
  }
});

document.getElementById("accRequestBtn").addEventListener("click", async () => {
  try {
    await apiAccRequest(request);
  } catch (err) {
    console.error(err);
  }
});

document
  .getElementById("getAcceptedSlotsBtn")
  .addEventListener("click", async () => {
    try {
      const currentAccount = await connect();
      const slots = await apiGetSlots(currentAccount, "accepted");
      console.log(JSON.stringify(slots));
      const slot = slots[Object.keys(slots)[0]][0];
      userAddr = slot.token.ownerAddress;
      slotHash = slot.hash;
    } catch (err) {
      console.error(err);
    }
  });

document
  .getElementById("confirmVisitBtn")
  .addEventListener("click", async () => {
    try {
      await apiConfirmVisit(slotHash, userAddr);
    } catch (err) {
      console.error(err);
    }
  });
