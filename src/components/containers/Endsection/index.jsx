import React from 'react'
import './Endsection.scss'
import ImgPartnerBSC from '../../../assets/images/partner-bsc.png'
import ImgPartnerPancake from '../../../assets/images/partner-pancake.png'
import ImgTeam1 from '../../../assets/images/team1.png'
import ImgTeam2 from '../../../assets/images/team2.png'
import ImgTeam3 from '../../../assets/images/team3.png'
import ImgTeam4 from '../../../assets/images/team4.png'
import ImgTeam5 from '../../../assets/images/team5.png'
import ImgTeam6 from '../../../assets/images/team6.png'
import ImgBgFooter from '../../../assets/images/bg-footer.png'
import ImgYoutube from '../../../assets/images/footer-social-youtube.png'
import ImgFacebook from '../../../assets/images/footer-social-facebook.png'
import ImgTwitter from '../../../assets/images/footer-social-twitter.png'
import ImgTelegram from '../../../assets/images/footer-social-telegram.png'
import ImgDiscord from '../../../assets/images/footer-social-discord.png'
import ImgLogo from '../../../assets/images/logo-big.png'


function Endsection() {
    return (
        <>
            <section className="end-section">
                <div className="container-fluid">
                    <div className="height600 height20-sm"></div>
                    <div className="row partners justify-content-center">
                        <div className="col-md-10">
                            <div className="heading">Partner and Backers</div>
                        </div>
                        <div className="height50 height20-sm"></div>
                        <div className="col-md-10">
                            <div className="row justify-content-center">
                                <div className="col-md-4 col-4 p-lg-4 mb-3 mb-lg-0">
                                    <a href="#" target="_blank"><img src={ImgPartnerBSC} alt="" className="img-fluid" /></a>
                                </div>
                                <div className="col-md-4 col-4 p-lg-4 mb-3 mb-lg-0">
                                    <a href="#" target="_blank"><img src={ImgPartnerPancake} alt="" className="img-fluid" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="height100 height30-sm"></div>
                    <div className="row teams justify-content-center">
                        <div className="col-md-10">
                            <div className="heading">Our Beloved Team</div>
                        </div>
                        <div className="height50 height20-sm"></div>
                        <div className="col-md-10">
                            <div className="row justify-content-center">
                                <div className="col-4 text-center">
                                    <img src={ImgTeam1} alt="" className="img-fluid img-team p-lg-4" />
                                    <h5 className="name">Jansen B.</h5>
                                    <p className="title">Chief Executive Officer</p>
                                </div>
                                <div className="col-4 text-center">
                                    <img src={ImgTeam2} alt="" className="img-fluid img-team p-lg-4" />
                                    <h5 className="name">Ramira J.</h5>
                                    <p className="title">Chief Technical Officer</p>
                                </div>
                                <div className="col-4 text-center">
                                    <img src={ImgTeam3} alt="" className="img-fluid img-team p-lg-4" />
                                    <h5 className="name">Aaronly S.</h5>
                                    <p className="title">Chief Operational Officer</p>
                                </div>
                                <div className="col-4 text-center">
                                    <img src={ImgTeam4} alt="" className="img-fluid img-team p-lg-4" />
                                    <h5 className="name">Fajrul Aslim</h5>
                                    <p className="title">Website Developer </p>
                                </div>
                                <div className="col-4 text-center">
                                    <img src={ImgTeam5} alt="" className="img-fluid img-team p-lg-4" />
                                    <h5 className="name">Igor K.</h5>
                                    <p className="title">Blockhain Developer</p>
                                </div>
                                <div className="col-4 text-center">
                                    <img src={ImgTeam6} alt="" className="img-fluid img-team p-lg-4" />
                                    <h5 className="name">U. Reborn</h5>
                                    <p className="title">Graphic Designer</p>
                                </div>
                            </div>
                        </div>
                        <div className="height100 height50-sm"></div>
                    </div>
                    <div className="row footer justify-content-center" id="contact-us">
                        <div className="col-md-11 bg-footer d-none d-md-block">
                            <img src={ImgBgFooter} alt="" className="w-100" />
                        </div>
                        <div className="height50-sm"></div>
                        <div className="col-md-9 content-footer">
                            <div className="row justify-content-center">
                                <div className="col-md-6 col-7 footer-left ms-0 ms-lg-4">
                                    <div className="logo me-2 me-lg-3">
                                        <img src={ImgLogo} alt="" className="logo-img" />
                                    </div>
                                    <div className="address">
                                        <h5 className="title">
                                            GET IN TOUCH <br />JOIN OUR COMMUNITY
                                        </h5>
                                        <div className="copyright">
                                            <small>Copyright © 2021.</small>
                                            <small>All Rights Reserved By Farm Energy Dev.</small>
                                            <small>Powered by WiriWiri.</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-5 col-5 footer-right">
                                    <h5 className="title mb-2">Follows :</h5>
                                    <a href="https://www.youtube.com/channel/UCTz3zOQX3w9QqSKmhZy_eZw" target="_blank" className="me-1 me-lg-3">
                                        <img src={ImgYoutube} alt="" />
                                    </a>
                                    <a href="https://www.facebook.com/Farm-E-107853198424192/" target="_blank" className="me-1 me-lg-3">
                                        <img src={ImgFacebook} alt="" />
                                    </a>
                                    <a href="https://twitter.com/farmenergydev" target="_blank" className="me-1 me-lg-3">
                                        <img src={ImgTwitter} alt="" />
                                    </a>
                                    <a href="https://t.me/+hpDWvmMeOF5hZDFl" target="_blank">
                                        <img src={ImgTelegram} alt="" className="me-1 me-lg-3" />
                                    </a>
                                    <a href="https://discord.gg/jWDNCaMSbr" target="_blank">
                                        <img src={ImgDiscord} alt="" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Endsection
