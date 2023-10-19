import { PermissionFlagsBits } from 'discord.js';
import { Command } from '../types';
import logger from '../logger';
import * as acsm from '../acsm';
import { GuildSchema, db } from '../db';

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
      return Error("No ID specified");
    }

    if (sub == 'add') {
      const doc = await db.load<GuildSchema>(interaction.guildId, {});
      if (doc.data.acsm) {
        const cookie = await acsm.authenticate(
          doc.data.acsm.baseUrl, 
          doc.data.acsm.username, 
          doc.data.acsm.password
        );

        const championshipInfo = await acsm.getChampionshipInfo(
          doc.data.acsm.baseUrl,
          cookie,
          id
        );

        logger.info(championshipInfo);
      }
      db.release(doc);

    } else if (sub == 'remove') {
      await interaction.reply({
        content: 'Coming soon!',
        ephemeral: true
      });
    }
  },
};

export default championship;
