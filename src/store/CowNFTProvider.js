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
import CowNFTContext from './CowNFTContext';
import NumberToBN from 'number-to-bn';

const defaultCowNFTState = {
  contract: null,
  tokenCount: null,
  typeCount: null,
  cowNFT: [],
  cowTypes: [],
  nftIsLoading: true,
  owner: null,
};

const CowNFTReducer = (state, action) => {

  let tmp = {
    contract: action.contract,
    tokenCount: state.tokenCount,
    cowNFT: state.cowNFT,
    typeCount: state.typeCount,
    cowTypes: state.cowTypes,
    owner: state.owner,
    nftIsLoading: state.nftIsLoading
  };
  

  if (action.type === 'CONTRACT') {
    return {
      contract: action.contract,
      tokenCount: state.tokenCount,
      cowNFT: state.cowNFT,
      typeCount: state.typeCount,
      cowTypes: state.cowTypes,
      owner: state.owner,
      nftIsLoading: state.nftIsLoading
    };
  }

  if (action.type === 'COWTYPES') {
    return {
      contract: state.contract,
      tokenCount: state.tokenCount,
      cowNFT: state.cowNFT,
      typeCount: state.typeCount,
      cowTypes: action.cowTypes,
      owner: state.owner,
      nftIsLoading: state.nftIsLoading
    };
  }

  if (action.type === 'LOADCowNFT') {
    return {
      contract: state.contract,
      tokenCount: state.tokenCount,
      cowNFT: action.cowNFT,
      typeCount: state.typeCount,
      cowTypes: state.cowTypes,
      owner: state.owner,
      nftIsLoading: state.nftIsLoading
    };
  }

  if (action.type === 'LOADTOKENCOUNT') {
    return {
      contract: state.contract,
      tokenCount: action.tokenCount,
      cowNFT: state.cowNFT,
      typeCount: state.typeCount,
      cowTypes: state.cowTypes,
      owner: state.owner,
      nftIsLoading: state.nftIsLoading
    }
  }

  if (action.type === 'LOADTPYECOUNT') {
    return {
      contract: state.contract,
      tokenCount: state.tokenCount,
      cowNFT: state.cowNFT,
      typeCount: action.typeCount,
      cowTypes: state.cowTypes,
      owner: state.owner,
      nftIsLoading: state.nftIsLoading
    }
  }

  if (action.type === 'LOADOWNER') {
    return {
      contract: state.contract,
      tokenCount: state.tokenCount,
      cowNFT: state.cowNFT,
      typeCount: state.typeCount,
      cowTypes: state.cowTypes,
      owner: action.owner,
      nftIsLoading: state.nftIsLoading
    }
  }

  // if (loadOwnerHandler)

  if (action.type === 'UPDATECowNFT') {
    const index = state.CowNFT.findIndex(NFT => NFT.id === parseInt(action.NFT.id));
    let cowNFT = [];

    if (index === -1) {
      cowNFT = [action.NFT, ...state.cowNFT];
    } else {
      cowNFT = [...state.cowNFT];
    }

    return {
      contract: state.contract,
      tokenCount: state.tokenCount,
      cowNFT: state.cowNFT,
      typeCount: state.typeCount,
      cowTypes: state.cowTypes,
      nftIsLoading: state.nftIsLoading
    };
  }

  if (action.type === 'UPDATEOWNER') {
    const index = state.CowNFT.findIndex(NFT => NFT.id === parseInt(action.id));
    let cowNFT = [...state.cowNFT];
    cowNFT[index].owner = action.newOwner;

    return {
      contract: state.contract,
      totalSupply: state.totalSupply,
      cowNFT: cowNFT,
      typeCount: state.typeCount,
      cowTypes: state.cowTypes,
      nftIsLoading: state.nftIsLoading
    };
  }

  if (action.type === 'LOADING') {
    return {
      contract: state.contract,
      totalSupply: state.totalSupply,
      cowNFT: state.cowNFT,
      typeCount: state.typeCount,
      cowTypes: state.cowTypes,
      nftIsLoading: action.loading
    };
  }

  return defaultCowNFTState;
};

const CowNFTProvider = props => {
  const [cowNFTState, dispatchCowNFTAction] = useReducer(CowNFTReducer, defaultCowNFTState);

  const loadContractHandler = (web3, cowNFT, deployedNetwork) => {
    const contract = deployedNetwork ? new web3.eth.Contract(cowNFT.abi, deployedNetwork.address) : '';
    dispatchCowNFTAction({ type: 'CONTRACT', contract: contract });
    return contract;
  };

  const loadTotalSupplyHandler = async (contract) => {
    const totalSupply = await contract.methods.totalSupply().call();
    dispatchCowNFTAction({ type: 'LOADSUPPLY', totalSupply: totalSupply });
    return totalSupply;
  };

  const loadTokenCountHandler = async (contract) => {
    let tokenCount = await contract.methods.TOKEN_COUNT().call();
    tokenCount = HexToNumber(tokenCount);
    dispatchCowNFTAction({ type: 'LOADTOKENCOUNT', tokenCount: tokenCount });
    return tokenCount;
  };

  const loadTypeCountHandler = async(contract) => {
    let typeCount = await contract.methods.TYPE_COUNT().call();
    typeCount = HexToNumber(typeCount);
    dispatchCowNFTAction({ type: 'LOADTOKENCOUNT', typeCount: typeCount });
    return typeCount;
  }

  const loadCowTypesHandler = async (contrat, type_count) => {
    let tmp_cow_types = [], i
    let typeCount = HexToNumber(type_count)
    for (i = 1; i < typeCount; i++) {
      let cow_type = await contrat.methods.cow_types(i).call()
      // console.log('Cow_Type', JSON.stringify(cow_type))
      cow_type[3] = HexToNumber(cow_type[3])
      cow_type[4] = HexToNumber(cow_type[4])
      cow_type[5] = (NumberToBN(cow_type[5]._hex) / 1e18).toFixed(3).toString()
      console.log('5', cow_type[5])
      
      tmp_cow_types.push(cow_type)
    }
    dispatchCowNFTAction({ type: 'COWTYPES', cowTypes: tmp_cow_types});
    return tmp_cow_types
  }

  const loadOwnerHandler = async (contract) => {
    let owner = await contract.methods.owner().call();
    dispatchCowNFTAction({ type: 'LOADOWNER', owner: owner});
    return owner;
  }

  const loadCowNFTHandler = async (contract, tokenCount) => {
    let cowNFT = [];
    let result = await contract.methods.tokensStatus().call();
    let { 0: totals, 1: remains, 2: mines } = result;

    for (let i = 1; i < tokenCount; i++) {
      const hash = await contract.methods.meta_hashes(i).call();
      const totalSupply = await contract.methods.total_supplys(i).call();
      cowNFT[i - 1] = {
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

      //   CowNFT = [{
      //     id: i + 1,
      //     title: metadata.properties.name.description,
      //     img: metadata.properties.image.description,
      //     owner: owner
      //   }, ...CowNFT];
      // }catch {
      //   console.error('Something went wrong');
      // }
    }
    dispatchCowNFTAction({ type: 'LOADCowNFT', cowNFT: cowNFT });
    return cowNFT;
  };

  const updateCowNFTHandler = async (contract, id, owner) => {
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
    dispatchCowNFTAction({ type: 'UPDATECowNFT', NFT: NFT });
  };

  const updateOwnerHandler = (id, newOwner) => {
    dispatchCowNFTAction({ type: 'UPDATEOWNER', id: id, newOwner: newOwner });
  };

  const setNftIsLoadingHandler = (loading) => {
    dispatchCowNFTAction({ type: 'LOADING', loading: loading });
  };

  const cowNFTContext = {
    contract: cowNFTState.contract,
    tokenCount: cowNFTState.tokenCount,
    cowNFT: cowNFTState.CowNFT,
    typeCount: cowNFTState.typeCount,
    cowTypes: cowNFTState.cowTypes,
    nftIsLoading: cowNFTState.nftIsLoading,
    owner: cowNFTState.owner,
    loadContract: loadContractHandler,
    loadTokenCount: loadTokenCountHandler,
    loadTypeCount: loadTypeCountHandler,
    loadCowNFT: loadCowNFTHandler,
    loadCowTypes: loadCowTypesHandler,
    loadOwner: loadOwnerHandler,
    updateCowNFT: updateCowNFTHandler,
    updateOwner: updateOwnerHandler,
    setNftIsLoading: setNftIsLoadingHandler
  };

  return (
    <CowNFTContext.Provider value={cowNFTContext}>
      {props.children}
    </CowNFTContext.Provider>
  );
};

export default CowNFTProvider;