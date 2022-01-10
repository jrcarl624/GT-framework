# GT-framework

## What Is It?

This is a project that plans to standardized how GameTest is structured within the bedrock addon community. We aim to create a system that is fast versatile while staying simple to understand. As if as a community we take the initiative to set a standard for a structure to reduce segmentation.

## Configuration

We have a easy to read configuration file that can be used to set i identification of the project without having to go into every command file to configure the project. The configuration is exported under modules for ease of use. Here is the configuration

### Easy Configuration for End Users

We plan to provide a way for the users of packs created with the framework to easily configure the packs. This will allow any device to configure a pack so they don't have to worry about screwing up the pack configuration.<br /> -- work in progress feature --

## Roadmap

- **Database module for tags and scoreboards** - We are waiting for the 1.18.10 update to add the entity tag methods.
- **Commands module** - Functions that wrap all of the slash commands.
- **A permission system for commands and actions**
- **Package manager**
- **Website for easy configuration editing**

## Modules

We plan to have a pseudo npm for different modules. It will be a system where each module will have its own config file and modules. We plan to provide Built-in modules that provide a basic toolkit, for example there is `module/frameworkUtils`. Here is the provided example of the module structure:
<br />

```js
//Found at: module/exampleModule/index.js
export const moduleInfo = {
  moduleName: "example",
  moduleVersion: "1.0.0",
  moduleDescription: "This is an example",
  moduleAuthor: "minerj101 & Avacado",
  moduleFormatVersion: 1,
  moduleDependencies: [],
};
/*You need to export every file here*/
export * from "./exampleFile.js";
/*Every module needs an index.ts or file of same format but if you wish to use a different file name specify in ../index.ts*/
```

```js
//Found at: module/exampleModule/exampleFile.js
//These are required for the framework to work.
export * as fwUtils from "./frameworkUtils/index.js";
export { Config } from "../config.js";
//Export the modules here, do not export like Config is exported.
export * as exampleModule from "./exampleModule/index.js";
```

Its simple to use a module as all you have to do is create a folder and export the contents. A example of how to use the modules is below:

```js
import { exampleModule } from "./module/index.js";
```

### Package Manager

As of right now we do not forsee the Bedrock team using node. So we thought we create a easy way for the end developer to create and use community modules to save time on development. This will handle the work of installing packages so you wont have to export them every time you want to create a module or add one. This also hopes reduce on naming conflicts.
<br />
-- work in progress feature --

## Commands

We provide a framework for building text commands within the game. This is a class based system where all you have to do is create a file and export the contents; then leave the dirty work to the framework. A example of how to create a command is below:

```js
//Found at: commands/exampleCommand.ts
import { Commands, World, BeforeChatEvent } from "mojang-minecraft";
import { exampleModule, fwUtils } from "../module/index.js";
//define name of the command in the class name
export var ping = class {
  static cancelMessage = true; // Cancels the message that the player sends for the command to sent to chat.
  static description = "Says pong in chat with a added message.";
  static aliases = ["PING", "Example", "example"]; // An array of aliases for the command.
  static usage = ["[message]"]; // The name of the command is automatically added to the usage.
  /*
    The stuff executed when command is called from chat.
    Command is a array of all the the stuff from chat split by spaces, the first element is the command name.
    beforeChatEvent is the event that is passed from the subscribe function.
    targetsInMessage is an array of all the players in the current world that appear in the message sent.
    */
  constructor(
    Command?: Array<string>,
    beforeChatEvent?: BeforeChatEvent,
    targetsInMessage?: Array<string>
  ) {
    fwUtils.runCommand(
      `say ${exampleModule.exampleFunction(
        `running from ping with message ${Command[1]}`
      )}`
    );
  }
};
```
