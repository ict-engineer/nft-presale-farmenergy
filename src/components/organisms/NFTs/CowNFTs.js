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
import CowNFTContext from '../../../store/CowNFTContext';
import LoadingStateContext from '../../../store/LoadingContext';
import HexToNumber from '../../../utils/math';

import toast from 'react-hot-toast';

import ImageCard from '../ImageCard'
import CowTypeForm from '../CowType/CowTypeForm'

import PresaleContract from '../../../abis/PresaleContract.json'
import NumberToBN from 'number-to-bn';
import Loading from '../Loading/Loading'

const CowNFTs = (props) => {

    const web3Context = useContext(Web3Context)
    const cowNFTContext = useContext(CowNFTContext)

    const account = web3Context.account
    const networkId = web3Context.networkId
    const deployedNetwork = PresaleContract.networks[networkId]
    const presaleContract = deployedNetwork ? new web3.eth.Contract(PresaleContract.abi, deployedNetwork.address) : ''

    const [typeCount, setTypeCount] = useState(0)
    const [cowTypes, setCowTypes] = useState([])
    const [addAmounts, setAddAmounts] = useState([])
    const [prices, setPrices] = useState([])
    const [mines, setMines] = useState([])
    const [buyState, setBuyState] = useState(false)
    const [updateState, setUpdateState] = useState(false)
    const [totalCost, setTotalCost] = useState(0)
    const [loadingState, setLoadingState] = useState(false)
    const [owner, setOwner] = useState(false)

    let cow_types, tmpAddAmounts, tmpPrices;

    let cowContract = cowNFTContext.contract

    useEffect(() => {
        cow_types = cowNFTContext.cowTypes
        tmpAddAmounts = []
        tmpPrices = []
        console.log(JSON.stringify(cow_types))  
        for (let i = 0; i < cow_types.length; i++) {
            tmpAddAmounts.push(0)
            tmpPrices.push(cow_types[i][5])
        }
        setCowTypes([])
        setAddAmounts(tmpAddAmounts)
        setPrices(tmpPrices)

        getStatus()
        console.log('Length: ', cowTypes.length, cow_types.length)
    }, [props])

    const getStatus = async () => {
        if (!owner && cowContract) {
            setLoadingState(true)
            let tmpMines = await cowContract.methods.typesStatus().call({ from: web3Context.account }), i
            let tmpTypeCount = await cowContract.methods.TYPE_COUNT().call()
            let tmpOwner = await cowContract.methods.owner().call()
            setOwner(tmpOwner && tmpOwner == web3Context.account)

            // console.log('TmpMines', JSON.stringify(tmpMines))
            for (i = 0; i < tmpMines.length; i++)
                tmpMines[i] = HexToNumber(tmpMines[i])
            setMines(tmpMines)
            let tmpCowTypes = []
            tmpTypeCount = HexToNumber(tmpTypeCount)
            console.log('TmpTypeCount', tmpTypeCount)
            setTypeCount(tmpTypeCount)
            for (i = 1; i < tmpTypeCount; i++) {
                let cow_type = await cowContract.methods.cow_types(i).call()
                console.log('Cow_Type', JSON.stringify(cow_type))
                cow_type[3] = HexToNumber(cow_type[3])
                cow_type[4] = HexToNumber(cow_type[4])
                cow_type[5] = (NumberToBN(cow_type[5]._hex) / 1e18).toFixed(3).toString()
                console.log('5', cow_type[5])
                tmpCowTypes.push(cow_type)
            }
            setCowTypes(tmpCowTypes)
            setLoadingState(false)
        }
        // let typeCount = await cowNFTContext.loadTypeCount(cowContract)
        // const cowTypes = await cowNFTContext.loadCowTypes(cowContract, typeCount)
    }

    const addAmountHandler = async (index, value) => {
        console.log('InputValue', index, value)
        let tmpAddAmount = addAmounts;
        tmpAddAmount[index] = value;
        let tmpTotalCost = 0;
        for (let i = 0; i < cowTypes.length; i++) {
            if (tmpAddAmount[i])
                tmpTotalCost += cowTypes[i][5] * tmpAddAmount[i]
        }
        tmpTotalCost = tmpTotalCost.toFixed(3)  // When this is not owner so when users buy the NFT
        console.log('TmpTotalCost', tmpTotalCost)
        setAddAmounts(tmpAddAmount)
        setTotalCost(tmpTotalCost)
    }

    const priceHandler = async (index, value) => {
        console.log('InputValue', index, value)
        let tmpPrices = prices;
        tmpPrices[index] = value;
        console.log(tmpPrices)
        setPrices(tmpPrices)
    }

    const AddAmount = async () => {             //  it is called when update max supplys and change the price
        const cowNFTContract = cowNFTContext.contract
        let ids = [], i, paramAmounts = [], paramPrices = []
        for (i = 0; i < cowTypes.length; i++) {
            ids[i] = i + 1
            paramAmounts[i] = Number(addAmounts[i])
            paramPrices[i] = Number(Number(prices[i]) * 1e10)
            if (!paramAmounts[i]) paramAmounts[i] = 0
            if (!paramPrices[i]) paramPrices[i] = 0
        }
        console.log('Length, AddAmount', ids.length, paramPrices)

        setUpdateState(true)
        let receipt = await cowNFTContract.methods
            .updateMaxSupplysAndPrices(ids, paramAmounts, paramPrices)
            .send({
                from: web3Context.account
            }).on('transactionHash', function (hash) {
                toast.success('Successfully minted！')
                console.log('Successfully minted！ ----------------------------')
                setLoadingState(true)
                // window.location.reload()
            })
            .on('receipt', async function (receipt) {
                // const returnValues = receipt.events.EventMaxSupplysAndPrices.returnValues;
                console.log('Receipt Successed！ ----------------------------')
                setUpdateState(false)
                await getStatus()
                // console.log(returnValues.contractAddress);
            });
    }

    const BuyCows = async () => {
        const cowNFTContract = cowNFTContext.contract
        let ids = [], tmpAmounts = []
        for (let i = 0; i < cowTypes.length; i++) {
            ids[i] = i + 1
            if (addAmounts[i])
                tmpAmounts[i] = Number(addAmounts[i])
            else tmpAmounts[i] = 0
        }
        console.log('Buying Cows', tmpAmounts.length, ids.length)
        setBuyState(true)
        let receipt = await cowNFTContract.methods
            .createTokens(web3Context.account, ids, tmpAmounts)
            .send({ from: web3Context.account, value: web3.utils.toWei(totalCost.toString(), 'Ether') })
            .on('transactionHash', async function (hash) {
                toast.success('Successfully minted！')
                // setBuyState(false)
                console.log('Successfully minted！ ----------------------------')
                setLoadingState(true)
                // let typeCount = await cowNFTContext.loadTypeCount(cowNFTContract)
                // const cowTypes = await cowNFTContext.loadCowTypes(cowNFTContract, typeCount)
                // window.location.reload()
                // console.log('PriceMatched', receipt.events.TokensCreated.priceMatched);
                // window.location.reload()
            })
            .on('receipt', async function (receipt) {
                setBuyState(false)
                await getStatus()
                console.log('Receipt Successed！ ----------------------------')
                // getStatus()
                // const returnValues = receipt.events.TokensCreated.returnValues;
                // console.log('PriceMatched', returnValues.priceMatched);
            });
        // let receipt = await presaleContract.methods
        //     .presale(ids, tmpAmounts, addAmounts[cowTypes.length])
        //     .send({ from: web3Context.account, value: web3.utils.toWei(totalCost.toString(), 'Ether') })
        //     .on('transactionHash', function (hash) {
        //         toast.success('Successfully minted！')
        //         setBuyState(false)
        //         console.log('PriceMatched', receipt.events.TokensCreated.priceMatched);
        //         // window.location.reload()
        //     })
        //     .on('receipt', function (receipt) {
        //         setBuyState(false)
        //         const returnValues = receipt.events.TokensCreated.returnValues;
        //         console.log('PriceMatched', returnValues.priceMatched);
        //     });
        setBuyState(false)
        console.log('PriceMatched', receipt.events.TokensCreated.priceMatched);
    }

    return (
        <>
            {
                loadingState ? (
                    <Loading />
                ) : (
                    <>
                        <p style={{ fontSize: 3 + 'rem', float: 'center', color: 'rgb(255, 255, 0)' }} className="outline small-title">
                            Here is the Cutty Cows help you produce milk and money
                        </p>
                        <>
                            {
                                cowTypes && cowTypes.map((cowType, index) => (
                                    <ImageCard type={cowType} index={index} stockHandler={addAmountHandler} priceHandler={priceHandler}
                                        owner={owner} mines={mines[index]} key={index} />
                                ))
                            }
                        </>
                        <>
                            {
                                owner ? (
                                    <CowTypeForm AddAmount={AddAmount} />
                                ) : (
                                    <div></div>
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
                                                    Change Price and Add Stocks...<span className="spinner-border spinner-border-sm"></span>
                                            </button>

                                        ) : (
                                            <button type="button" className="btn btn-warning" onClick={AddAmount}
                                                style={{ minWidth: 100 + 'px', height: 50 + 'px', fontSize: 20 + 'px' }}>Change Price and Add Stocks</button>
                                        )
                                    }</>
                                ) : (
                                    buyState ? (
                                        <button disabled type="button" className="btn btn-primary" onClick={BuyCows}
                                            style={{ minWidth: 100 + 'px', height: 50 + 'px', fontSize: 20 + 'px' }}>
                                            <span>Buying... <span className="spinner-border spinner-border-sm"></span></span>
                                        </button>
                                    ) : (
                                        <button type="button" className="btn btn-primary" onClick={BuyCows}
                                            style={{ minWidth: 100 + 'px', height: 50 + 'px', fontSize: 20 + 'px' }}>
                                            <span>Buy CowNFTs(Total: {totalCost} BNB)</span>
                                        </button>
                                    )
                                ))
                            }
                        </>
                    </>
                )
            }
        </>
    );
}

export default CowNFTs;