/**
    * @description      : 
    * @author           : Winner
    * @group            : 
    * @created          : 25/12/2021 - 21:29:37
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 25/12/2021
    * - Author          : Winner
    * - Modification    : 
**/
import { useReducer } from 'react';

import LoadingContext from './LoadingContext';

const defaultLoadingState = {
  loadingState: false,
};

const loadingReducer = (state, action) => {
  if(action.type === 'LOADINGSTATE') {
    return {
      loadingState: action.loadingState
    };
  } 
  
  return defaultLoadingState;
};

const LoadingProvider = props => {
  const [loadingState, dispatchLoadingAction] = useReducer(loadingReducer, defaultLoadingState);
  
  const setLoadingStateHandler = async(_loadingState) => {
    dispatchLoadingAction({type: 'LOADINGSTATE', loadingState: _loadingState});
    return _loadingState;
  };
  
  const loadingContext = {
    loadingState:loadingState.loadingState,
    setLoadingState: setLoadingStateHandler
  };
  
  return (
    <LoadingContext.Provider value={loadingContext}>
      {props.children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;