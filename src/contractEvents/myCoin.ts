
import {Contract, } from 'web3-eth-contract';
import Web3 from "web3";
import MY_COIN_ABI from "../data/abi/MyCoin.json";
import {AbiItem} from "web3-utils";

export class MyCoinEventManager{
    private contracts:Map<string,Contract>=new Map<string,Contract>()
    private web3Client:Web3
    constructor(web3Client:Web3) {
        this.web3Client=web3Client;
    }
    public addContract(contractAddress:string){
        const myCoin = new this.web3Client.eth.Contract(MY_COIN_ABI as AbiItem[],contractAddress);
        myCoin.events.Transfer()
            .on('data', (event: any) => console.log(event))
            .on('changed', (changed: any) => console.log(changed))
            .on('error', (err: any) => console.log(err))
            .on('connected', (str: any) => console.log(str))
        this.contracts.set(contractAddress,myCoin)
    }
}
