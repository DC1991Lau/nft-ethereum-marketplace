import "@nomiclabs/hardhat-waffle";
import fs from "fs";
const privateKey = fs.readFileSync(".secret").toString();
const projectId = "482b237020ad42e89e60f763c975c864";

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mumbai: {
      url: `https://polygon-mainnet.infura.io/v3/${projectId}`,
      accounts: [privateKey],
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${projectId}`,
      accounts: [privateKey],
    },
  },
  solidity: "0.8.4",
};
