import type { Arguments, CommandBuilder } from 'yargs';

export const command: string = 'contract <command>';
export const desc: string = 'contract use case';

type Options = {
    command: string;
};

export const builder: CommandBuilder<Options,Options> = (yargs) =>
    yargs
        // .positional("command", {
        // choices: ["deployMyCoin"],
        // demandOption:true,})
        .commandDir('./contractCmds')

export  function handler(argv: Arguments<Options>){
};
