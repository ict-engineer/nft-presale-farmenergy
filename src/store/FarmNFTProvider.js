/**
    * @description      : 
    * @author           : Winner
    * @group            : 
    * @created          : 16/12/2021 - 03:44:27
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 16/12/2021
    * - Author          : Winner
    * - Modification    : 
**/
import { useReducer } from 'react';

import HexToNumber from '../utils/math';
import FarmNFTContext from './FarmNFTContext';
import NumberToBN from 'number-to-bn';

const defaultFarmNFTState = {
  contract: null,
  tokenCount: null,
  farmNFT: [],
  farmType: [],
  nftIsLoading: true,
  owner: null,
};

const FarmNFTReducer = (state, action) => {

  let tmp = {
    contract: action.contract,
    tokenCount: state.tokenCount,
    farmNFT: state.farmNFT,
    farmType: state.farmType,
    owner: state.owner,
    nftIsLoading: state.nftIsLoading
  };
  

  if (action.type === 'CONTRACT') {
    return {
      contract: action.contract,
      tokenCount: state.tokenCount,
      farmNFT: state.farmNFT,
      farmType: state.farmType,
      owner: state.owner,
      nftIsLoading: state.nftIsLoading
    };
  }

  if (action.type === 'FARMTYPE') {
    return {
      contract: state.contract,
      tokenCount: state.tokenCount,
      farmNFT: state.farmNFT,
      farmType: action.farmType,
      owner: state.owner,
      nftIsLoading: state.nftIsLoading
    };
  }

  if (action.type === 'LOADFarmNFT') {
    return {
      contract: state.contract,
      tokenCount: state.tokenCount,
      farmNFT: action.farmNFT,
      farmType: state.farmType,
      owner: state.owner,
      nftIsLoading: state.nftIsLoading
    };
  }

  if (action.type === 'LOADTOKENCOUNT') {
    return {
      contract: state.contract,
      tokenCount: action.tokenCount,
      farmNFT: state.farmNFT,
      farmType: state.farmType,
      owner: state.owner,
      nftIsLoading: state.nftIsLoading
    }
  }

  if (action.type === 'LOADTPYECOUNT') {
    return {
      contract: state.contract,
      tokenCount: state.tokenCount,
      farmNFT: state.farmNFT,
      farmType: state.farmType,
      owner: state.owner,
      nftIsLoading: state.nftIsLoading
    }
  }

  if (action.type === 'LOADOWNER') {
    return {
      contract: state.contract,
      tokenCount: state.tokenCount,
      farmNFT: state.farmNFT,
      farmType: state.farmType,
      owner: action.owner,
      nftIsLoading: state.nftIsLoading
    }
  }

  // if (loadOwnerHandler)

  if (action.type === 'UPDATEFarmNFT') {
    const index = state.FarmNFT.findIndex(NFT => NFT.id === parseInt(action.NFT.id));
    let farmNFT = [];

    if (index === -1) {
      farmNFT = [action.NFT, ...state.farmNFT];
    } else {
      farmNFT = [...state.farmNFT];
    }

    return {
      contract: state.contract,
      tokenCount: state.tokenCount,
      farmNFT: state.farmNFT,
      farmType: state.farmType,
      nftIsLoading: state.nftIsLoading
    };
  }

  if (action.type === 'UPDATEOWNER') {
    const index = state.FarmNFT.findIndex(NFT => NFT.id === parseInt(action.id));
    let farmNFT = [...state.farmNFT];
    farmNFT[index].owner = action.newOwner;

    return {
      contract: state.contract,
      totalSupply: state.totalSupply,
      farmNFT: farmNFT,
      farmType: state.farmType,
      nftIsLoading: state.nftIsLoading
    };
  }

  if (action.type === 'LOADING') {
    return {
      contract: state.contract,
      totalSupply: state.totalSupply,
      farmNFT: state.farmNFT,
      farmType: state.farmType,
      nftIsLoading: action.loading
    };
  }

  return defaultFarmNFTState;
};

const FarmNFTProvider = props => {
  const [farmNFTState, dispatchFarmNFTAction] = useReducer(FarmNFTReducer, defaultFarmNFTState);

  const loadContractHandler = (web3, farmNFT, deployedNetwork) => {
    const contract = deployedNetwork ? new web3.eth.Contract(farmNFT.abi, deployedNetwork.address) : '';
    dispatchFarmNFTAction({ type: 'CONTRACT', contract: contract });
    return contract;
  };

  const loadTotalSupplyHandler = async (contract) => {
    const totalSupply = await contract.methods.totalSupply().call();
    dispatchFarmNFTAction({ type: 'LOADSUPPLY', totalSupply: totalSupply });
    return totalSupply;
  };

  const loadTokenCountHandler = async (contract) => {
    let tokenCount = await contract.methods.TOKEN_COUNT().call();
    tokenCount = HexToNumber(tokenCount);
    dispatchFarmNFTAction({ type: 'LOADTOKENCOUNT', tokenCount: tokenCount });
    return tokenCount;
  };

  const loadFarmTypeHandler = async (contrat) => {
    let farm_type = await contrat.methods.farm_type().call()
    console.log('Farm_Type', JSON.stringify(farm_type))
    farm_type[3] = HexToNumber(farm_type[3])
    farm_type[4] = HexToNumber(farm_type[4])
    farm_type[5] = (NumberToBN(farm_type[5]._hex) / 1e18).toString()
    console.log('5', farm_type[5])
    console.log('FarmType', JSON.stringify(farm_type))
    dispatchFarmNFTAction({ type: 'FARMTYPE', farmType: farm_type});
    return farm_type
  }

  const loadOwnerHandler = async (contract) => {
    let owner = await contract.methods.owner().call();
    dispatchFarmNFTAction({ type: 'LOADOWNER', owner: owner});
    return owner;
  }

  const loadFarmNFTHandler = async (contract, tokenCount) => {
    let farmNFT = [];
    let result = await contract.methods.tokensStatus().call();
    let { 0: totals, 1: remains, 2: mines } = result;

    for (let i = 1; i < tokenCount; i++) {
      const hash = await contract.methods.meta_hashes(i).call();
      const totalSupply = await contract.methods.total_supplys(i).call();
      farmNFT[i - 1] = {
        meta_hash: hash,
        total: totalSupply,
        remain: remains[i - 1],
        mine: mines[i - 1]
      };
      // try {
      //   const response = await fetch(`https://ipfs.infura.io/ipfs/${hash}?clear`);
      //   if(!response.ok) {
      //     throw new Error('Something went wrong');
      //   }

      //   const metadata = await response.json();
      //   const owner = await contract.methods.ownerOf(i + 1).call();

      //   FarmNFT = [{
      //     id: i + 1,
      //     title: metadata.properties.name.description,
      //     img: metadata.properties.image.description,
      //     owner: owner
      //   }, ...FarmNFT];
      // }catch {
      //   console.error('Something went wrong');
      // }
    }
    dispatchFarmNFTAction({ type: 'LOADFarmNFT', farmNFT: farmNFT });
    return farmNFT;
  };

  const updateFarmNFTHandler = async (contract, id, owner) => {
    let NFT;
    // const hash = await contract.methods.tokenURI(id).call();
    // try {
    //   const response = await fetch(`https://ipfs.infura.io/ipfs/${hash}?clear`);
    //   if(!response.ok) {
    //     throw new Error('Something went wrong');      }

    //   const metadata = await response.json();      

    //   NFT = {
    //     id: parseInt(id),
    //     title: metadata.properties.name.description,
    //     img: metadata.properties.image.description,
    //     owner: owner
    //   };
    // }catch {
    //   console.error('Something went wrong');
    // }
    dispatchFarmNFTAction({ type: 'UPDATEFarmNFT', NFT: NFT });
  };

  const updateOwnerHandler = (id, newOwner) => {
    dispatchFarmNFTAction({ type: 'UPDATEOWNER', id: id, newOwner: newOwner });
  };

  const setNftIsLoadingHandler = (loading) => {
    dispatchFarmNFTAction({ type: 'LOADING', loading: loading });
  };

  const farmNFTContext = {
    contract: farmNFTState.contract,
    tokenCount: farmNFTState.tokenCount,
    farmNFT: farmNFTState.FarmNFT,
    farmType: farmNFTState.farmType,
    nftIsLoading: farmNFTState.nftIsLoading,
    owner: farmNFTState.owner,
    loadContract: loadContractHandler,
    loadTokenCount: loadTokenCountHandler,
    loadFarmNFT: loadFarmNFTHandler,
    loadFarmType: loadFarmTypeHandler,
    loadOwner: loadOwnerHandler,
    updateFarmNFT: updateFarmNFTHandler,
    updateOwner: updateOwnerHandler,
    setNftIsLoading: setNftIsLoadingHandler
  };

  return (
    <FarmNFTContext.Provider value={farmNFTContext}>
      {props.children}
    </FarmNFTContext.Provider>
  );
};

export default FarmNFTProvider;