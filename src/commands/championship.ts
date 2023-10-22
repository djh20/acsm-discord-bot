import { Colors, EmbedBuilder, PermissionFlagsBits } from 'discord.js';
import { Command } from '../interaction';
import { fetchChampionshipInfo } from '../acsm/championship';
import { GuildConfig } from '../models/GuildConfig';

const championship: Command = {
  name: 'championship',
  description: 'View & manage championships.',
  configureSlashCommand(slashCommand) {
    slashCommand.setDefaultMemberPermissions(PermissionFlagsBits.Administrator);
    slashCommand.addSubcommand(sub => 
      sub
        .setName('add')
        .setDescription('Add a new championship.')
        .addStringOption(option => 
          option
            .setName('id')
            .setDescription('Championship ID from ACSM (e.g. 1234567-1234-1234-1234-123456789).')
            .setRequired(true)
        )
    );
    slashCommand.addSubcommand(sub => 
      sub
        .setName('remove')
        .setDescription('Remove a championship.')
        .addStringOption(option => 
          option
            .setName('id')
            .setDescription('Championship ID or name.')
            .setRequired(true)
            .setAutocomplete(true)
        )
    );
  },
  async autocomplete(interaction) {
    // Dummy Data
    const championships = [
      {
        id: '19def53b-f3fb-40f5-9be2-bc351df8e655',
        name: 'Bathurst'
      },
      {
        id: '8cc4babf-65a2-414d-bdc7-b8ec00b28e4d',
        name: 'F1 Spa'
      },
      {
        id: '6c54db40-1367-4e98-ac69-23c14270998a',
        name: 'MX5 Crash Course'
      },
    ];

    await interaction.respond(
      championships.map(c => ({ name: c.name, value: c.id }))
    );
  },
  async execute(interaction) {
    const sub = interaction.options.getSubcommand();
    const id = interaction.options.getString('id');

    if (!id) {
      throw Error("Invalid arguments.");
    }

    await interaction.deferReply({ ephemeral: true });

    if (sub == 'add') {
      const guildConfig = await GuildConfig.findById(interaction.guildId);
      if (guildConfig?.acsm) {

        const { info, cookie } = await fetchChampionshipInfo(
          guildConfig.acsm.baseUrl,
          guildConfig.acsm.auth,
          id
        );

        await guildConfig.saveCookie(cookie);

        const embed = new EmbedBuilder()
          .setColor(Colors.Green)
          .setDescription(`Successfully added **${info.Name}**`);

        await interaction.editReply({ embeds: [embed] });

      } else {
        throw Error("You must bind to an ACSM instance to use this command.");
      }

    } else if (sub == 'remove') {
      throw Error('Command not implemented.');
    }
  },
};

export default championship;
