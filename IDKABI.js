// 20221011164652
// http://api.etherscan.io/api?module=contract&action=getabi&address=0xe7bd68547f41413a6baa7609550a7eb58c84c406&format=raw
const IDKABI =
[
    {
      "constant": false,
      "inputs": [
        {
          "name": "newImplementation",
          "type": "address"
        }
      ],
      "name": "upgradeTo",
      "outputs": [
        
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "newImplementation",
          "type": "address"
        },
        {
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "upgradeToAndCall",
      "outputs": [
        
      ],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        
      ],
      "name": "implementation",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "newAdmin",
          "type": "address"
        }
      ],
      "name": "changeAdmin",
      "outputs": [
        
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        
      ],
      "name": "admin",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "_logic",
          "type": "address"
        },
        {
          "name": "_admin",
          "type": "address"
        },
        {
          "name": "_data",
          "type": "bytes"
        }
      ],
      "payable": true,
      "stateMutability": "payable",
      "type": "constructor"
    },
    {
      "payable": true,
      "stateMutability": "payable",
      "type": "fallback"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "previousAdmin",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "newAdmin",
          "type": "address"
        }
      ],
      "name": "AdminChanged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "implementation",
          "type": "address"
        }
      ],
      "name": "Upgraded",
      "type": "event"
    }
  ];

  module.exports = IDKABI;