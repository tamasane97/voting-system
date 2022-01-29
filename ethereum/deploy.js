const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const campaignFactory = require('../ethereum/build/CampaignFactory.json');

const provider = new HDWalletProvider(
    'kitchen eager piece shaft wealth prepare unfold same risk denial excess loud',
    'https://rinkeby.infura.io/v3/8fac68ce2e8147f8abe4178ee2b8e322'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);

    console.log('Attempting to deploy from account: ', accounts[0]);

    const result = await new web3.eth.Contract(campaignFactory.abi)
        .deploy({ data: '0x' + campaignFactory.evm.bytecode.object })
        .send({ from: accounts[0], gas: '3000000' });

    console.log('Contract deployed to: ', result.options.address);
}

deploy();