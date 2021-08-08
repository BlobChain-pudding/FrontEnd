const bc = require("./blockchain");
const fb = require("./firebase");

const tokenHandler = async (req, res) => {
  const token = req.body.token;
  const isRestaurant = req.body.isRestaurant;
  try {
    const uid = await fb.verifyToken(token);
    const toSign = Date.now();
    try {
      await fb.setUserData(uid, { toSign }, isRestaurant);
      res.send({ toSign });
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};

const sigHandler = async (req, res) => {
  const sig = req.body.sig;
  const address = req.body.address;
  const token = req.body.token;
  const isRestaurant = req.body.isRestaurant;

  try {
    const uid = await fb.verifyToken(token);
    const data = await fb.getUserData(uid, isRestaurant);
    const toSign = data.toSign;
    const match = bc.checkSig(sig, String(toSign), address);
    if (match) {
      const userData = { address };
      if (isRestaurant) userData["name"] = req.body.name;
      fb.setUserData(uid, userData, req.body.isRestaurant);
      res.send({});
    } else {
      console.error(new Error("Signature verification failed"));
      res.sendStatus(400);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const reqHandler = async (req, res) => {
  const resAddr = req.body.resAddr;
  const slotHash = req.body.slotHash;
  const token = req.body.token;

  try {
    const userUID = await fb.verifyToken(token);
    const data = await fb.getUserData(userUID, false);
    const userAddr = data.address;
    const resUID = await fb.findRestaurantUID(resAddr);
    await fb.createRequest(resUID, userUID, userAddr, slotHash);
    res.send({});
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

module.exports = {
  tokenHandler,
  sigHandler,
  reqHandler,
};
