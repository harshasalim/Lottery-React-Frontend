import Web3 from 'web3';

window.ethereum.enable();

const currProvider = window.web3.currentProvider;
const web3 = new Web3(currProvider);//window is a reference to window global variable

export default web3;
