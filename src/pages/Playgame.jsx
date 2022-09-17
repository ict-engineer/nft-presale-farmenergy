/**
    * @description      : 
    * @author           : Winner
    * @group            : 
    * @created          : 25/12/2021 - 15:09:53
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 25/12/2021
    * - Author          : Winner
    * - Modification    : 
**/
import React from 'react'
import Comingsoon from '../components/organisms/Comingsoon'
import './pages.scss'

function Playgame() {
    return (
        <>
            <section className="comingsoon">
                <div className="container-fluid">
                    <Comingsoon />
                </div>
            </section>
        </>
    )
}

export default Playgame
