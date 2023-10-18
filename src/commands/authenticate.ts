import { PermissionFlagsBits } from 'discord.js';
import { Command } from '../types';

const authenticate: Command = {
  name: 'authenticate',
  description: 'Connect & authenticate with an ACSM instance.',
  configureSlashCommand(slashCommand) {
    slashCommand.setDefaultMemberPermissions(PermissionFlagsBits.Administrator);
    slashCommand.addStringOption(option =>
      option
        .setName('url')
        .setDescription('URL of ACSM instance')
        .setRequired(true)
    );
  },
  async execute(interaction) {
    await interaction.reply({
      content: 'Not implemented yet :(',
      ephemeral: true
    })
  },
};

export default authenticate;