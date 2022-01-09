import { Commands, World, BeforeChatEvent } from "mojang-minecraft";
import { exampleModule, fwUtils } from "../module/index.js";
//define name of the command in the class name
export var ping = class {
    static cancelMessage = true // Cancels the message that the player sends for the command to sent to chat.
    static description = 'Says pong in chat with a added message.'
    static aliases = ["PING", "Example", "example"] // An array of aliases for the command.
    static usage = ["[message]"] // The name of the command is automatically added to the usage.
    /*
    The stuff executed when command is called from chat.
    Command is a array of all the the stuff from chat split by spaces, the first element is the command name.
    beforeChatEvent is the event that is passed from the subscribe function.
    targetsInMessage is an array of all the players in the current world that appear in the message sent.
    */
    constructor(Command?: Array<string>, beforeChatEvent?: BeforeChatEvent, targetsInMessage?: Array<string>) {
        fwUtils.runCommand(`say ${exampleModule.exampleFunction(`running from ping with message ${Command[1]}`)}`)
    }
};


