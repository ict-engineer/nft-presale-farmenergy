/**
    * @description      : 
    * @author           : Winner
    * @group            : 
    * @created          : 19/12/2021 - 05:49:23
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 19/12/2021
    * - Author          : Winner
    * - Modification    : 
**/
var CowNFT = artifacts.require('./src/contracts/Token/CowNFT.sol');
var FarmNFT = artifacts.require('./src/contracts/Token/FarmNFT.sol');
var PresaleContract = artifacts.require('./src/contracts/PresaleContract.sol');

module.exports = async function (deployer) {
  await deployer.deploy(CowNFT);
  await deployer.deploy(FarmNFT);
  const deployedCowToken = await CowNFT.deployed();
  const deployedFarmToken = await FarmNFT.deployed();
  // await deployer.deploy(PresaleContract, deployedCowToken.address, deployedFarmToken.address);
};