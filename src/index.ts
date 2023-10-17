import { AutocompleteInteraction, ChatInputCommandInteraction, Client, GatewayIntentBits, InteractionType } from 'discord.js';
import { BOT_TOKEN } from './config';
import logger from './logger';
import { syncCommands } from './sync';
import { commands } from './catalog';
import { Command } from './types';

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

function getInteractionCommand(interaction: ChatInputCommandInteraction | AutocompleteInteraction): Command | undefined {
  const command = commands.find(c => c.name === interaction.commandName);
  if (!command) return;

  return command;
}

client.on('interactionCreate', async (interaction) => {
  if (interaction.isChatInputCommand()) {
    const command = getInteractionCommand(interaction);
    if (command) {
      await command.execute(interaction);
    }

  } else if (interaction.isAutocomplete()) {
    const command = getInteractionCommand(interaction);
    if (command && command.autocomplete) {
      await command.autocomplete(interaction);
    }
  }
});

client.login(BOT_TOKEN);
