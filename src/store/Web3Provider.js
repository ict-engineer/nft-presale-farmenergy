/**
    * @description      : 
    * @author           : Winner
    * @group            : 
    * @created          : 25/12/2021 - 21:29:37
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 25/12/2021
    * - Author          : Winner
    * - Modification    : 
**/
import { useReducer } from 'react';

import Web3Context from './web3-context';

const defaultWeb3State = {
  account: null,
  networkId: null,
  balance: null
};

const web3Reducer = (state, action) => {
  if(action.type === 'ACCOUNT') {
    return {
      account: action.account,
      networkId: state.networkId,
      balance: state.balance
    };
  } 
  
  if(action.type === 'NETWORKID') {
    return {
      account: state.account,
      networkId: action.networkId,
      balance: state.balance
    };
  }

  if(action.type === 'BALANCE') {
    return {
      account: state.account,
      networkId: state.networkId,
      balance: action.balance
    };
  }
  
  return defaultWeb3State;
};

const Web3Provider = props => {
  const [web3State, dispatchWeb3Action] = useReducer(web3Reducer, defaultWeb3State);
  
  const loadAccountHandler = async(web3) => {
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    const balance = await web3.eth.getBalance(account);
    dispatchWeb3Action({type: 'ACCOUNT', account: account});
    dispatchWeb3Action({type: 'BALANCE', balance: balance});
    return account;
  };

  const loadBalanceHandler = async(web3) => {
    const balance = await web3.eth.getBalance(web3State.account);
    dispatchWeb3Action({type: 'ACCOUNT', balance: balance});
    return balance;
  }

  const loadNetworkIdHandler = async(web3) => {
    const networkId = await web3.eth.net.getId();
    dispatchWeb3Action({type: 'NETWORKID', networkId: networkId});
    return networkId;
  };
  
  const web3Context = {
    account:web3State.account,
    networkId: web3State.networkId,
    balance: web3State.balance,
    loadAccount: loadAccountHandler,
    loadNetworkId: loadNetworkIdHandler,
    loadBalance: loadBalanceHandler
  };
  
  return (
    <Web3Context.Provider value={web3Context}>
      {props.children}
    </Web3Context.Provider>
  );
};

export default Web3Provider;