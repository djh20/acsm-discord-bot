import { Command } from './types';
import ping from './commands/ping';
import championship from './commands/championship';

export const commands: Command[] = [
  ping,
  championship
];
