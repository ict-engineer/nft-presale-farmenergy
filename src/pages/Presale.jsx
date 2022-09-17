/**
    * @description      : 
    * @author           : Winner
    * @group            : 
    * @created          : 25/12/2021 - 15:02:01
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 25/12/2021
    * - Author          : Winner
    * - Modification    : 
**/
import Web3 from '../connection/web3'
import React, { useContext, useState, useEffect, useRef } from 'react'
import Comingsoon from '../components/organisms/Comingsoon'
import './pages.scss'

import PresaleTitle from '../components/organisms/BetterTitle/PresaleTitle'
import '../components/containers/PresaleContainer/Slider.css'

import web3 from '../connection/web3';
import Web3Context from '../store/web3-context';
import CowNFTContext from '../store/CowNFTContext';
import FarmNFTContext from '../store/FarmNFTContext';
import HexToNumber from '../utils/math';

import toast from 'react-hot-toast';

import ImageCard from '../components/organisms/ImageCard'

import PresaleContract from '../abis/PresaleContract.json'

import CowNFTs from '../components/organisms/NFTs/CowNFTs'
import FarmNFTs from '../components/organisms/NFTs/FarmNFTs'

function Presale(props) {
    const [owner, setOwner] = useState(null)
    const [mines, setMines] = useState([])
    const [displayIndex, setDisplayIndex] = useState(0) // 0: Cow, 1: Farm

    const web3Context = useContext(Web3Context)
    const cowNFTContext = useContext(CowNFTContext)
    const farmNFTContext = useContext(FarmNFTContext)

    const account = web3Context.account
    const networkId = web3Context.networkId
    const deployedNetwork = PresaleContract.networks[networkId]
    const presaleContract = deployedNetwork ? new web3.eth.Contract(PresaleContract.abi, deployedNetwork.address) : ''

    // const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // setDisplayIndex(0)
        console.log('Owner, Owner', cowNFTContext.owner)
        setOwner(cowNFTContext.owner && web3Context.account == cowNFTContext.owner)
        console.log('Owner ======================', cowNFTContext.owner)
    }, [props])

    const SliderHandler = (index) => {
        setDisplayIndex(index)
        console.log('Owner, Owner', cowNFTContext.owner)
        setOwner(cowNFTContext.owner && web3Context.account == cowNFTContext.owner)
    }

    return (
        <>
            <section className="comingsoon">
                <div className="container-fluid">
                    <PresaleTitle style={{ marginTop: -140 + 'px' }} />
                    <div className="container p-4 text-yellow" style={{ textAlign: 'center', marginTop: 300 + 'px', backgroundColor: `rgba(240, 240, 240, 0.5)`, borderRadius: 25 + 'px' }}>
                        <div className="container-dots d-flex justify-content-center">
                            <div className={displayIndex == 0 ? "dot active" : "dot"} title="Cow NFTs" onClick={() => { SliderHandler(0) }}></div>
                            <div className={displayIndex == 1 ? "dot active" : "dot"} title="Farm NFTs" onClick={() => { SliderHandler(1) }}></div>
                        </div>
                        <div className="row justify-content-center" style={{ marginTop: 40 + 'px' }}>
                            {
                                displayIndex === 0 ? (
                                    <>
                                        <CowNFTs owner={owner} />
                                    </>
                                ) : (
                                    <>
                                        <FarmNFTs owner={owner} />
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Presale
