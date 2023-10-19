import { PermissionFlagsBits } from 'discord.js';
import { Command } from '../types';

const bind: Command = {
  name: 'bind',
  description: 'Bind to an ACSM instance.',
  configureSlashCommand(slashCommand) {
    slashCommand.setDefaultMemberPermissions(PermissionFlagsBits.Administrator);
    slashCommand.addStringOption(option =>
      option
        .setName('url')
        .setDescription('URL of ACSM instance.')
        .setRequired(true)
    );
    slashCommand.addStringOption(option =>
      option
        .setName('username')
        .setDescription('ACSM user to authenticate as (must have write access).')
        .setRequired(true)
    );
    slashCommand.addStringOption(option =>
      option
        .setName('password')
        .setDescription('Password for user.')
        .setRequired(true)
    );
  },
  async execute(interaction) {
    const url = interaction.options.getString("url");
    const username = interaction.options.getString("username");
    const password = interaction.options.getString("password");
    await interaction.reply({
      content: `${url} | ${username} | ${password}`,
      ephemeral: true
    })
  },
};

export default bind;