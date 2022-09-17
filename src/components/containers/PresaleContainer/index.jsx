/**
    * @description      : 
    * @author           : Winner
    * @group            : 
    * @created          : 24/12/2021 - 03:09:32
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 24/12/2021
    * - Author          : Winner
    * - Modification    : 
**/
import React, { Component } from 'react'

import Style from './PresaleContainer.css'
import ImageCard from '../../organisms/ImageCard'
import Cow1Image from '../../../assets/images/NFTs/1.gif'
import Cow2Image from '../../../assets/images/NFTs/2.gif'
import Cow3Image from '../../../assets/images/NFTs/3.gif'
import Cow4Image from '../../../assets/images/NFTs/4.gif'
import Cow5Image from '../../../assets/images/NFTs/5.gif'

const PresaleContainer = props => {

    return (
        <>
            <div className='row justify-content-center'>
                <ImageCard src={Cow1Image}/>
                <ImageCard src={Cow2Image} />
                <ImageCard src={Cow3Image} />
                <ImageCard src={Cow4Image} />
                <ImageCard src={Cow5Image} />
            </div>
        </>
    )

}

export default PresaleContainer