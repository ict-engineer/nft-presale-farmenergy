// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "./IFarmNFT.sol";

contract FarmNFT is ERC721Burnable, IFarmNFT, ERC721Enumerable, Ownable {

    uint256 public TOKEN_COUNT = 1;
    string public base_url;

    struct FarmType {
        string name;
        string description;
        string meta_hash;
        uint256 total_supply;
        uint256 max_supply;
        uint256 price;
    }
    FarmType public farm_type;
    mapping (uint256 => uint256) public token_types;
    mapping (address => uint256) public balance_of_type;

    event EventSetBaseURL(address sender, string baseURL);

    constructor (
        // address creator
    ) ERC721("FarmToken", "CT") {
        base_url = "https://farmenergy.mypinata.cloud/ipfs/";
        transferOwnership(msg.sender);
        farm_type = FarmType("Farm", "Farm", "QmWry4LmayBgA4U488iDgowK2tqPnshTrUwWe7NJTifmQ6", 0, 300, 0.02 * 1e18);
    }

    // ERC721Enumerable
    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function tokenURI(uint256 token_id)
        public override view returns (string memory)
    {
        return string(
            abi.encodePacked(
                base_url,
                farm_type.meta_hash
            )
        );
    }
    // ERC721Enumerable

    function setBaseURI(string memory url) public onlyOwner returns (string memory) {
        base_url = url;
        emit EventSetBaseURL(msg.sender, base_url);
    }
    
    function updateMetaHash(string memory _meta_hash) public onlyOwner {
        farm_type.meta_hash = _meta_hash;
        emit MetaHashesUpdated(address(this), msg.sender);
    }

    event EventMaxSupplyAndPrice(address indexed contractAddress, address indexed sender);
    function updateMaxSupplyAndPrice(uint256 amount, uint256 price) public onlyOwner {
        farm_type.max_supply += amount;
        farm_type.price = price * 1e8;  // price is 1e10 so to make 1e18 we have to multiple 1e8
        emit EventMaxSupplyAndPrice(address(this), msg.sender);
    }

    function createToken(address sender, uint256 amount)
        public payable {
        require(farm_type.total_supply + amount <= farm_type.max_supply, "MAX LIMIT EXCEED");

        uint256 price = amount * farm_type.price;
        require (price == msg.value, "Price Dismatched!");

        uint256 i;
        farm_type.total_supply += amount;
        balance_of_type[sender] += amount;
        
        for (i = 0; i < amount; i ++) {
            _mint(sender, TOKEN_COUNT ++);
        }
        // Emit Event
        payable(owner()).transfer(msg.value);
        emit TokensCreated(address(this), sender, msg.value == price);
    }

    function typesStatus() public view returns (
        uint256 mine)
    {
        mine= balance_of_type[msg.sender];
        return mine;
    }

}