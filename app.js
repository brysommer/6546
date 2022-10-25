const express = require('express');
const server = express();
const Web3 = require('web3');
const fs = require('fs/promises');
const format = require('node.date-time');
const axios = require('axios');
const {parse, stringify, toJSON, fromJSON} = require('flatted');
const { count } = require('console');

server.set('view engine', 'ejs');
server.set('views', './views');


const provider = new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/40c57167dfff47c38c99a2945b579dd7');

const web3 = new Web3(provider);

web3.eth.getBalance('0xA145ac099E3d2e9781C9c848249E2e6b256b030D').then(balance => {
  const ether = web3.utils.fromWei(balance, 'ether');
  console.log(ether);
  
  
  //return ether
});

const minABI = [
  // balanceOf
  {
    "constant":true,
    "inputs":[{"name":"_owner","type":"address"}],
    "name":"balanceOf",
    "outputs":[{"name":"balance","type":"uint256"}],
    "type":"function"
  },
  // decimals
  {
    "constant":true,
    "inputs":[],
    "name":"decimals",
    "outputs":[{"name":"","type":"uint8"}],
    "type":"function"
  }
];

server.use('/api', (req, res) => {
  
   const getData = async () => {
    let count = 0;
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/list?include_platform=true');

   //   response.forEah(element => {
    //    count = +1;
  //    })
      console.log(response);
      console.log(Array.isArray(response));
      myArray = JSON.parse(JSON.stringify(response));
      console.log(Array.isArray(myArray));


    } catch (error) {
      console.error(error);
    };

    console.log(count);

  };
  getData();

});

const USDC = async () => {
  const contract = new web3.eth.Contract(minABI, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48');
  const walletAddress = '0xA145ac099E3d2e9781C9c848249E2e6b256b030D';
 // contract.defaultAccount = walletAddress;
  const balance = await contract.methods.balanceOf(walletAddress).call();
  balanceDecimals = balance;
  console.log('USDC Balance: ' + balanceDecimals);
  
// Call balanceOf function
// contract.methods.balanceOf(walletAddress, ( balance) => {
  // Get decimals
  const getDecimals = await contract.methods.decimals().call();
  const currentBalance = balance/(10**getDecimals);
  console.log(currentBalance);
};
 USDC();








function logTime(){
  return new Date().format("Y-M-d H:M:S")+'';
}
fs.appendFile('readme.log', logTime()+'balance'+'\n');


server.listen(3000);