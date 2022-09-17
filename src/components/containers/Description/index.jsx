import React from 'react'
import { TwitterTimelineEmbed } from "react-twitter-embed";
import './Description.scss'
import ImgBgContent from '../../../assets/images/bg-content.svg'
import IconFacebook from '../../../assets/images/icon-facebook-brown.png'
import IconTelegram from '../../../assets/images/icon-telegram-brown.png'
import IconTwitter from '../../../assets/images/icon-twitter-brown.png'
import IconDiscord from '../../../assets/images/icon-discord-brown.png'
import IconYoutube from '../../../assets/images/icon-youtube-brown.png'
import ImgHomeSale from '../../../assets/images/home-sale-time.png'
import ImgFrameContent from '../../../assets/images/frame-content3.png'
import ImgTrue from '../../../assets/images/ceklis-true.png'
import ImgFalse from '../../../assets/images/ceklis-false.png'

function Description() {
    return (
        <>
            <section className="description">
                <div className="container-fluid description-con">
                    <div className="row content2 justify-content-center">
                        <div className="col-md-12 bg-content">
                        <img src={ImgBgContent} alt="" className="w-100" />
                        </div>
                    </div>
                    <div className="row content2 justify-content-center">
                        <div className="col-md-4 col-9 content2-left me-0 me-lg-5 mb-4 mb-lg-0">
                            <h1 className="heading mb-3">
                                One of the largest community of NFT games with over 150000 players all over the world.
                            </h1>
                            <p className="desc">
                                Have any questions or just want to share your experience with fellow explorers? Our Telegram and Facebook communities are active and friendly – you can always find out more and chat there.
                            </p>
                        </div>
                        <div className="col-md-4 content2-right ms-0 ms-lg-5">
                            <a href="https://www.facebook.com/Farm-E-107853198424192/" target="_blank" rel="noreferrer noopener">
                                <img src={IconFacebook} alt="" className="icon-media mb-3 me-3" />
                            </a>
                            <a href="https://t.me/+hpDWvmMeOF5hZDFl" target="_blank" rel="noreferrer noopener">
                                <img src={IconTelegram} alt="" className="icon-media mb-3 me-3" />
                            </a>
                            <a href="https://twitter.com/farmenergydev" target="_blank" rel="noreferrer noopener">
                                <img src={IconTwitter} alt="" className="icon-media mb-3 me-3" />
                            </a>
                            <a href="https://discord.gg/jWDNCaMSbr" target="_blank" rel="noreferrer noopener">
                                <img src={IconDiscord} alt="" className="icon-media mb-3 me-3" />
                            </a>
                            <a href="https://www.youtube.com/channel/UCTz3zOQX3w9QqSKmhZy_eZw" target="_blank" rel="noreferrer noopener">
                                <img src={IconYoutube} alt="" className="icon-media mb-3 mb-lg-2" />
                                </a>
                        </div>
                        <div className="height75"></div>
                        <div className="col-md-11 frame-title3">
                            <h1 className="heading">FarmEnergy.io</h1>
                        </div>
                        <div className="col-md-8 content3">
                            <div className="height150"></div>
                            <div className="row px-5">
                                <div className="col-md-12">
                                <h1 className="heading">
                                    Digital Platform Play To Earn <br />
                                    (P2E) Crypto For Virtual Farmer
                                </h1>
                                </div>
                                <div className="height50"></div>
                                <div className="col-md-6">
                                    <h2 className="heading2 mb-0 mb-lg-3">FEC Token :</h2>
                                    <div className="contract mb-3 mb-lg-4">
                                        Coming Soon
                                    </div>
                                    <h2 className="heading2 mb-0 mb-lg-3">UHT Token :</h2>
                                    <div className="contract mb-4 mb-lg-0">
                                        Coming Soon
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <h2 className="heading2 mb-3">Information Board :</h2>
                                    <TwitterTimelineEmbed
                                        sourceType="profile"
                                        screenName="Farmenergydev"
                                        options={{
                                        width: "100%",
                                        height: 270,
                                        }}
                                        theme="light"
                                        noFooter="true"
                                    ></TwitterTimelineEmbed>
                                </div>
                            </div>
                            <div className="height150 height100-sm"></div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-7 col-10 frame-title-intro">
                            <h1 className="heading">INTRODUCTION</h1>
                        </div>
                    </div>
                    <div className="height20"></div>
                    <div className="row justify-content-center px-lg-5">
                        <div className="col-md-4 col-10 contentintro-left me-0 me-lg-5 d-flex flex-column justify-content-center mb-3 mb-lg-0">
                            <h1 className="heading mb-3 mb-lg-4">
                                Happy Playing, Happy Earning ~
                            </h1>
                            <p className="desc mb-3">
                                FarmEnergy is an Farming Game inspired Play To Earn (P2E) which player have an opportunity to earn almost fix income while playing. Players can own our 2D (Non Fungible characters) for caring and get a Reward Token.
                            </p>
                            <p className="desc">
                                In our new world, all game lover not also playing games as hobby but can have additional income by contributing in our game.
                            </p>
                        </div>
                        <div className="col-md-4 col-10 contentintro-right ms-0 ms-lg-5 text-center">
                            <div className="frame-youtube">
                                <div className="ratio ratio-16x9 embed-youtube">
                                    <iframe src="https://www.youtube.com/embed/3hGUwwNDkC8?rel=0" title="YouTube video" allowFullScreen></iframe>
                                </div>
                            </div>
                            <img src={ImgHomeSale} alt="" className="image-sale" />
                        </div>
                    </div>
                    <div className="height75 height30-sm"></div>
                    <div className="row justify-content-center">
                        <div className="col-md-11 frame-roadmap text-center mb-3 mb-lg-4">
                            <h1 className="heading">ROADMAP</h1>
                            <span className="desc">Watch every step here and let us work.</span>
                        </div>
                        <div className="col-md-10">
                            <div className="row justify-content-center">
                                <div className="col-md-6 frame-roadmap-phase mb-3 mb-lg-4">
                                    <div className="title-phase">
                                        <h1 className="heading">PHASE 1 Q4 2021</h1>
                                    </div>
                                    <div className="content-phase">
                                        <img src={ImgFrameContent} alt="" className="w-100 img-phase-frame" />
                                        <ul>
                                        <li>Recruit Core Team <img src={ImgTrue} height="20" alt="" className="img-pahse-cek" /></li>
                                        <li>Game System Planning and Preparation <img src={ImgTrue} height="20" alt="" className="img-pahse-cek" /></li>
                                        <li>Graphic design of characters and NFTs <img src={ImgTrue} height="20" alt="" className="img-pahse-cek" /></li>
                                        <li>Building the game <img src={ImgTrue} height="15" alt="" /></li>
                                        <li>Website build and launch <img src={ImgTrue} height="15" alt="" /></li>
                                        <li>Launch social networking community <img src={ImgTrue} height="15" alt="" /></li>
                                        <li>Marketing plan <img src={ImgTrue} height="15" alt="" /></li>
                                        <li>Public NFT launch <img src={ImgFalse} height="15" alt="" /></li>
                                        <li>Tokenomics <img src={ImgFalse} height="15" alt="" /></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-6 frame-roadmap-phase mb-4">
                                    <div className="title-phase">
                                        <h1 className="heading">PHASE 2 Q1 2022</h1>
                                    </div>
                                    <div className="content-phase">
                                        <img src={ImgFrameContent} alt="" className="w-100" />
                                        <ul>
                                        <li>NFT Presales <img src={ImgFalse} height="15" alt="" /></li>
                                        <li>Contract Auditor <img src={ImgFalse} height="15" alt="" /></li>
                                        <li>Public launch on PancakeSwap (FEC, UHT) <img src={ImgFalse} height="15" alt="" /></li>
                                        <li>Listing on Coingecko, CoinMarketCap, Others (FEC, UHT) <img src={ImgFalse} height="15" alt="" /></li>
                                        <li>Play To Earn Launch (FEC, UHT) <img src={ImgFalse} height="15" alt="" /></li>
                                        <li>Staking and Liquidity (FEC, UHT) <img src={ImgFalse} height="15" alt="" /></li>
                                        <li>Listing to Exchange <img src={ImgFalse} height="15" alt="" /></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-6 frame-roadmap-phase mb-4">
                                    <div className="title-phase">
                                        <h1 className="heading">PHASE 3 Q2 2022</h1>
                                    </div>
                                    <div className="content-phase">
                                        <img src={ImgFrameContent} alt="" className="w-100" />
                                        <ul>
                                        <li>Influencer marketing <img src={ImgFalse} height="15" alt="" /></li>
                                        <li>Release New Animal <img src={ImgFalse} height="15" alt="" /></li>
                                        <li>Release Booster and Items <img src={ImgFalse} height="15" alt="" /></li>
                                        <li>Adding more team on development <img src={ImgFalse} height="15" alt="" /></li>
                                        <li>Building and Launch FarmEnergy Swap <img src={ImgFalse} height="15" alt="" /></li>
                                        <li>Parnerships <img src={ImgFalse} height="15" alt="" /></li>
                                        <li>Cross Platform Game Relesase <img src={ImgFalse} height="15" alt="" /></li>
                                        <li>Adding more exchange <img src={ImgFalse} height="15" alt="" /></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="height75 height30-sm"></div>
                    <div className="row justify-content-center">
                        <div className="col-md-5 frame-faq text-center mb-3 mb-lg-4">
                            <h1 className="heading">FAQ</h1>
                        </div>
                        <div className="col-md-8 accordion-faq">
                            <div className="accordion accordion-flush" id="accordionFlushFAQ">
                                <div className="accordion-item mb-4">
                                    <h2 className="accordion-header" id="flush-heading1">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse1" aria-expanded="false" aria-controls="flush-collapse1">
                                        Why Choosing FarmEnergy.io?
                                        </button>
                                    </h2>
                                    <div id="flush-collapse1" className="accordion-collapse collapse" aria-labelledby="flush-heading1" data-bs-parent="#accordionFlushFAQ">
                                        <div className="accordion-body">
                                        We will work hard to make sure all Investor and Player have a best experience in Crypto Earnings. This Community is our 1st priority, so dont stop watching our progress.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item mb-4">
                                    <h2 className="accordion-header" id="flush-heading2">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse2" aria-expanded="false" aria-controls="flush-collapse2">
                                        How far FarmEnergy.io will reach Crypto Market?
                                        </button>
                                    </h2>
                                    <div id="flush-collapse2" className="accordion-collapse collapse" aria-labelledby="flush-heading2" data-bs-parent="#accordionFlushFAQ">
                                        <div className="accordion-body">
                                        We are going to be one of the most competitive Developer to make so much Project in Crypto and NFT Marketplace. Project is not end in the game, you can check our roadmap for this 2022 Project this year and much more utility.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item mb-4">
                                    <h2 className="accordion-header" id="flush-heading3">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse3" aria-expanded="false" aria-controls="flush-collapse3">
                                        Why FarmEnergy.io using 2 Tokens?
                                        </button>
                                    </h2>
                                    <div id="flush-collapse3" className="accordion-collapse collapse" aria-labelledby="flush-heading3" data-bs-parent="#accordionFlushFAQ">
                                        <div className="accordion-body">
                                        We will have Main Token as Input and Reward Token as Output. With all Utilities and feature will be focused to raise the Price.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item mb-4">
                                    <h2 className="accordion-header" id="flush-heading4">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse4" aria-expanded="false" aria-controls="flush-collapse4">
                                        Is it Fix income in FarmEnergy.io Games?
                                        </button>
                                    </h2>
                                    <div id="flush-collapse4" className="accordion-collapse collapse" aria-labelledby="flush-heading4" data-bs-parent="#accordionFlushFAQ">
                                        <div className="accordion-body">
                                        Yes, off coure we will make our player can have fix income with System like Oracle system so Player can get as much as we promise for contributing in our games.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item mb-4">
                                    <h2 className="accordion-header" id="flush-heading5">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse5" aria-expanded="false" aria-controls="flush-collapse5">
                                        Why must hold FEC and UHT Token?
                                        </button>
                                    </h2>
                                    <div id="flush-collapse5" className="accordion-collapse collapse" aria-labelledby="flush-heading5" data-bs-parent="#accordionFlushFAQ">
                                        <div className="accordion-body">
                                        Every transaction will distribute to add liquidity, sharing to holder, and fund to ulitily development. The holder will see their token keep increasing by the time we are on developing this project. Investor promotion and Staking system will also running to make all of you happy.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Description