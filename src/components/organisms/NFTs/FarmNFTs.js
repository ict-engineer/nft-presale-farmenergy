/**
    * @description      : 
    * @author           : Winner
    * @group            : 
    * @created          : 28/12/2021 - 10:13:07
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 28/12/2021
    * - Author          : Winner
    * - Modification    : 
**/
import React, { useContext, useState, useEffect, useRef } from 'react'

import web3 from '../../../connection/web3';
import Web3Context from '../../../store/web3-context';
import FarmNFTContext from '../../../store/FarmNFTContext';
import HexToNumber from '../../../utils/math';

import toast from 'react-hot-toast';

import ImageCard from '../ImageCard'

import NumberToBN from 'number-to-bn';
import Loading from '../Loading/Loading'
import { getStoredTransactionState } from '@usedapp/core';

const FarmNFTs = (props) => {

    const web3Context = useContext(Web3Context)
    const farmNFTContext = useContext(FarmNFTContext)

    const account = web3Context.account
    const networkId = web3Context.networkId

    const [farmType, setFarmType] = useState()
    const [addAmount, setAddAmount] = useState(0)
    const [price, setPrice] = useState([])
    const [mine, setMine] = useState([])
    const [buyState, setBuyState] = useState(false)
    const [updateState, setUpdateState] = useState(false)
    const [totalCost, setTotalCost] = useState(0)
    const [loadingState, setLoadingState] = useState(false)
    const [owner, setOwner] = useState(false)

    let farm_type, tmpAddAmount;

    let farmContract = farmNFTContext.contract

    useEffect(() => {
        farm_type = farmNFTContext.farmType
        tmpAddAmount = []
        console.log(JSON.stringify(farm_type))
        setFarmType(farm_type)
        setPrice(farm_type[5])

        getStatus()
    }, [props])

    const getStatus = async () => {

        if (!owner && farmContract) {
            setLoadingState(true)
            let tmpMine = await farmContract.methods.typesStatus().call({ from: web3Context.account })
            let tmpOwner = await farmContract.methods.owner().call()
            setOwner(tmpOwner && tmpOwner == web3Context.account)

            // console.log('TmpMines', JSON.stringify(tmpMines))
            tmpMine = HexToNumber(tmpMine)

            let farm_type = await farmContract.methods.farm_type().call()
            console.log('farm_Type', JSON.stringify(farm_type))
            farm_type[3] = HexToNumber(farm_type[3])
            farm_type[4] = HexToNumber(farm_type[4])
            farm_type[5] = (NumberToBN(farm_type[5]._hex) / 1e18).toFixed(3).toString()
            console.log('5', farm_type[5])
            setMine(tmpMine)
            setFarmType(farm_type)

            setLoadingState(false)
        }
    }

    const addAmountHandler = async (index, value) => {
        console.log('InputValue', index, value)
        let tmpAddAmount = addAmount;
        tmpAddAmount = value;
        let tmpTotalCost = farmType[5] * tmpAddAmount
        tmpTotalCost = tmpTotalCost.toFixed(3)  // When this is not owner so when users buy the NFT
        console.log('TmpTotalCost', tmpTotalCost)
        setAddAmount(tmpAddAmount)
        setTotalCost(tmpTotalCost)
    }

    const priceHandler = async (index, value) => {
        console.log('InputValue', index, value)
        let tmpPrice = value;
        console.log(tmpPrice)
        setPrice(tmpPrice)
    }

    const AddAmount = async () => {         //  it is called when update max supplys and change the price
        const farmNFTContract = farmNFTContext.contract
        console.log(farmNFTContract)
        let paramAmount = Number(addAmount)
        let paramPrice = Number(Number(price) * 1e10)
        if (!paramAmount) paramAmount = 0
        if (!paramPrice) paramPrice = 0
        console.log('ParamInfo?', paramAmount, paramPrice, typeof paramAmount, typeof paramPrice)

        setUpdateState(true)
        let recipt = await farmNFTContract.methods
            .updateMaxSupplyAndPrice(paramAmount, paramPrice)
            .send({
                from: web3Context.account
            }).on('transactionHash', function (hash) {
                toast.success('Successfully minted！');
                console.log('transactionHash OK -----------------------------------');
                setLoadingState(true)
                // window.location.reload()
            })
            .on('receipt', async function (receipt) {
                setUpdateState(false)
                await getStatus()
                // const returnValues = receipt.events.EventMaxSupplyAndPrice.returnValues;
                // console.log(returnValues.contractAddress);
                // console.log('receipt OK ----------------------------------------');
            });
    }

    const BuyFarms = async () => {
        const farmNFTContract = farmNFTContext.contract
        console.log('Buying Farms')
        setBuyState(true)
        let tmpAddAmount = addAmount
        if (!tmpAddAmount) tmpAddAmount = 0
        let receipt = await farmNFTContract.methods
            .createToken(web3Context.account, addAmount)
            .send({ from: web3Context.account, value: web3.utils.toWei(totalCost.toString(), 'Ether') })
            .on('transactionHash', function (hash) {
                toast.success('Successfully minted！')
                setLoadingState(true)
                // setBuyState(false)
                // console.log('PriceMatched', receipt.events.TokensCreated.priceMatched);
                // window.location.reload()
            })
            .on('receipt', async function (receipt) {
                setBuyState(false)
                await getStatus()
                // const returnValues = receipt.events.TokensCreated.returnValues;
                // console.log('PriceMatched', returnValues.priceMatched);
            });
        console.log('PriceMatched', receipt.events.TokensCreated.priceMatched);
    }

    return (
        <>
            {
                loadingState ? (<Loading />) : (
                    <>
                        <p style={{ fontSize: 3 + 'rem', float: 'center', color: 'rgb(255, 255, 0)' }} className="outline small-title">
                            Here is the Farms help grow our Cutty Cows
                        </p>
                        <>
                            {
                                farmType && (
                                    <ImageCard type={farmType} index={0} stockHandler={addAmountHandler} priceHandler={priceHandler}
                                        owner={owner} mines={mine} />
                                )
                            }
                        </>
                        <>
                            {
                                (owner ? (<>
                                    {
                                        updateState ? (
                                            <button type="button" disabled className="btn btn-warning" onClick={AddAmount}
                                                style={{ minWidth: 100 + 'px', height: 50 + 'px', fontSize: 20 + 'px' }}>
                                                    Change Price and Add Stocks... <span className="spinner-border spinner-border-sm"></span>
                                            </button>
                                        ) : (
                                            <button type="button" className="btn btn-warning" onClick={AddAmount}
                                                style={{ minWidth: 100 + 'px', height: 50 + 'px', fontSize: 20 + 'px' }}>Change Price and Add Stocks</button>
                                        )
                                    }</>
                                ) : (
                                    buyState ? (
                                        <button disabled type="button" className="btn btn-primary" onClick={BuyFarms}
                                            style={{ minWidth: 100 + 'px', height: 50 + 'px', fontSize: 20 + 'px' }}>
                                            <span>Buying... <span className="spinner-border spinner-border-sm"></span></span>
                                        </button>
                                    ) : (
                                        <button type="button" className="btn btn-primary" onClick={BuyFarms}
                                            style={{ minWidth: 100 + 'px', height: 50 + 'px', fontSize: 20 + 'px' }}>
                                            <span>Buy FarmNFTs(Total: {totalCost} BNB)</span>
                                        </button>
                                    )
                                ))
                            }
                        </>
                    </>
                )
            }
        </>
    )
}

export default FarmNFTs