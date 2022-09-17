/**
    * @description      : 
    * @author           : Winner
    * @group            : 
    * @created          : 25/12/2021 - 16:29:40
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 25/12/2021
    * - Author          : Winner
    * - Modification    : 
**/

import web3 from '../../../connection/web3';
import React, { useContext, useState, useEffect } from 'react'
import { Button, Box, Text } from "@chakra-ui/react";
import { useEthers, useEtherBalance } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import Jazzicon from "@metamask/jazzicon";

import Web3Context from '../../../store/web3-context';
import CowNFTContext from '../../../store/CowNFTContext';

import ConnectMetamask from '../../../utils/ConnectMetamask'
import { ChakraProvider } from "@chakra-ui/react";

export default function ConnectButton(props) {

    const web3Ctx = useContext(Web3Context)
    const cowNFTContext = useContext(CowNFTContext)

    const account = web3Ctx.account
    const etherBalance = web3Ctx.balance

    return account ? (
        <button style={{ borderRadius: 25 + 'px', marginTop: -15 + 'px' }}>
            {etherBalance && parseFloat(formatEther(etherBalance)).toFixed(3)} BNB&nbsp;&nbsp;
            <button style={{ borderRadius: 25 + 'px' }}>
                {account &&
                    `${account.slice(0, 6)}...${account.slice(
                        account.length - 4,
                        account.length
                    )}`}
            </button>
        </button>
    ) : (
        <button className="btn btn-connect" onClick={ConnectMetamask}>Connect</button>
    );
}