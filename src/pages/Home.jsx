/**
    * @description      : 
    * @author           : Winner
    * @group            : 
    * @created          : 25/12/2021 - 15:10:02
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 25/12/2021
    * - Author          : Winner
    * - Modification    : 
**/
import React from 'react'
import {
    Hero
} from '../components/organisms'
import {
    Description, Endsection,
} from '../components/containers'
import './pages.scss'

function Home() {
    return (
        <>
            <Hero />
            <Description />
            <Endsection />
        </>
    )
}

export default Home
