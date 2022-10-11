const express = require('express');
const server = express();
const Web3 = require('web3');
const fs = require('fs/promises');
const format = require('node.date-time');
const USDTABI = require('./USDTABI');
const USDCABI = require('./USDCABI');
const LPTABI = require('./LPTABI');
const SAIABI = require('./SAIABI');
const IDKABI = require('./IDKABI');

server.set('view engine', 'ejs');
server.set('views', './views');


const provider = new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/40c57167dfff47c38c99a2945b579dd7');

const web3 = new Web3(provider);

web3.eth.getBalance('0xA145ac099E3d2e9781C9c848249E2e6b256b030D').then(balance => {
  const ether = web3.utils.fromWei(balance, 'ether');
  console.log(ether);
  
  
  //return ether
});




const USDC = async () => {
  const contract = new web3.eth.Contract(USDCABI, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48');
  const walletAddress = '0xA145ac099E3d2e9781C9c848249E2e6b256b030D';
  contract.defaultAccount = walletAddress;
  const balance = await contract.methods.balanceOf(walletAddress).call();
  balanceDecimals = balance/100000000000000;
  console.log('USDC Balance: ' + balanceDecimals);
};
// USDC();

 const USDT = async () => {
  const contractUSDT = new web3.eth.Contract(USDTABI, '0xdAC17F958D2ee523a2206206994597C13D831ec7');
  const walletAddress = '0xA145ac099E3d2e9781C9c848249E2e6b256b030D';
  contractUSDT.defaultAccount = walletAddress;
  const balanceUSDT = await contractUSDT.methods.balanceOf(walletAddress).call();
  balanceDecimals = balanceUSDT/1000000;
  console.log('USDT Balance: ' + balanceDecimals);
};
 USDT();

const LPT = async () => {
  const contract = new web3.eth.Contract(LPTABI, '0x58b6A8A3302369DAEc383334672404Ee733aB239');
  const walletAddress = '0xA145ac099E3d2e9781C9c848249E2e6b256b030D';
  contract.defaultAccount = walletAddress;
  const balance = await contract.methods.balanceOf(walletAddress).call();
  balanceDecimals = balance/1000000000000000000;
  console.log('LPT Balance: ' + balanceDecimals);
};
LPT();


const SAI = async () => {
  const contract = new web3.eth.Contract(SAIABI, '0x58b6A8A3302369DAEc383334672404Ee733aB239');
  const walletAddress = '0xA145ac099E3d2e9781C9c848249E2e6b256b030D';
  contract.defaultAccount = walletAddress;
  const balance = await contract.methods.balanceOf(walletAddress).call();
  balanceDecimals = balance/1000000000000000000;
  console.log('SAI Balance: ' + balanceDecimals);
};
SAI();


const IDK = async () => {
  const contract = new web3.eth.Contract(IDKABI, '0x61fd1c62551850D0c04C76FcE614cBCeD0094498');
  const walletAddress = '0xA145ac099E3d2e9781C9c848249E2e6b256b030D';
  contract.defaultAccount = walletAddress;
// console.log(contract.methods.balanceOf(walletAddress));
 // const balance = await contract.methods.balanceOf(walletAddress).call();
 // balanceDecimals = balance/1000000000;
//  console.log('IDK Balance: ' + balanceDecimals);
};
IDK();


function logTime(){
  return new Date().format("Y-M-d H:M:S")+'';
}
fs.appendFile('readme.log', logTime()+'balance'+'\n');


server.listen(3000);