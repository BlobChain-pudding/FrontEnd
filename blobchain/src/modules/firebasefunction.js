import firebase from '../firebase';
const checkAddress = async (uid, isRestaurant) => {
    try {
      let col = "users";
      if (isRestaurant) col = "restaurants";
  
      const doc = await firebase.firestore().collection(col).doc(uid).get();
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
      const snapshot = await firebase.firestore().collection("restaurants").get();
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
      const snapshot = await firebase.firestore()
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
      await firebase.firestore().collection("requests").doc(id).delete();
    } catch (err) {
      throw new Error("Failed to remove request");
    }
  };
  
  export { checkAddress, getRestaurants, getRequests, remRequest };