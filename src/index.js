/**
    * @description      : 
    * @author           : Winner
    * @group            : 
    * @created          : 25/12/2021 - 16:24:40
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 25/12/2021
    * - Author          : Winner
    * - Modification    : 
**/
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Web3Provider from './store/Web3Provider';
import CowNFTProvider from './store/CowNFTProvider';
import FarmNFTProvider from './store/FarmNFTProvider';
import LoadingProvider from './store/LoadingProvider';
// import { DAppProvider } from "@usedapp/core";

ReactDOM.render(
  <LoadingProvider>
    <Web3Provider>
      <CowNFTProvider>
        <FarmNFTProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </FarmNFTProvider>
      </CowNFTProvider>
    </Web3Provider>
  </LoadingProvider>,

  document.getElementById('root')

  // <DAppProvider config={{}}>
  //   <BrowserRouter>
  //     <App />
  //   </BrowserRouter>
  // </DAppProvider>,
);