/**
    * @description      : 
    * @author           : Winner
    * @group            : 
    * @created          : 26/12/2021 - 03:43:35
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 26/12/2021
    * - Author          : Winner
    * - Modification    : 
**/
import React, { Component, useContext, useState } from 'react';
import ImageCardStyle from '../../organisms/ImageCard/ImageCard.css'

import web3 from '../../../connection/web3';
import Web3Context from '../../../store/web3-context';
import CowNFTContext from '../../../store/CowNFTContext';
import CowNFT from '../../../abis/CowNFT.json';
import Config from '../../../config/pinata.json';
import toast from 'react-hot-toast';
import axios from 'axios';

const CowTypeForm = (props) => {

    const web3Context = useContext(Web3Context);
    const cowNFTContext = useContext(CowNFTContext);
    const cowNFTContrat = cowNFTContext.contract;

    const [enteredName, setEnteredName] = useState('');
    const [descriptionIsValid, setDescriptionIsValid] = useState(true);

    const [enteredDescription, setEnteredDescription] = useState('');
    const [nameIsValid, setNameIsValid] = useState(true);

    const [capturedFile, setCapturedFile] = useState(null);
    const [fileIsValid, setFileIsValid] = useState(true);

    const [amount, setAmount] = useState(0);
    const [amountIsValid, setAmountIsValid] = useState(true);

    const [price, setPrice] = useState(0.00);
    const [priceIsValid, setPriceIsValid] = useState(true);

    const [mintState, setMintState] = useState(0);

    const enteredNameHandler = (event) => {
        setEnteredName(event.target.value)
    };

    const enteredDescriptionHandler = (event) => {
        setEnteredDescription(event.target.value);
    };

    const captureFile = (event) => {
        event.preventDefault();

        const file = event.target.files[0];
        setCapturedFile(file);
    };

    const amountHandler = (event) => {
        event.preventDefault()

        setAmount(event.target.value)
    }

    const priceHandler = (event) => {
        event.preventDefault()
        setPrice(event.target.value)
    }

    const submissionHandler = (event) => {
        event.preventDefault();

        enteredName ? setNameIsValid(true) : setNameIsValid(false);
        enteredDescription ? setDescriptionIsValid(true) : setDescriptionIsValid(false);
        capturedFile ? setFileIsValid(true) : setFileIsValid(false);
        amount > 0 ? setAmountIsValid(true) : setAmountIsValid(false);
        price > 0 ? setPriceIsValid(true) : setPriceIsValid(false);

        const formIsValid = enteredName && enteredDescription && capturedFile && amount > 0 && price > 0;

        // Upload file to IPFS and push to the blockchain
        const mintNFTs = async () => {
            try {
                console.log('Uploading file.....')
                let data = new FormData();
                data.append("file", capturedFile);
                const url_file_pinata = `https://api.pinata.cloud/pinning/pinFiletoIPFS`;
                setMintState(1)
                let response = await axios.post(url_file_pinata, data, {
                    headers: {
                        "Content-Type": `multipart/form-data; boundary= ${data._boundary}`,
                        pinata_api_key: Config.PINATA_API_KEY,
                        pinata_secret_api_key: Config.PINATA_API_SECRET,
                    },
                })
                setMintState(2)

                // const mint_data = { name: enteredName, description: enteredDescription, image: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash }
                // const url_json_pinata = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
                // let hash_response = await axios
                //     .post(url_json_pinata, mint_data, {
                //         headers: {
                //             pinata_api_key: Config.PINATA_API_KEY,
                //             pinata_secret_api_key: Config.PINATA_API_SECRET,
                //         },
                //     })

                const url = "https://farmenergy.mypinata.cloud/ipfs/" + response.data.IpfsHash;

                console.log('Uploaded Successfully.')
                await createToken(response.data.IpfsHash);
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }

        const createToken = async (metaHash) => {
            try {

                if (!window.ethereum) {
                    window.alert("You didn't connected to metamask!")
                    return;
                }
                const cowNFTContract = cowNFTContext.contract

                await cowNFTContract.methods
                    .addType(enteredName, enteredDescription, metaHash, 0, amount, price)
                    .send({ from: web3Context.account })
                    .on('transactionHash', function (hash) {
                        setMintState(0)
                        toast.success('Successfully minted！');
                    })
                    .on('receipt', function (receipt) {
                        setMintState(0)
                        const returnValues = receipt.events.TokenCreated.returnValues;
                        console.log(returnValues.contractAddress);
                    });
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }

        formIsValid && mintNFTs();
        // formIsValid && createToken('');
    };

    const nameClass = nameIsValid ? "form-control" : "form-control is-invalid";
    const descriptionClass = descriptionIsValid ? "form-control" : "form-control is-invalid";
    const fileClass = fileIsValid ? "form-control" : "form-control is-invalid";
    const amountClass = amountIsValid ? "form-control" : "form-control is-invalid";
    const priceClass = priceIsValid ? "form-control" : "form-control is-invalid";

    return (
        <div className="card col-md-3 col-sm-6 m-3" style={{ width: 30 + '%' }}>
            <div className="card-body">
                <h2 className="card-title">Add New Cow</h2>
            </div>
            <div className="card-body" style={{ textAlign: 'center' }}>
                <div className="d-flex flex-column">
                    <div className="input-group">
                        <span className="input-group-text" style={{minWidth: 25 + '%'}}>Name </span>
                        <input
                            type='text'
                            className={`${nameClass}`}
                            placeholder='Name...'
                            value={enteredName}
                            onChange={enteredNameHandler}
                        />
                    </div>
                    <div className="input-group mt-2">
                        <span className="input-group-text" style={{minWidth: 25 + '%'}}>Stocks</span>
                        <input
                            type='number'
                            className={`${amountClass}`}
                            placeholder='Amount...'
                            value={amount}
                            onChange={amountHandler}
                        />
                    </div>
                    <div className="input-group mt-2">
                        <span className="input-group-text" style={{minWidth: 25 + '%'}}>Price</span>
                        <input
                            type='number'
                            className={`${priceClass}`}
                            placeholder='Amount...'
                            value={price}
                            onChange={priceHandler}
                        />
                        <span className="input-group-text" style={{minWidth: 25 + '%'}}>BNB</span>
                    </div>
                    <input
                        type='file'
                        className={`${fileClass} mb-1 mt-2`}
                        onChange={captureFile}
                    />
                    <textarea
                        type='text'
                        className={`${descriptionClass} mb-1`}
                        placeholder='Description...'
                        value={enteredDescription}
                        onChange={enteredDescriptionHandler}></textarea>
                </div>
            </div>
            <div className="card-footer d-flex justify-content-between">
                {
                    mintState == 1 ? (
                        <button disabled type="button" className="btn btn-primary" onClick={submissionHandler}
                            style={{ minWidth: 100 + 'px' }}>
                            <span>Uploading... &nbsp;<span class="spinner-border spinner-border-sm"></span></span>
                        </button>
                    ) : (
                        mintState == 2 ? (
                            <button disabled type="button" className="btn btn-primary" onClick={submissionHandler}
                                style={{ minWidth: 100 + 'px' }}>
                                <span>Minting... &nbsp;<span class="spinner-border spinner-border-sm"></span></span>
                            </button>
                        ) : (<button type="button" className="btn btn-primary" onClick={submissionHandler}
                            style={{ minWidth: 100 + 'px' }}><span>Add Cow</span></button>)
                    )
                }
                {/* <button type="button" className="btn btn-warning" onClick={props.AddAmount}
                    style={{ minWidth: 100 + 'px' }}>Add Amount</button> */}
            </div>
        </div>
    )
}

export default CowTypeForm