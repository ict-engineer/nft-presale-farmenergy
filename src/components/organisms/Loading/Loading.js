/**
    * @description      : 
    * @author           : Winner
    * @group            : 
    * @created          : 28/12/2021 - 17:54:40
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 28/12/2021
    * - Author          : Winner
    * - Modification    : 
**/
import React from 'react';
import LoadingImg from '../../../img/loading.gif'
import './style.css'

const Loading = () => {
    return (
        <div className="flex-container" style={{ position: 'fixed', width: 100 + '%', top: 0, bottom: 0, zIndex: 100000, textAlign: 'center', backgroundColor: `rgba(240, 240, 240, 0.9)` }}>
            <div className="row" style={{ height: 100 + '%', verticalAlign: 'middle' }}>
                <div style={{ alignSelf: 'center' }}>
                    <div className="col-md-12">
                        <img src={LoadingImg} style={{ width: 20 + '%' }} />
                    </div>
                    <div className="col-md-12 loading" style={{ fontSize: 3 + 'rem' }}>Loading...</div>
                </div>
            </div>
        </div>
    )
}

export default Loading