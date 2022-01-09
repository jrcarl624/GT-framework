import { Commands, World } from "mojang-minecraft";
import { Config } from "../index.js"
const FormatText: object = {
    reset: "§r",
    bold: "§l",
    italic: "§o",
    underlined: "§n",
    obfuscated: "§k",
    strikethrough: "§m",
    black: "§0",
    red: "§4",
    green: "§2",
    yellow: "§6",
    blue: "§1",
    magenta: "§5",
    cyan: "§3",
    white: "§f",
    gray: "§8",
    grey: "§8",
    gold: "§g",
    blackBright: "§0",
    redBright: "§c",
    greenBright: "§b",
    yellowBright: "§e",
    blueBright: "§9",
    magentaBright: "§d",
    cyanBright: "§a",
    grayBright: "§7",
    greyBright: "§7",
    whiteBright: "§f",
}


const log = (message: any, logToConsole?: boolean) => {
    //TODO make switch statement for log instead of if and else. Implement log all from Config.
    if (logToConsole === true) {
        console.warn(message);
    }
}
const runCommand = (command: string, dimension?: any, logToConsole?: boolean, origin?: string) => {
    try {
        let cmd = Commands.run(command, World.getDimension(dimension ?? 'overworld'))
        return cmd
    } catch (error) {
        log(`Command from ${origin} gave error: ${error}`, logToConsole)
        return error
    };
};

/**
 * Deals with spaces in target names and removes @ symbols from beginning of target names. If target is @a, @e, @s, @e, or @p  it will return the target as is.
 * @returns cleaned target string
 */
const targetHandler = (target: string) => {
    if (target == "@r" || "@a" || "@s" || "@e" || "@p") { return target }
    if (target.indexOf(" ") > -1) {
        return `"${target}"`.replace(/@/g, "")
    } else { return target.replace(/@/g, "") }
}

const getTargets = (message: string) => {
    var targets = [];
    World.getPlayers().forEach(x => {
        if (message.includes(` @"${x.nameTag}"`) || message.includes(` @${x.nameTag}`) || message.includes(` ${x.nameTag}`) || message.includes(` "${x.nameTag}"`)) {
            targets.push(x.nameTag);
        }
    });
    return targets;
}





export { FormatText, getTargets, log, runCommand, targetHandler };





