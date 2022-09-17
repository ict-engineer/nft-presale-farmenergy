/**
    * @description      : 
    * @author           : Winner
    * @group            : 
    * @created          : 25/12/2021 - 15:15:09
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 25/12/2021
    * - Author          : Winner
    * - Modification    : 
**/
import React, { useState, useEffect, useContext } from "react";
import Home from './pages/Home';
import Presale from './pages/Presale';
import Playgame from './pages/Playgame';
import Marketplace from './pages/Marketplace';
import { Route, Routes } from "react-router-dom";
import { Navbar } from './components/organisms';
import Music from './assets/music/Music.mp3'
import ReactAudioPlayer from 'react-audio-player';

import web3 from './connection/web3';
import Web3Context from './store/web3-context';
import CowNFTContext from './store/CowNFTContext';
import CowNFT from './abis/CowNFT.json';

import FarmNFTContext from './store/FarmNFTContext';
import FarmNFT from './abis/FarmNFT.json';

import ConnectButton from './components/organisms/ConnectButton/ConnectButton'
import Loading from './components/organisms/Loading/Loading'


function App() {
  const web3Ctx = useContext(Web3Context);
  const cowNFTContext = useContext(CowNFTContext);
  const farmNFTContext = useContext(FarmNFTContext);
  const [audio] = useState(new Audio(Music));
  const [account, setAccount] = useState(null);
  const [loadingState, setLoadingState] = useState(false)

  const connectMetamask = async () => {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
      console.error('Erorr', error);
    }
  }

  useEffect(() => {
    document.body.addEventListener("load", () => {
      const audioEl = document.getElementsByClassName("audio-element")[0]
      audioEl.play();
    })

    if (!web3) {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
      return;
    }

    const loadBlockchainData = async () => {
      // Request accounts acccess if needed
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      } catch (error) {
        console.error('Erorr', error);
      }

      // Set Loading State true
      setLoadingState(true)
      // Load account
      const account = await web3Ctx.loadAccount(web3);
      console.log('Account', account);
      // Load Network ID
      const networkId = await web3Ctx.loadNetworkId(web3);
      console.log('Network ID', networkId)
      // Load Cow Infos
      const cowDeployedNetwork = CowNFT.networks[networkId];
      console.log('Deployed Network', cowDeployedNetwork)
      const farmDeployedNetwork = FarmNFT.networks[networkId];
      const cowContract = await cowNFTContext.loadContract(web3, CowNFT, cowDeployedNetwork);
      const farmContract = await farmNFTContext.loadContract(web3, FarmNFT, farmDeployedNetwork);

      // let typeCount = await cowNFTContext.loadTypeCount(cowContract)
      // const cowTypes = await cowNFTContext.loadCowTypes(cowContract, typeCount)
      // let owner = await cowNFTContext.loadOwner(cowContract)
      // Load Farm Infos
      // const farmDeployedNetwork = FarmNFT.networks[networkId];
      // console.log('Deployed Network', farmDeployedNetwork)
      // const farmContract = await farmNFTContext.loadContract(web3, FarmNFT, farmDeployedNetwork);
      // const farmTypes = await farmNFTContext.loadFarmType(farmContract)
      // owner = await farmNFTContext.loadOwner(farmContract)
      // console.log('Owner Owner Owner', owner)

      let tmpAccount = account
      setAccount(tmpAccount)

      // console.log('CowContract', cowContract)
      // console.log('FarmContract', farmContract)
      // console.log('IsSame?', cowContract == farmContract)

      // const farmDeployedNetwork = FarmNFT.networks[networkId];
      // const farmContract = farmNFTContext.loadContract(web3, FarmNFT, farmDeployedNetwork);

      // if (cowContract && farmContract) {
      //   console.log('Contracts OK')
      // } else {
      //   alert('NFTs not deployed to detected network.')
      // }

      window.ethereum.on('accountsChanged', async (accounts) => {
        let tmpAccount = await web3Ctx.loadAccount(web3);
        setAccount(tmpAccount)
        console.log('TmpAccount', tmpAccount)
        // await cowNFTContext.loadOwner(cowContract)
        // accounts[0] && marketplaceCtx.loadUserFunds(mktContract, accounts[0]);
      })

      // Metamask Event Subscription - Network changed
      window.ethereum.on('chainChanged', (chainId) => {
        window.location.reload();
      });

      setLoadingState(false)
    };

    loadBlockchainData();
    console.log('LoadingState', loadingState)
  }, []);

  return (
    <>
      {
        loadingState && (
          <Loading />
        )
      }
      <div className="App" >
        <audio playsInline autoPlay loop className="audio-element">
          <source src={Music} type="audio/mpeg"></source>
        </audio>
        <Navbar
          connectMetamask={connectMetamask}
        />
        <ReactAudioPlayer
          src={Music}
          autoPlay
          loop
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/presale" element={<Presale />} />
          <Route path="/playgame" element={<Playgame />} />
          <Route path="/marketplace" element={<Marketplace />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
