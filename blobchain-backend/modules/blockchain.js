const Web3 = require("web3");
const web3 = new Web3();

const checkSig = (sig, nonce, address) => {
  const addr = web3.eth.accounts.recover(nonce, sig);
  return addr.toLowerCase() === address.toLowerCase();
};

module.exports = {
  checkSig,
};
