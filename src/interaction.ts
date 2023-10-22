import { AutocompleteInteraction, ChatInputCommandInteraction, Colors, EmbedBuilder, Interaction, SlashCommandBuilder } from "discord.js";
import { commands } from "./catalog";
import { Logger } from "./logger";

export const logger = new Logger('CMD');

export function getInteractionCommand(interaction: ChatInputCommandInteraction | AutocompleteInteraction): Command | undefined {
  const command = commands.find(c => c.name === interaction.commandName);
  if (!command) return;

  return command;
}

export async function handleInteraction(interaction: Interaction) {
  if (!interaction.inGuild()) return;
  
  if (interaction.isChatInputCommand()) {
    const command = getInteractionCommand(interaction);
    if (command) {
      await command.execute(interaction)
        .catch(async (reason) => {
          let errorMessage = "Something went wrong. Please try again."
          if (reason instanceof Error) errorMessage = reason.message;

          logger.error(reason);
          await replyWithError(interaction, errorMessage);
        });
    }

  } else if (interaction.isAutocomplete()) {
    const command = getInteractionCommand(interaction);
    if (command && command.autocomplete) {
      await command.autocomplete(interaction);
    }
  }
}

export async function replyWithError(interaction: ChatInputCommandInteraction, message: string) {
  const errorEmbed = new EmbedBuilder()
    .setColor(Colors.Red)
    .setDescription(message);

  if (interaction.deferred) {
    await interaction.editReply({ embeds: [errorEmbed] });
    return;
  }

  await interaction.reply({ embeds: [errorEmbed], ephemeral: true })
}

export interface Command {
  name: string;
  description: string;
  configureSlashCommand?: (slashCommand: SlashCommandBuilder) => void;
  autocomplete?: (interaction: AutocompleteInteraction) => Promise<void>;
  execute: (interaction: ChatInputCommandInteraction<'cached' | 'raw'>) => Promise<void>;
}
