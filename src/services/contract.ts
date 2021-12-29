import Web3 from "web3";
import {AbiItem} from 'web3-utils'
import MY_COIN_ABI from "../data/abi/MyCoin.json"
import MY_COIN_BIN from "../data/bin/MyCoin.json"


export class ContractService {
    private readonly web3Client: Web3
    private readonly signer: string

    constructor(web3Client: Web3, signer: string) {
        this.web3Client = web3Client
        this.signer = signer
    }

    public async deployMyCoin() {
        const myCoin = new this.web3Client.eth.Contract(MY_COIN_ABI as AbiItem[]);
        const gasPrice = await this.web3Client.eth.getGasPrice()
        const price = this.web3Client.utils.toWei(gasPrice, 'wei')
        const options = {
            from: this.signer,
            gasLimit: this.web3Client.utils.toHex(3000000),
            gasPrice: this.web3Client.utils.toHex(price)
        }
        await myCoin.deploy({data: MY_COIN_BIN.bytecode,})
            .send(options)
            .on('error', function (error) {
                console.log(error)
            })
            .on('transactionHash', function (transactionHash) {
                console.log(`listen transactionHash: ${transactionHash}`)
            })
            .on('receipt', function (receipt) {
                console.log(`listen receipt: ${receipt}`) // contains the new contract address
            })
            .on('confirmation', function (confirmationNumber, receipt) {
                console.log(`listen confirmation: ${confirmationNumber}`)
                console.log(`listen confirmation: ${receipt}`)
            }).then(function (newContractInstance) {
                console.log(newContractInstance.options.address) // instance with the new contract address
            }).catch(e => console.log(e));
    }

}
