import { contractAbi } from "./abis";
import Web3 from 'web3';
const ethereum  = window.ethereum;

const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

const contract = new web3.eth.Contract(
  contractAbi,
  "0xD2204B472EfbBf15097E01E2E905606C547A57E6"
);
contract.defaultChain = "rinkeby";

/*****************************************/
/* Detect the MetaMask Ethereum provider */
/*****************************************/
if (!window.ethereum) {
  console.error("Please install MetaMask!");
}

const connectBlob = async () => {
  try {
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    return accounts[0];
  } catch (err) {
    if (err.code === 4001) {
      // EIP-1193 userRejectedRequest error
      // If this happens, the user rejected the connection request.
      throw new Error("Connection request rejected");
    } else {
      throw new Error("Connection error");
    }
  }
};

const personalSign = async (nonce) => {
  const currentAccount = await connectBlob();
  return new Promise((res, rej) => {
    web3.eth.personal
      .sign(nonce, currentAccount, (err, result) => {
        if (err) {
          rej(new Error("Unable to sign nonce"));
        } else {
          res(result);
        }
      })
      .catch(() => {
        rej(new Error("Unable to sign nonce"));
      });
  });
};

const getUser = async (address) => {
  return new Promise((res, rej) => {
    contract.methods
      .addressToUser(address)
      .call((err, result) => {
        if (err) {
          rej(new Error("Unable to get user"));
        } else {
          res(result);
        }
      })
      .catch(() => {
        rej(new Error("Unable to get user"));
      });
  });
};

const getRestaurant = async (address) => {
  return new Promise((res, rej) => {
    contract.methods
      .addressToRestaurant(address)
      .call((err, result) => {
        if (err) {
          rej(new Error("Unable to get restaurant"));
        } else {
          res(result);
        }
      })
      .catch(() => {
        rej(new Error("Unable to get restaurant"));
      });
  });
};

const registerUser = async (name) => {
  const currentAccount = await connectBlob();
  return new Promise((resolve, reject) => {
    contract.methods
      .registerUser(name)
      .send({ from: currentAccount }, (err, res) => {
        if (err) reject(new Error("failed to register user"));
        else resolve(res);
      })
      .catch(() => {
        reject(new Error("failed to register user"));
      });
  });
};

const registerRestaurant = async (name) => {
  const currentAccount = await connectBlob();
  return new Promise((resolve, reject) => {
    contract.methods
      .registerRestaurant(name)
      .send({ from: currentAccount }, (err, res) => {
        if (err) reject(new Error("failed to register restaurant"));
        else resolve(res);
      })
      .catch(() => {
        reject(new Error("failed to register restaurant"));
      });
  });
};

const createSlot = async (date, table, pax) => {
  const currentAccount = await connectBlob();
  return new Promise((resolve, reject) => {
    contract.methods
      .createReservation(date.getTime(), table, pax)
      .send({ from: currentAccount }, (err, res) => {
        if (err) reject(new Error("failed to create reservation slot"));
        else resolve(res);
      })
      .catch(() => {
        reject(new Error("failed to create reservation slot"));
      });
  });
};

const getHashes = async (address) => {
  return new Promise((resolve, reject) => {
    contract.methods
      .getRestaurantReservationsAll(address)
      .call((err, res) => {
        if (err) {
          reject(new Error("Unable to get restaurant slot hashes"));
        } else {
          resolve(res);
        }
      })
      .catch(() => {
        reject(new Error("Unable to get restaurant slot hashes"));
      });
  });
};

const getUserHashes = async (address) => {
  return new Promise((resolve, reject) => {
    contract.methods
      .getUserReservationsAll(address)
      .call((err, res) => {
        if (err) {
          reject(new Error("Unable to get user slot hashes"));
        } else {
          resolve(res);
        }
      })
      .catch(() => {
        reject(new Error("Unable to get user slot hashes"));
      });
  });
};

const getSlotDetails = async (hash) => {
  return new Promise((resolve, reject) => {
    contract.methods
      .hashToToken(hash)
      .call((err, res) => {
        if (err) {
          reject(new Error("Unable to get slot details"));
        } else {
          resolve(res);
        }
      })
      .catch(() => {
        reject(new Error("Unable to get slot details"));
      });
  });
};

const getSlots = async (address, type) => {
  try {
    const slotHashes = await getHashes(address);
    const slots = [];
    for (const hash of slotHashes) {
      const token = await getSlotDetails(hash);
      if (type === "unaccepted") {
        if (!token.accepted) slots.push({ token, hash });
      } else if (type === "accepted") {
        if (token.accepted) slots.push({ token, hash });
      } else {
        slots.push({ token, hash });
      }
    }
    return slots;
  } catch (err) {
    throw new Error("Unable to get restaurant slots");
  }
};

const getUserSlots = async (address, type) => {
  try {
    const slotHashes = await getUserHashes(address);
    const slots = [];
    for (const hash of slotHashes) {
      const token = await getSlotDetails(hash);
      if (type === "visited") {
        if (token.visited) slots.push({ token, hash });
      } else if (type === "unvisited") {
        if (!token.visited) slots.push({ token, hash });
      } else {
        slots.push({ token, hash });
      }
    }
    return slots;
  } catch (err) {
    throw new Error("Unable to get restaurant slots");
  }
};

const acceptRequest = async (slotHash, address) => {
  const currentAccount = await connectBlob();
  return new Promise((resolve, reject) => {
    contract.methods
      .acceptReservation(slotHash, address)
      .send({ from: currentAccount }, (err, res) => {
        if (err) reject(err /*new Error("Unable to accept request")*/);
        else resolve(res);
      })
      .catch(() => {
        reject(new Error("Unable to accept request"));
      });
  });
};

const visitedRestaurant = async (slotHash, address) => {
  const currentAccount = await connectBlob();
  return new Promise((resolve, reject) => {
    contract.methods
      .visitedRestaurant(slotHash, address)
      .send({ from: currentAccount }, (err, res) => {
        if (err) reject(new Error("Unable to confirm visitation"));
        else resolve(res);
      })
      .catch(() => {
        reject(new Error("Unable to confirm visitation"));
      });
  });
};

const postReview = async (content, author, slotHash) => {
  const currentAccount = await connectBlob();
  return new Promise((resolve, reject) => {
    contract.methods
      .postReview(content, author, slotHash)
      .send({ from: currentAccount }, (err, res) => {
        if (err) reject(new Error("Unable to send review"));
        else resolve(res);
      })
      .catch(() => {
        reject(new Error("Unable to send review"));
      });
  });
};

const getReview = async (address, idx) => {
  return new Promise((resolve, reject) => {
    contract.methods
      .retrieveReview(address, idx)
      .call((err, res) => {
        if (err) reject(new Error("Unable to retrieve review"));
        else resolve(res);
      })
      .catch(() => {
        reject(new Error("Unable to retrieve review"));
      });
  });
};

const getReviews = async (address) => {
  let count = 0;
  const reviews = [];
  try {
    while (true) {
      const review = await getReview(address, count);
      if (!review["0"]) break;
      else reviews.push(review);
      count++;
    }
    return reviews;
  } catch {
    throw new Error("Unable to retrieve reviews");
  }
};

export {
  personalSign,
  connectBlob,
  registerUser,
  registerRestaurant,
  getUser,
  getRestaurant,
  createSlot,
  getSlots,
  getSlotDetails,
  getUserSlots,
  acceptRequest,
  visitedRestaurant,
  postReview,
  getReviews,
};