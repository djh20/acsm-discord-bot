import { Interaction, SlashCommandBuilder } from 'discord.js';

export interface Command {
  name: string;
  description: string;
  configureSlashCommand?: (sc: SlashCommandBuilder) => SlashCommandBuilder;
  execute: (interaction: Interaction) => void;
}
