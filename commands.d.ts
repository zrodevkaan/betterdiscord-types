import { Cancel } from "./index";

export enum OptionTypes {
    SUB_COMMAND = 1,
    SUB_COMMAND_GROUP = 2,
    STRING = 3,
    INTEGER = 4,
    BOOLEAN = 5,
    USER = 6,
    CHANNEL = 7,
    ROLE = 8,
    MENTIONABLE = 9,
    NUMBER = 10,
    ATTACHMENT = 11
}

export enum CommandTypes {
    CHAT_INPUT = 1,
    USER = 2,
    MESSAGE = 3
}

export enum InputTypes {
    BUILT_IN = 0,
    TEXT = 1,
    SEARCH = 2,
    BOT = 3,
    PLACEHOLDER = 4
}

export enum MessageEmbedTypes {
    TEXT = "text",
    IMAGE = "image",
    VIDEO = "video",
    GIFV = "gifv",
    ARTICLE = "article",
    LINK = "link",
    RICH = "rich",
    TWEET = "tweet",
    APPLICATION_NEWS = "application_news",
    GAMING_PROFILE = "gaming_profile",
    GIFT = "gift",
    POST_PREVIEW = "post_preview",
    VOICE_CHANNEL = "voice_channel",
    AUTO_MODERATION_MESSAGE = "auto_moderation_message",
    AUTO_MODERATION_NOTIFICATION = "auto_moderation_notification",
    SAFETY_POLICY_NOTICE = "safety_policy_notice",
    SAFETY_SYSTEM_NOTIFICATION = "safety_system_notification"
}

export interface Types {
    OptionTypes: typeof OptionTypes;
    CommandTypes: typeof CommandTypes;
    InputTypes: typeof InputTypes;
    MessageEmbedTypes: typeof MessageEmbedTypes;
}

export interface CommandObject {
    id: string;
    name: string;
    execute: (args?: any) => any;
    [key: string]: any;
}

export interface Commands {
    Types: Types;

    /**
     * Registers a new command
     */
    register(callerName: string, command: CommandObject): Cancel | undefined;

    /**
     * Unregisters a command
     */
    unregister(callerName: string, commandId: string): void;

    /**
     * Unregisters all commands for a specific caller
     */
    unregisterAll(caller: string): void;

    /**
     * Gets all commands registered by a specific caller
     */
    getCommandsByCaller(caller: string): CommandObject[];
}

export interface BoundCommands
    extends Omit<Commands, "register" | "unregister"> {
    /** @see {@link Commands.register} */
    register(command: CommandObject): Cancel | undefined;

    /** @see {@link Commands.unregister} */
    unregister(commandId: string): void;

    /** @see {@link Commands.unregisterAll} */
    unregisterAll(): void;

    /** @see {@link Commands.getCommandsByCaller} */
    getCommandsByCaller(): CommandObject[];
}
