/**
    * @description      : 
    * @author           : Winner
    * @group            : 
    * @created          : 20/12/2021 - 08:53:23
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 20/12/2021
    * - Author          : Winner
    * - Modification    : 
**/
import React from 'react';

const CowNFTContext = React.createContext({
  contract: null,
  tokenCount: null,
  typeCount: null,
  cowNFT: [],
  cowTypes: [],
  nftIsLoading: true,
  owner: null,
  loadContract: () => {},
  loadTokenCount: () => {},
  loadTypeCount: () => {},
  loadCowTypes: () => {},
  loadAnimalToken: () => {},
  loadOwner: () => {},
  updateTotalSupply: () => {},
  updateAnimalToken: () => {},
  updateOwner: () => {},
  setNftIsLoading: () => {}
});

export default CowNFTContext;