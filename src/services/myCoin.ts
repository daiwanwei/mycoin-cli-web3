import Web3 from "web3";
import { AbiItem } from 'web3-utils'
import MY_COIN_ABI from "../data/abi/MyCoin.json"
import BigNumber from "bignumber.js";

export class MyCoinService{
    private readonly web3Client: Web3
    private readonly signer: string

    constructor(web3Client: Web3, signer: string) {
        this.web3Client = web3Client
        this.signer = signer
    }

    public async balanceOf(contractAddress: string, accountAddress: string): Promise<BigNumber> {
        const myCoin = new this.web3Client.eth.Contract(MY_COIN_ABI as AbiItem[],contractAddress);
        let balance = await myCoin.methods.balanceOf(accountAddress).call()
        return balance
    }

    public async transfer(contractAddress: string, toAddress: string,amount: BigNumber) {
        const myCoin = new this.web3Client.eth.Contract(MY_COIN_ABI as AbiItem[],contractAddress);
        const gasPrice = await this.web3Client.eth.getGasPrice()
        const price = this.web3Client.utils.toWei(gasPrice, 'wei')
        const options = {
            from: this.signer,
            gasLimit: this.web3Client.utils.toHex(3000000),
            gasPrice: this.web3Client.utils.toHex(price)
        }
        let txn = await myCoin.methods.transfer(toAddress,amount)
            .send(options)
        console.log(txn)
    }
}
