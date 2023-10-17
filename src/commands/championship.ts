import { PermissionFlagsBits } from 'discord.js';
import { Command } from '../types';
import logger from '../logger';

const championship: Command = {
  name: 'championship',
  description: 'View & manage championships.',
  configureSlashCommand(sc) {
    sc.setDefaultMemberPermissions(PermissionFlagsBits.Administrator);
    sc.addSubcommand(sub => 
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
    sc.addSubcommand(sub => 
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
    logger.info(`Focused: ${interaction.options.getFocused()}`)
    
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
    logger.info(interaction.options.get('id'));

    await interaction.reply({
      content: 'Hello!',
      ephemeral: true
    });
  },
};

export default championship;
