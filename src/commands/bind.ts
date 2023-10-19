import { PermissionFlagsBits } from 'discord.js';
import { Command } from '../types';
import { GuildSchema, db } from '../db';

const bind: Command = {
  name: 'bind',
  description: 'Bind to an ACSM instance.',
  configureSlashCommand(slashCommand) {
    slashCommand.setDefaultMemberPermissions(PermissionFlagsBits.Administrator);
    slashCommand.addStringOption(option =>
      option
        .setName('url')
        .setDescription('URL of ACSM instance (e.g. https://acsm.example.com).')
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
    const baseUrl = interaction.options.getString('url');
    const username = interaction.options.getString('username');
    const password = interaction.options.getString('password');

    if (!baseUrl || !username || !password) {
      return Error('Not enough arguments');
    }

    const doc = await db.load<GuildSchema>(interaction.guildId, {});
    doc.data.acsm = { baseUrl, username, password };
    await db.save(doc, true);

    await interaction.reply({
      content: `Successfully bound to ${baseUrl}`,
      ephemeral: true
    });
  },
};

export default bind;