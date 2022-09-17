/**
    * @description      : 
    * @author           : Winner
    * @group            : 
    * @created          : 16/12/2021 - 20:44:37
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 16/12/2021
    * - Author          : Winner
    * - Modification    : 
**/
import { AbsoluteCenter } from '@chakra-ui/react'
import React, { useState } from 'react'
import ImageCardStyle from './ImageCard.css'

const ImageCard = (props) => {

    const [stock, setStock] = useState(0)
    const [price, setPrice] = useState(props.type[5])

    const stockHandler = (event) => {
        let tmp = Number(event.target.value)
        if (tmp < 0)    return
        setStock(tmp)
        props.stockHandler(props.index, tmp)
    }

    const priceHandler = (event) => {
        let tmp = event.target.value
        if (tmp < 0)    return
        setPrice(tmp)
        props.priceHandler(props.index, tmp)
        console.log('Value', tmp)
    }

    return (
        <div className="card col-md-3 col-sm-6 m-3" style={{ width: 30 + '%', position: 'relative' }}>
            <div className="card-body">
                <div className="d-flex justify-content-between" style={{ position: 'relative' }}>
                    <div className="d-flex flex-column">
                        <span style={{ textDecoration: 'underline' }}><b>{props.type[3]}</b> / {props.type[4]}</span>
                    </div>
                    <h4 className="card-title">{props.type[0]}{/* Gursey Cow */}</h4>
                    {
                        props.owner ? (
                            <span className="inline-block d-flex justify-content-between">
                                <input value={price} onChange={priceHandler}
                                    style={{border: 'none', height: 20 + 'px', maxWidth: 45 + 'px', marginTop: 2 + 'px'}} /><b>BNB</b>
                            </span>
                        ) : (
                            <span>
                                Got: <b style={{ textDecoration: 'underline' }}>{props.mines}</b>
                            </span>
                        )
                    }
                </div>
            </div>
            <img className="card-img-top rounded" src={`https://farmenergy.mypinata.cloud/ipfs/${props.type[2]}`} alt="Card image"
                style={{ width: 100 + '%' }} />
            <div className="card-body">
                <p className="card-text">{props.type[1]}</p>
            </div>
            <div className="card-footer">
                <div className="input-group mb-3" style={{width: 100 + '%', textAlign: 'center'}}>
                    <input type="number" className="form-control" placeholder="Amount to add" onChange={stockHandler} value={stock}/>
                    {
                        !props.owner && (<span className="input-group-text" style={{width: 50 + '%'}}>
                            {props.type[5]} * {stock} = {Number(props.type[5] * stock).toFixed(3)}
                        </span>)
                    }
                    {/* <button className="btn btn-outline-primary" type="button">Add</button> */}
                </div>
            </div>
        </div>
    )

}

export default ImageCard