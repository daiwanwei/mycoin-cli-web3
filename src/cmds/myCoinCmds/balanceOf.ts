import type { Arguments, CommandBuilder } from 'yargs';
import {MyCoinService} from "../../services/myCoin";
import HDWalletProvider from "@truffle/hdwallet-provider";
import Web3 from "web3";

type Options = {
    providerUrl: string;
    privateKey: string;
    contractAddress:string;
    accountAddress:string;
};

export const command: string = 'balanceOf <providerUrl> <privateKey> <contractAddress> <accountAddress>';
export const desc: string = 'balanceOf';

export const builder: CommandBuilder<Options, Options> = (yargs) =>
    yargs
        .positional('providerUrl', { type: 'string', demandOption: true })
        .positional('privateKey', { type: 'string', demandOption: true })
        .positional('contractAddress', { type: 'string', demandOption: true })
        .positional('accountAddress', { type: 'string', demandOption: true });

export async function handler(argv: Arguments<Options>): Promise<void> {
    const { providerUrl, privateKey,contractAddress, accountAddress} = argv;
    const provider = new HDWalletProvider(privateKey, providerUrl);
    const web3Client=new Web3(provider)
    const signer=web3Client.eth.accounts.privateKeyToAccount(privateKey);
    const service = new MyCoinService(web3Client, signer.address)
    const balance=await service.balanceOf(contractAddress,accountAddress)
    process.stdout.write(balance.toString());
    process.exit(0);
};
