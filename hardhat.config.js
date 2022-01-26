require("@nomiclabs/hardhat-waffle");
const fs = require("fs")
const privateKey = fs.readFileSync(".secret").toString()
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// // You need to export an object to set up your config
// // Go to https://hardhat.org/config/ to learn more

// /**
//  * @type import('hardhat/config').HardhatUserConfig
//  */
module.exports = {
  networks: {
    hardhat: {
      chainId: 137
     },
    mainnet: {
      url: "https://mainnet.infura.io/v3/8fac68ce2e8147f8abe4178ee2b8e322",
      accounts : [privateKey]
     }
   },
  solidity: "0.8.4",
};
