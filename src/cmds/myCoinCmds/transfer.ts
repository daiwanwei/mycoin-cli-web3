import type { Arguments, CommandBuilder } from 'yargs';
import {MyCoinService} from "../../services/myCoin";
import HDWalletProvider from "@truffle/hdwallet-provider";
import Web3 from "web3";
import BigNumber from "bignumber.js";

type Options = {
    providerUrl: string;
    privateKey: string;
    contractAddress:string;
    toAddress:string;
    amount:string;
};

export const command: string = 'transfer <providerUrl> <privateKey> <contractAddress> <toAddress> <amount>';
export const desc: string = 'transfer';

export const builder: CommandBuilder<Options, Options> = (yargs) =>
    yargs
        .positional('providerUrl', { type: 'string', demandOption: true })
        .positional('privateKey', { type: 'string', demandOption: true })
        .positional('contractAddress', { type: 'string', demandOption: true })
        .positional('toAddress', { type: 'string', demandOption: true })
        .positional('amount', { type: 'string', demandOption: true });

export async function handler(argv: Arguments<Options>): Promise<void> {
    const { providerUrl, privateKey,contractAddress, toAddress,amount} = argv;
    const provider = new HDWalletProvider(privateKey, providerUrl);
    const web3Client=new Web3(provider)
    const signer=web3Client.eth.accounts.privateKeyToAccount(privateKey);
    const service = new MyCoinService(web3Client, signer.address)
    await service.transfer(contractAddress,toAddress,new BigNumber(amount))
    process.exit(0);
};
