import web3 from './web3';
import campaignFactory from './build/CampaignFactory.json';

// const address = '0x0dcb8E8BbeF65aE548F06bb37c9e94cEaF836d60';
const address = '0x77F4Cf1c7e1977478A645d116c3684fAe4357dC8';
// const address = '0x29e2f41270fC154E4Cc334276EF5e10862d51256';
// const address = '0xA34bD3cc52A954e3225635FcF6ae6f6dB6C1565E';

const instance = new web3.eth.Contract(
    campaignFactory.abi,
    address
);

export default instance;