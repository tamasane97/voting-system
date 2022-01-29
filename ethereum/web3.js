import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    // we are in the browser and metamask is running
    web3 = new Web3(window.web3.currentProvider);
}
else {
    // we are on the server or the user is not running metamask
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/8fac68ce2e8147f8abe4178ee2b8e322'
    );
    web3 = new Web3(provider);
}

export default web3;