import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";

import type { NextPage } from "next";

import { nftaddress, nftmarketaddress } from "../config";

import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import NFTMarket from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";

const Home: NextPage = () => {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");

  useEffect(() => {
    loadNFTs();
  }, []);

  const loadNFTs = useCallback(async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://matic-mumbai.chainstacklabs.com"
    );
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
    const marketContract = new ethers.Contract(
      nftmarketaddress,
      NFTMarket.abi,
      provider
    );
    const data = await marketContract.fetchMarketItems();

    try {
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
            name: meta.data.name,
            description: meta.data.description,
          };

          return item;
        })
      );

      console.log(items);
      setNfts(items);
      setLoadingState("loaded");
    } catch (error) {
      console.log(error);
    }
  }, [nfts]);

  const buyNFT = useCallback(async (nft) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      nftmarketaddress,
      NFTMarket.abi,
      signer
    );

    const price = ethers.utils.parseUnits(nft.price.toString(), "ether");

    const transaction = await contract.createMarketSale(
      nftaddress,
      nft.tokenId,
      {
        value: price,
      }
    );

    await transaction.wait();

    loadNFTs();
  }, []);

  if (loadingState === "loaded" && !nfts.length)
    return <h1 className="text-3xl">No NFTs</h1>;

  console.log(loadingState);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
      {nfts.map((nft, i) => (
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
            <button
              className="w-full bg-gray-900 text-white font-bold py-2 px-12 rounded"
              onClick={() => buyNFT(nft)}
            >
              Buy
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
