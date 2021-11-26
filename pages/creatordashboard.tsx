import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";

import { nftaddress, nftmarketaddress } from "../config";

import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import NFTMarket from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";

const CreatorDashboard: React.FC = () => {
  const [myCreatedNFTs, setMyCreatedNFTs] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");

  useEffect(() => {
    loadMyCreatedNFTs();
  }, []);

  const loadMyCreatedNFTs = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const marketContract = new ethers.Contract(
      nftmarketaddress,
      NFTMarket.abi,
      signer
    );
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);

    const data = await marketContract.fetchItemsCreated();

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);

        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
        };

        return item;
      })
    );

    setMyCreatedNFTs(items);
    setLoadingState("loaded");
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
      {myCreatedNFTs.map((nft, i) => (
        <div key={i} className="border shadow rounded-xl overflow-hidden">
          <img src={nft.image} />
          <div className="p-4">
            <p className="text-2xl font-semibold">{nft.name}</p>
            <div style={{ height: "70px", overflow: "hidden" }}>
              <p className="text-gray-400">{nft.description}</p>
            </div>
          </div>
          <div className="p-4 bg-black">
            <p className="text-2xl mb-4 font-bold text-white">
              {nft.price} ETH
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CreatorDashboard;
