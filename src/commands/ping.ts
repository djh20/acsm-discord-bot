import { Command } from '../types';

const ping: Command = {
  name: 'ping',
  description: 'Ping, Pong!',
  configureSlashCommand(sc) {
    return sc;
  },
  execute(interaction) {},
};

export default ping;
