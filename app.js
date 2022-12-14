const express = require('express');
const server = express();
const Web3 = require('web3');
const fs = require('fs/promises');
const format = require('node.date-time');
const axios = require('axios');
const {parse, stringify, toJSON, fromJSON} = require('flatted');
const { count } = require('console');
const minABI = require('./minABI');

let blockNumber = 11633038;
server.set('view engine', 'ejs');
server.set('views', './views');

const provider = new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/40c57167dfff47c38c99a2945b579dd7');
const walletAddress = '0xA145ac099E3d2e9781C9c848249E2e6b256b030D';
// Get ERC20 Token contract instance

const web3 = new Web3(provider);

//Get tokens addresses
server.use('/api', async (req, res) => {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/list?include_platform=true');
      const allCoins = response.data;
      const tokensERC20 = async (allCoins) => {        
       const tokens = allCoins.filter(coin => coin.platforms.ethereum > '');
       console.log(tokens)
       const tokenAddresses = tokens.map(item =>({eth: item.platforms.ethereum, name: item.name }))
       try {
        await fs.writeFile('ERC20tokenadresses.json', JSON.stringify(tokenAddresses))
       } catch (error) {
        console.error(error);
       }       
       return tokens;
      }
      res.send(JSON.stringify(tokensERC20(allCoins)))
    } catch (error) {
      console.error(error);
      res.send(JSON.stringify('APi erroe'))
    };
});
server.get('/promises', async (req, res) => {
  const tokenAdressesJson = await fs.readFile('ERC20tokenadresses.json','utf8');
  const tokenData = JSON.parse(tokenAdressesJson);
  let chunkLenght = 50; 
  let tokensList = [];
  logs = [];
  for  (let i=0; i < tokenData.length - 4000; i+=chunkLenght) {
    console.log('i:' + i)
    console.log('chunck lenght' + chunkLenght)
    let chunk = tokenData.slice(i, i + chunkLenght);
    console.log('довжина запиту :' + chunk.length);    
    let tokenspromises = []
    for (let token of chunk) {    
      const contract = new web3.eth.Contract(minABI, token.eth);
      const tokePromise =  contract.methods.balanceOf(walletAddress).call();
      tokenspromises.push(tokePromise);
    }
    const filterZeroBalances = (response) => {
      if (response.status == 'fulfilled') {
        if (response.value != 0) {
          tokensList.push(response)
        }
      }
    }
    // Promise.all буде очікувати виконання всіх промісів
    await Promise.allSettled(tokenspromises)
      .then(responses =>
        responses.forEach(
          response => filterZeroBalances(response))
        )
    }
    
    console.log(tokensList)
})
//get tokens balances
server.get('/tokens', async (req, res) => {
    const tokenAdressesJson = await fs.readFile('ERC20tokenadresses.json','utf8');
    const tokenData = JSON.parse(tokenAdressesJson);
    let tokensList = [];
    for (let token of tokenData) {
      
      const contract = new web3.eth.Contract(minABI, token.eth);
      try {
        const tokenBalance = await contract.methods.balanceOf(walletAddress).call();
        console.log(`${token.name} balance: ` + tokenBalance)
      if (tokenBalance != 0) {
        console.log(tokenBalance);
        const tokenObj = {
          name: token.name,
          balance: tokenBalance,
        }
        tokensList.push(tokenObj);

      }
      } catch (error) {
        console.log(error)
      }
      
    }
     console.log(tokensList)
     res.end();       
});


//get data from transactions
server.get('/transactions', async (req, res) => {
  let logs, chunks;
  const apiKey = '6TKKBW3C78XAIH1HJEZRMUD651GEA2PTJC'
  chunks = 50000; // Even 10,000 chunks have a few segments that error out
  logs = [];
  for (let i=14900000; i < 15767542; i+=chunks) {
    await axios.get('http://api.etherscan.io/api', {
    params: {
      module: 'account',
      action: 'txlist',
      address: walletAddress,
      startblock: i,
      endblock: i+chunks-1,
      sort: 'asc',
      apikey: apiKey,
    }
  }).then(r => { logs = logs.concat(r.data.result); console.log(r.data.result.length + "success:", i ) }, err => { console.error(i + " failed", err) }).catch(console.log);
  }
  const recepientsArray = logs.map(item => item.to);
  await fs.writeFile(`${walletAddress}.json`, JSON.stringify(recepientsArray));
  res.end();
});
//get coins from transactions
server.get('/coins', async (req, res) => {
  //const tokenData = JSON.parse(tokenAdressesJson);
  const tokenAdressesJson = JSON.parse(await fs.readFile('ERC20tokenadresses.json','utf8'));
  const recepientsArray = JSON.parse(await fs.readFile(`${walletAddress}.json`,'utf8'));
  console.log(recepientsArray.length);
  const tokens = [];
  for ( let recepient of recepientsArray ) {
    const searchResult = tokenAdressesJson.find(item => item.eth == recepient)
    if (searchResult != undefined) {
      tokens.push(searchResult);
    } else {
      // console.log('notToken');
    }
    
  }
  function unique(arr) {
    let result = [];
  
    for (let str of arr) {
      if (!result.includes(str)) {
        result.push(str);
      }
    }  
    return result;
  }
  console.log(unique(tokens))
  res.end();
});
//trying to get JSON rpc request
server.get('/rpc', async (req, res) => {
  tokens = [
    {"eth":"0xd031edafac6a6ae5425e77f936022e506444c242","name":"HERUKA TSANGNYON"},
    {"eth":"0x2b591e99afe9f32eaa6214f7b7629768c40eeb39","name":"HEX"},
    {"eth":"0xf3a2ace8e48751c965ea0a1d064303aca53842b9","name":"HXY Money"},
    {"eth":"0xe61f6e39711cec14f8d6c637c2f4568baa9ff7ee","name":"Hey"},
  ]
  const contractsBatch = (tokens) => {
    const batch = new web3.BatchRequest();
    tokens.map(async ({ eth, name }) => {      
      const contract = new web3.eth.Contract(minABI);
        contract.options.address = eth;
        batch.add(contract.methods.balanceOf(walletAddress).call.request({}, blockNumber));
    })
    return batch;
  } 
  const main = async () => {
    const batch = contractsBatch(tokens);
    const tokenBalances = {};
    const  response  = await batch.execute();
    /*
    response.forEach(({ _hex }, index) => {
      const { name, decimals, symbol } = tokens[index];
      tokenBalances[name] = `${convertToNumber(_hex, decimals)} ${symbol}`;
    });
    */
    console.log(response);
  };
  main();

})




server.listen(3000);

