import { Command } from './interaction';
import ping from './commands/ping';
import championship from './commands/championship';
import bind from './commands/bind';

export const commands: Command[] = [
  ping,
  championship,
  bind
];
