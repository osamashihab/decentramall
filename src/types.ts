import { ethers } from 'ethers';
import { DecentramallTokenInstance, EstateAgentInstance, RentalAgentInstance } from '../src/contracts/types/index';

export interface IStorage {
    title: string;
    description: string;
    category: string;
    logo: Uint8Array;
    url: string;
}
export interface IRent extends IStorage {
    //
    // rightfulOwner: string;
    rentedTo: string;
    rentalEarned: string;
    expiryBlock: string;
}

export interface ISpace {
    buyer: string;
    price: string;
    tokenId: string;
    rent?: IRent;
}

// each space has only one rent, but a user, can have a space (rented or not) and can be renting a space to someone else
export interface IUser {
    signer?: ethers.Signer;
    ensAddress?: string;
    space?: ISpace;
    rent?: IRent;
}

export interface IChainContext {
    spaces: ISpace[];
    user: IUser;
    decentramallTokenInstance?: ethers.Contract & DecentramallTokenInstance;
    estateAgentInstance?: ethers.Contract & EstateAgentInstance;
    rentalAgentInstance?: ethers.Contract & RentalAgentInstance;
}
