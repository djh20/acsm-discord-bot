import { Command } from '../types';

const ping: Command = {
  name: 'ping',
  description: 'Ping, Pong!',
  async execute(interaction) {
    await interaction.reply({
      content: "Pong!",
      ephemeral: true
    });
  },
};

export default ping;
