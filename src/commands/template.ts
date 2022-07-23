import { World, BeforeChatEvent } from "mojang-minecraft";

export var template = class {
    //Fill in all the fields here
    static cancelMessage = true;
    static description = ''
    static aliases = []
    static usage = []
    constructor(Command?: Array<string>, beforeChatEvent?: BeforeChatEvent, targets?: Array<string>) {
        //start here
    }
};
