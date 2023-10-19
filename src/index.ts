import { Client, GatewayIntentBits } from 'discord.js';
import { BOT_TOKEN } from './config';
import logger from './logger';
import { syncCommands } from './sync';
import { commands } from './catalog';
import { handleInteraction } from './interaction';

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
  if (message.content == "!sync" && message.author.id == "271133982924603393" && message.inGuild()) {
    syncCommands(client, commands, message.guildId);
  }
});

client.on('interactionCreate', handleInteraction);
client.login(BOT_TOKEN);
