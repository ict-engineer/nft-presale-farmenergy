// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

//-----------------------------------------------------------------------
// ICollection
//-----------------------------------------------------------------------
interface IFarmNFT {
    //----------------------------------------
    // Events
    //----------------------------------------
    event TokensCreated(
        address indexed contractAddress,
        address indexed creator,
        bool priceMatched
    );

    event MetaHashesUpdated(
        address indexed contractAddress,
        address indexed creator
    );

    event TokenCreated(
        address indexed contractAddress,
        address indexed creator,
        uint256 indexed tokenId
    );

    event MetaHashUpdated(
        address indexed contractAddress,
        address indexed creator,
        uint256 indexed tokenId,
        string meta_hash
    );

    //----------------------------------------
    // Functions
    //----------------------------------------
    // function totalSupply(uint256) external view returns (uint256);

    // function collectionId() external view returns (uint256);

    // function createToken(string[] calldata metaHash) external;

    // function updateMetaHash(
    //     uint256 tokenId,
    //     string calldata metaHash
    // ) external;
}
