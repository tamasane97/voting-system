// require("@nomiclabs/hardhat-waffle")
// const fs = require("fs")
// const privateKey = fs.readFileSync(".secret").toString()
// module.exports = {
//   networks: {
//     hardhat: {
//       chainId: 137
//     },
//     mainnet: {
//       url: "https://mainnet.infura.io/v3/8fac68ce2e8147f8abe4178ee2b8e322",
//       accounts: []
//     }
//   },
//   solidity: "0.8.17",
//   reactStrictMode: true,
// };
module.exports = {
  webpack(config, { dev }) {
    if (dev) {
      config.devtool = 'cheap-module-source-map';
    }
    return config;
  }
};