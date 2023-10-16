import { Interaction, SlashCommandBuilder } from 'discord.js';

export interface Command {
  name: string;
  description: string;
  modifySlashCommand?: (scb: SlashCommandBuilder) => SlashCommandBuilder;
  execute: (interaction: Interaction) => void;
}
