/**
    * @description      : 
    * @author           : Winner
    * @group            : 
    * @created          : 25/12/2021 - 15:13:52
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 25/12/2021
    * - Author          : Winner
    * - Modification    : 
**/
import React from 'react'
import './Navbar.scss'
import Logo from '../../../assets/images/logo.png'
import PDFWhitepaper from '../../../assets/pdf/Whitepaper.pdf'
import { Link } from "react-router-dom";
import ConnectButton from '../ConnectButton/ConnectButton'


function Navbar(props) {
    return (
        <header className="px50">
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">
                        <img src={Logo} alt="" className="d-inline-block align-text-middle" />FarmEnergy.io
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/" className="nav-link active">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/presale" className="nav-link">NFT Presale</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/playgame" className="nav-link">Playgame</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/marketplace" className="nav-link">Marketplace</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" target="_blank" rel="noreferrer noopener" href={PDFWhitepaper}>Whitepaper</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/#contact-us">Contact Us</a>
                            </li>
                        </ul>
                        <div className="d-flex">
                            {/* <button className="btn btn-connect" onClick = {props.connectMetamask}>Connect</button> */}
                            <ConnectButton />
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar