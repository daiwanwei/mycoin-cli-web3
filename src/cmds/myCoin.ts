import type { Arguments, CommandBuilder } from 'yargs';

export const command: string = 'myCoin <command>';
export const desc: string = 'contract use case';

type Options = {
    command: string;
};

export const builder: CommandBuilder<Options,Options> = (yargs) =>
    yargs
        // .positional("command", {
        // choices: ["deployMyCoin"],
        // demandOption:true,})
        .commandDir('./myCoinCmds')

export  function handler(argv: Arguments<Options>){
};
