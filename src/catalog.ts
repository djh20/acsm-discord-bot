import { Command } from './types';
import ping from './commands/ping';
import championship from './commands/championship';
import bind from './commands/bind';

export const commands: Command[] = [
  ping,
  championship,
  bind
];
