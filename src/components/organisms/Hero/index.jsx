import React from 'react'
import './Hero.scss'
import LogoBig from '../../../assets/images/logo-big.png'
import ImgFrame from '../../../assets/images/content-bg-1.png'

function Hero() {
    return (
        <>
            <section className="hero">
                <div className="container-fluid">
                    <div className="row justify-content-around">
                        <div className="height250 height5-sm"></div>
                        <div className="col-md-4 col-6">
                            <img src={LogoBig} alt="" className="w-100 img-logo-big" />
                        </div>
                        <div className="col-md-12 bg-frame-1">
                            <img src={ImgFrame} alt="" className="w-100" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Hero
