// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EnergyTrading {
    struct EnergyListing {
        address seller;
        uint256 energyAmount;
        uint256 price;
        bool isActive;
    }

    EnergyListing[] public energyListings;
    mapping(address => uint256) public userBalances;

    event EnergyListed(uint256 indexed listingId, address indexed seller, uint256 energyAmount, uint256 price);
    event EnergyBought(uint256 indexed listingId, address indexed buyer, uint256 energyAmount, uint256 price);

    function listEnergy(uint256 energyAmount, uint256 price) public {
        require(energyAmount > 0, "Energy must be greater than zero");
        require(price > 0, "Price must be greater than zero");

        energyListings.push(EnergyListing(msg.sender, energyAmount, price, true));

        emit EnergyListed(energyListings.length - 1, msg.sender, energyAmount, price);
    }

    function buyEnergy(uint256 listingId) public payable {
        require(listingId < energyListings.length, "Invalid listing ID");
        EnergyListing storage listing = energyListings[listingId];

        require(listing.isActive, "Listing is no longer active");
        require(msg.value >= listing.price, "Insufficient payment");

        userBalances[listing.seller] += msg.value;
        listing.isActive = false;

        emit EnergyBought(listingId, msg.sender, listing.energyAmount, listing.price);
    }

    function getListings() public view returns (EnergyListing[] memory) {
        return energyListings;
    }
}
