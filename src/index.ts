import { Client, GatewayIntentBits } from 'discord.js';
import { ADMIN_USER_ID, BOT_TOKEN } from './config';
import { Logger } from './logger';
import { syncCommands } from './sync';
import { commands } from './catalog';
import { handleInteraction } from './interaction';
import { connectToMongo } from './db';

const logger = new Logger('MAIN');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.on('ready', () => {
  logger.info(`Logged in as ${client.user?.tag}!`);
});

client.on('messageCreate', (message) => {
  if (message.content == "::sync" && message.author.id === ADMIN_USER_ID && message.inGuild()) {
    // TODO: Global deploy instead of per guild.
    syncCommands(client, commands, message.guildId);
  }
});

client.on('interactionCreate', handleInteraction);

connectToMongo().then(() => client.login(BOT_TOKEN));
