import { AutocompleteInteraction, ChatInputCommandInteraction, Interaction, SlashCommandBuilder } from 'discord.js';

export interface Command {
  name: string;
  description: string;
  configureSlashCommand?: (slashCommand: SlashCommandBuilder) => void;
  autocomplete?: (interaction: AutocompleteInteraction) => Promise<void>;
  execute: (interaction: ChatInputCommandInteraction<'cached' | 'raw'>) => Promise<void | Error>;
}
