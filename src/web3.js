//By default Metamask automatically creates a web3 module which will interact with the client app
//This will be a different version of web3 - an older one
//We wish to use our version of web3 
//But we need the other version's provider as it is directly connected to Metamask which has client's public and private keys
//So our version op web3 will hijack the other's Provider and function properly.

import Web3 from "web3";
 
window.ethereum.request({ method: "eth_requestAccounts" });
 
const web3 = new Web3(window.ethereum);
 
export default web3;