import { Colors, EmbedBuilder, PermissionFlagsBits } from 'discord.js';
import { Command } from '../interaction';
import { GuildConfig } from '../models/GuildConfig';

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
      throw Error('Invalid arguments.');
    }

    await interaction.deferReply({ ephemeral: true });

    await GuildConfig.findByIdAndUpdate(
      interaction.guildId, 
      { acsm: { baseUrl, auth: { username, password } } }, 
      { upsert: true }
    )

    /*
    await db.update<GuildSchema>(interaction.guildId, {}, (doc) => {
      doc.acsm = {
        baseUrl,
        auth: { username, password }
      };
      return doc;
    });
    */

    const embed = new EmbedBuilder()
      .setColor(Colors.Green)
      .setDescription(`Successfully bound to ${baseUrl}`);

    await interaction.editReply({ embeds: [embed] });
  },
};

export default bind;