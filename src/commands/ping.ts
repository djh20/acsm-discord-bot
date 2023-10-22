import { Colors, EmbedBuilder } from 'discord.js';
import { Command } from '../interaction';

const ping: Command = {
  name: 'ping',
  description: 'Ping, Pong!',
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor(Colors.Green)
      .setDescription('Pong!');

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};

export default ping;
