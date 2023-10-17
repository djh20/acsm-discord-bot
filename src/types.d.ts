import { AutocompleteInteraction, ChatInputCommandInteraction, Interaction, SlashCommandBuilder } from 'discord.js';

export interface Command {
  name: string;
  description: string;
  configureSlashCommand?: (sc: SlashCommandBuilder) => void;
  autocomplete?: (interaction: AutocompleteInteraction) => Promise<void>;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}
