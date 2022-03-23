import type { Arguments, CommandBuilder } from 'yargs';
import {ContractService} from "../../services/contract";
import HDWalletProvider from "@truffle/hdwallet-provider";
import Web3 from "web3";

type Options = {
    providerUrl: string;
    privateKey: string;
};

export const command: string = 'deployMyCoin <providerUrl> <privateKey>';
export const desc: string = 'deploy MyCoin';

export const builder: CommandBuilder<Options, Options> = (yargs) =>
    yargs.positional('providerUrl', { type: 'string', demandOption: true })
        .positional('privateKey', { type: 'string', demandOption: true });

export async function handler(argv: Arguments<Options>): Promise<void> {
    const { providerUrl, privateKey } = argv;
    const provider = new HDWalletProvider(privateKey, providerUrl);
    const web3Client=new Web3(provider)
    const signer=web3Client.eth.accounts.privateKeyToAccount(privateKey);
    const service = new ContractService(web3Client, signer.address)
    await service.deployMyCoin()
    process.exit(0);
};
