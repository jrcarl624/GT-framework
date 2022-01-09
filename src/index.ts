import * as Commandstrut from './commands/index.js';
import { Config, fwUtils } from './module/index.js';
import { World } from "mojang-minecraft";
//Line 6-23 builds the help command and alias list based off of the Commandstrut object.
// By pre-building it reduces lag by not generating this every time someone runs the help command (Allot harder to lag or crash the server/realm by spamming help).
var element: any, aliases = [], list = [], names = [];

if (Config.commandSettings.hardCoded.help.enabled === true) { aliases.push('help'); }
if (Config.commandSettings.hardCoded.credits.enabled === true) { aliases.push('credits'); }
if (Config.commandSettings.hardCoded.help.enabled === true) { aliases.push('packinfo'); }
for (element of Object.values(Commandstrut)) {
    if (element.aliases === undefined) {
        element.aliases = [];
    }
    for (list of element.aliases) {
        aliases.push(list)
    }
    //TODO make usage an array for multiple usages and add help pages like vanlla has
    aliases.push(element.name)
    element.helpMessage = `§l§2${element.name.toUpperCase()}§r\n`
    if (element.description !== undefined) { element.helpMessage += `§r${element.description}§r\n` }
    if (element.example !== undefined) {
        element.helpMessage += `§r§2Example: §7${Config.prefix + "§e" + element.name + " " + element.usage[0]}§r\n`
    }
    if (element.aliases[0] !== undefined) { element.helpMessage += `§r§2Aliases: §e${element.aliases.join("§r, §e")}§r\n` }
    if (element.hide !== true) { names.push(element.name) }
    //if (element.permission !== undefined) {}
}
//Help command generation ends here
console.warn("Loaded Commands: " + Object.keys(Commandstrut));
//From line 33 onwards command execution happens.
//There are a few hardcoded commands such as version, help & credits. These commands can all be disabled and or configured in config.ts.
World.events.beforeChat.subscribe(beforeChatEvent => {
    if (beforeChatEvent.message.startsWith(Config.prefix)) {
        const Command = beforeChatEvent.message.substring(Config.prefix.length).split(' ');
        switch (Command[0]) {
            case "help":
                if (Config.commandSettings.hardCoded.help.enabled == true) {
                    beforeChatEvent.cancel = true;
                    if (!Object.keys(Commandstrut).includes(Command[1])) {
                        if (Command[1] === undefined) {
                            fwUtils.runCommand(`tellraw "${beforeChatEvent.sender.nameTag}" {"rawtext": [{"text": "§l§2HELP\n§rHere are the possible commands to run. Run §7${Config.prefix}§ehelp [command]§r to get more information on a specific command.\n§7${Config.prefix}§e${names.join(`§r\n§7${Config.prefix}§r§e`)}§r"}]}`)
                        } else fwUtils.runCommand(`tellraw "${beforeChatEvent.sender.nameTag}" {"rawtext":[{"text":"§c"},{"translate":"commands.generic.unknown", "with": ["${Command[1]}"]}]}`);
                    } else if (Commandstrut[Command[1]].hide !== true) {
                        fwUtils.runCommand(`tellraw "${beforeChatEvent.sender.nameTag}"{"rawtext": [{"text": "${Commandstrut[Command[1]].helpMessage}"}]}`)
                    }
                    break;
                }
            case "credits":
                if (Config.commandSettings.hardCoded.credits.enabled == true) {
                    beforeChatEvent.cancel = true;
                    fwUtils.runCommand(`tellraw "${beforeChatEvent.sender.nameTag}" {"rawtext": [{"text": "§eGT-framework written by Minerj101, Dreamedc2015 & other contributors on github github.com/minerj101/GT-framework."}]}`)
                    break;
                }
            case "packinfo":
                if (Config.commandSettings.hardCoded.packInfo.enabled == true) {
                    beforeChatEvent.cancel = true;
                    fwUtils.runCommand(`tellraw "${beforeChatEvent.sender.nameTag}" {"rawtext": [{"text": "§e${Config.packName} ${Config.packVersion} by ${Config.packAuthor} \n §r${Config.packWebsite} "}]}`)
                    break;
                }
        }
        //line 67 onwards checks if a command exists. if the command requested exists it attempts to run it but if the command doesn't exist it throws an error to the user
        for (element of Object.values(Commandstrut)) {
            if ((element.aliases.includes(Command[0]) === true || element.name === Command[0])) {
                if (element.cancelMessage === true) {
                    beforeChatEvent.cancel = true;
                }
                /* Easier to do in next update, rather than having to write new stuff for it now.
                if (element.requiredTags !== undefined) {
                    element.requiredTags.forEach(tags => {
                        if(beforeChatEvent.sender.hasTags(tags) === false){break;}
                        });
                    }
                }
                */
                new Commandstrut[element.name](Command, beforeChatEvent, fwUtils.getTargets(beforeChatEvent.message));
            }
        }
        //Checks if the command exists in aliases, if not it runs a error using the built in error handling with tellraw translate and removes escape codes.
        if (aliases.includes(Command[0]) === false) {
            beforeChatEvent.cancel = true;
            fwUtils.runCommand(`tellraw "${beforeChatEvent.sender.nameTag}" {"rawtext":[{"text":"§c"},{"translate":"commands.generic.unknown", "with": ["${Command[0].replace(/(\r\n|\n|\r)/gm, "")}"]}]}`)
        }
    }
});

