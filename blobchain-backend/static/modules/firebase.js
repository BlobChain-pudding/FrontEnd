const firebaseConfig = {
  apiKey: "AIzaSyAONKOmPL2LxtXkV7f_RDEBBAQz8bvtX0k",
  authDomain: "blobchain-d9dbe.firebaseapp.com",
  projectId: "blobchain-d9dbe",
  storageBucket: "blobchain-d9dbe.appspot.com",
  messagingSenderId: "92522396122",
  appId: "1:92522396122:web:91d5dec280e045be5d28e3",
};

firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);

const db = firebase.firestore();

const checkAddress = async (uid, isRestaurant) => {
  try {
    let col = "users";
    if (isRestaurant) col = "restaurants";

    const doc = await db.collection(col).doc(uid).get();
    if (doc.exists) {
      const value = doc.data()["address"];
      if (value) {
        return value;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (err) {
    throw err;
  }
};

const getRestaurants = async () => {
  try {
    const restaurants = [];
    const snapshot = await db.collection("restaurants").get();
    snapshot.forEach((doc) => {
      const name = doc.data().name;
      const address = doc.data().address;
      if (name && address) restaurants.push({ name, address });
    });
    return restaurants;
  } catch (err) {
    throw new Error("get restaurants failed");
  }
};

const getRequests = async (uid, type) => {
  try {
    const requests = [];
    let uidType = "resUID";
    if (type === "user") uidType = "userUID";
    const snapshot = await db
      .collection("requests")
      .where(uidType, "==", uid)
      .get();
    snapshot.forEach((doc) => {
      const data = doc.data();
      data["docID"] = doc.id;
      requests.push(data);
    });
    return requests;
  } catch (err) {
    throw new Error("Unable to get requests");
  }
};

const remRequest = async (id) => {
  try {
    await db.collection("requests").doc(id).delete();
  } catch (err) {
    throw new Error("Failed to remove request");
  }
};

export { checkAddress, getRestaurants, getRequests, remRequest };
