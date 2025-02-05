// Give the smart contract svg code
// out put nft uri
// store on chain 

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "base64-sol/base64.sol";

contract FrancisNFT is ERC721URIStorage {
    uint256  public tokenCounter;
    event CreatedSVGNFT ( uint256 indexed tokeID, string tokenURI);

    constructor () ERC721 ("SVGNFT", "nftSymbol") {
        tokenCounter = 0;
    }

    function create (string memory svg) public {
        _safeMint(msg.sender, tokenCounter); 
        string memory imageURI = svgToImageURI(svg);
        string memory tokenURI = formatTokenURI(imageURI);
        _setTokenURI(tokenCounter, tokenURI);
        emit CreatedSVGNFT(tokenCounter, tokenURI);
        tokenCounter = tokenCounter + 1;
    } 

    function svgToImageURI (string memory svg) public pure returns(string memory) {
        string memory baseURL = "data:image/svg+xml;base64,";
        string memory svgBase64Encoded = Base64.encode(bytes(string(abi.encodePacked(svg))));
        string memory imageURI = string(abi.encodePacked(baseURL, svgBase64Encoded));
    return imageURI;
    }

    function formatTokenURI(string memory imageURI) public pure returns (string memory){
        string memory baseURI = "data:application/json;base64,";
        return string(abi.encodePacked(baseURI, Base64.encode(bytes(abi.encodePacked(
             '{"name": "SVG NFT",',
            '"description": "An NFT based on SVG!",',
            '"attributes": "",',
            '"image": "', imageURI, '"}'
        )))));
    }


}