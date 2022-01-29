const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

// deletes build folder and files
const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

// path to solidity contract
const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'UTF-8');

// compiles and stores the output from solc compiler
var input = {
    language: 'Solidity',
    sources: {
        'Campaign.sol' : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
};

var output = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Campaign.sol'];  

// creates build folder if does not exist
fs.ensureDirSync(buildPath);

// iterates through the contracts (total 2)
for(let contract in output) {
    // creates respective json files
    fs.outputJsonSync(
        path.resolve(buildPath, contract + '.json'),
        output[contract]
    );
}