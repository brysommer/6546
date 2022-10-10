const express = require('express');
const server = express();
const Web3 = require('web3');
const fs = require('fs/promises');
const format = require('node.date-time');

server.set('view engine', 'ejs');
server.set('views', './views');

const provider = new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/40c57167dfff47c38c99a2945b579dd7');

const web3 = new Web3(provider);

web3.eth.getBalance('0xA145ac099E3d2e9781C9c848249E2e6b256b030D').then(balance => {
  const ether = web3.utils.fromWei(balance, 'ether');
  console.log(ether);
  //return ether
});

function logTime(){
  return new Date().format("Y-M-d H:M:S")+'';
}
fs.appendFile('readme.log', logTime()+'balance'+'\n');


server.listen(3000);