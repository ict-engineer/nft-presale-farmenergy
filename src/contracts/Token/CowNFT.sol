// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "./ICowNFT.sol";

contract CowNFT is ERC721Burnable, ICowNFT, ERC721Enumerable, Ownable {

    uint256 public TOKEN_COUNT = 1;
    uint256 public TYPE_COUNT = 1;
    string public base_url;

    struct CowType {
        string name;
        string description;
        string meta_hash;
        uint256 total_supply;
        uint256 max_supply;
        uint256 price;      // (wei)
    }
    mapping (uint256 => CowType) public cow_types;
    mapping (string => uint256) public type_names;
    mapping (uint256 => uint256) public token_types;
    mapping (address => mapping(uint256 => uint256)) public balance_of_type;

    event EventSetBaseURL(address sender, string baseURL);

    constructor (
        // address creator
    ) ERC721("CowToken", "CT") {
        base_url = "https://farmenergy.mypinata.cloud/ipfs/";
        transferOwnership(msg.sender);
        addType("Guerynsy Cow", "Guerynsy Cow", "QmVzh4mcJxpteoxwnvk62hNFppZrpdgrwXwAQg3UF79Cbb", 0, 1000, 0.01 * 1e18);
        addType("Jersey Cow", "Jersey Cow", "QmQVjQ75mCvR7r71rGJC52SYkA9WDpUZQHXwLFXdN5oZGM", 0, 1000, 0.01 * 1e18);
        addType("BrownSwiss Cow", "BrownSwiss Cow", "QmUV1C3mKF5CCGfRS4gJGN8HB2SK1PaCsGEqjQQcYJ8Szk", 0, 500, 0.02 * 1e18);
        addType("Holstein Cow", "Holstein Cow", "QmedjbCMuB4A8QL2BXLZMRW679sGYSyXAZhhHiXw7KpfwN", 0, 500, 0.03 * 1e18);
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
                cow_types[token_types[token_id]].meta_hash
            )
        );
    }
    // ERC721Enumerable

    function setBaseURI(string memory url) public onlyOwner returns (string memory) {
        base_url = url;
        emit EventSetBaseURL(msg.sender, base_url);
    }

    function typeURI(uint256 type_id)
        public view returns (string memory)
    {
        return string(
            abi.encodePacked(
                base_url,
                cow_types[type_id].meta_hash
            )
        );
    }

    event EventType(address sender, uint256 TYPE_COUNT, CowType cow_type);
    function addType(string memory type_name, string memory description, string memory meta_hash, uint256 total_supply, uint256 max_supply, uint256 price) public onlyOwner {
        require(type_names[type_name] == 0, "Already exists!");
        type_names[type_name] = TYPE_COUNT;
        cow_types[TYPE_COUNT] = CowType(
            type_name, description, meta_hash, total_supply, max_supply, price
        );
        TYPE_COUNT ++;
        emit EventType(msg.sender, TYPE_COUNT, cow_types[TYPE_COUNT - 1]);
    }

    // function setType(uint256 type_id, string memory type_name, string memory description, string memory meta_hash, uint256 total_supply, uint256 max_supply, uint256 price) public onlyOwner {
    //     require (type_id > 0 && type_id < TYPE_COUNT, "INVALIDE TYPE ID");
    //     cow_types[type_id] = CowType(
    //         type_name, description, meta_hash, total_supply, max_supply, price
    //     );
    //     emit EventType(msg.sender, TYPE_COUNT, cow_types[type_id]);
    // }

    function updateMetaHashes(uint256[] memory type_ids, string[] memory _meta_hashes) public onlyOwner {
        uint256 i;
        for (i = 0; i < type_ids.length; i ++) {
            cow_types[type_ids[i]].meta_hash = _meta_hashes[i];
        }
        emit MetaHashesUpdated(address(this), msg.sender);
    }

    event EventMaxSupplysAndPrices(address indexed contractAddress, address indexed sender);
    function updateMaxSupplysAndPrices(uint256[] memory type_ids, uint256[] memory amounts, uint256[] memory prices) public onlyOwner {
        require (type_ids.length == amounts.length, "TOKEN IDS and AMOUNTS length must MATCH!!!");
        uint256 i;
        for (i = 0; i < amounts.length; i ++) {
            cow_types[type_ids[i]].max_supply += amounts[i];
            cow_types[type_ids[i]].price = prices[i] * 1e8; // price is 1e10 so to make 1e18 we have to multiple 1e8
        }
        emit EventMaxSupplysAndPrices(address(this), msg.sender);
    }

    function getPrice(uint256[] memory type_ids, uint256[] memory amounts) public view returns (uint256 price) {
        price = 0;
        uint256 i;
        for (i = 0; i < type_ids.length; i ++) {
            price += cow_types[type_ids[i]].price * amounts[i];
        }
        return price;
    }

    function createTokens(address sender, uint256[] memory type_ids, uint256[] memory amounts)
        public payable {
        require(type_ids.length == amounts.length, "TOKEN IDS and AMOUNTS length must MATCH!!!");
        uint256 i;
        uint256 j;
        uint256 price = 0;
        for (i = 0; i < type_ids.length; i ++) {
            price += cow_types[type_ids[i]].price * amounts[i];
        }
        require (msg.value == price, "Price Dismatched!");
        
        for (i = 0; i < amounts.length; i ++) {
            require(cow_types[type_ids[i]].total_supply + amounts[i] <= cow_types[type_ids[i]].max_supply, "MAX LIMIT EXCEED");
            cow_types[type_ids[i]].total_supply += amounts[i];
            balance_of_type[sender][type_ids[i]] += amounts[i];
            price += amounts[i] * cow_types[type_ids[i]].price;
            for (j = 0; j < amounts[i]; j ++) {
                token_types[TOKEN_COUNT] = type_ids[i];
                _mint(sender, TOKEN_COUNT ++);
            }
        }
        emit TokensCreated(address(this), sender, msg.value == price);
        payable(owner()).transfer(msg.value);
        // Emit Event
    }

    function typesStatus() public view returns (
        // CowType[] memory _cow_types,
        uint256[] memory mines)
    {
        // _cow_types = new CowType[](TYPE_COUNT);
        mines = new uint256[](TYPE_COUNT);
        uint256 i;
        for (i = 0; i < TYPE_COUNT; i ++) {
            // _cow_types[i] = cow_types[i];
            mines[i]= balance_of_type[msg.sender][i + 1];
        }
        return /* (_cow_types,  */mines/* ) */;
    }

}