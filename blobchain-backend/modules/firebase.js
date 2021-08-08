const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Verify that the user has logged into firebase and returns their UID
const verifyToken = async (token) => {
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    return decoded.uid;
  } catch {
    err = new Error("Token verification failed");
    throw err;
  }
};

// Set the user data in firebase. This removes all other data in the user document.
const setUserData = async (uid, data, isRestaurant) => {
  try {
    let col = "users";
    if (isRestaurant) col = "restaurants";
    await db.collection(col).doc(uid).set(data);
  } catch {
    err = new Error("Failed to set user data");
    throw err;
  }
};

// Get the user data in firebase
const getUserData = async (uid, isRestaurant) => {
  try {
    let col = "users";
    if (isRestaurant) col = "restaurants";
    const doc = await db.collection(col).doc(uid).get();
    if (doc.exists) {
      return doc.data();
    } else {
      err = new Error("UID document does not exist");
      throw err;
    }
  } catch (err) {
    if (err.message !== "UID document does not exist") {
      throw new Error("Could not get UID document");
    }
    throw err;
  }
};

const findRestaurantUID = async (address) => {
  try {
    let uid = "";
    const snapshot = await db
      .collection("restaurants")
      .where("address", "==", address)
      .get();
    snapshot.forEach((doc) => {
      uid = doc.id;
    });
    if (uid) return uid;
    throw new Error("restaurant not found");
  } catch (err) {
    if (err.message !== "restaurant not found")
      throw new Error("restaurant query failed");
    throw err;
  }
};

const createRequest = async (resUID, userUID, userAddr, slotHash) => {
  try {
    await db.collection("requests").add({
      userUID,
      resUID,
      address: userAddr,
      slotHash,
    });
  } catch (err) {
    throw new Error("failed to create request");
  }
};

module.exports = {
  verifyToken,
  setUserData,
  getUserData,
  findRestaurantUID,
  createRequest,
};
