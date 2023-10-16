import { SlashCommandBuilder } from 'discord.js';
import { Command } from '../types';

const ping: Command = {
  name: 'ping',
  description: 'Ping, Pong!',
  modifySlashCommand(scb) {
    return scb;
  },
  execute(interaction) {},
};

export default ping;
