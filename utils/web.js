import Web3 from "web3";
import config from "../config/config";

let web3 = new Web3(config.infure[1]);

export const getTokenId = async (txn) => {
  debugger;
  let tx_data = await web3.eth.getTransactionReceipt(txn);
  for (let i in tx_data.logs) {
    for (let j = 0; j < tx_data.logs[i]?.topics.length; j++) {
      if (
        tx_data.logs[i]?.topics[j] ==
        "0x6bb7ff708619ba0610cba295a58592e0451dee2622938c8755667688daf3529b"
      ) {
        console.log(tx_data.logs[i]?.topics[j + 1]);
        let x = await web3.utils.hexToNumber(tx_data.logs[i]?.topics[j + 1]);
        console.log(x); //x is the token id
        return x;
      }
    }
  }
};
