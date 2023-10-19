import { AutocompleteInteraction, ChatInputCommandInteraction, Colors, EmbedBuilder, Interaction } from "discord.js";
import { Command } from "./types";
import { commands } from "./catalog";

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
      const error = await command.execute(interaction);
      if (error) await replyWithError(interaction, error);
    }

  } else if (interaction.isAutocomplete()) {
    const command = getInteractionCommand(interaction);
    if (command && command.autocomplete) {
      await command.autocomplete(interaction);
    }
  }
}

export async function replyWithError(interaction: ChatInputCommandInteraction, error: Error) {
  const errorEmbed = new EmbedBuilder()
    .setColor(Colors.Red)
    .setTitle("Error")
    .setDescription(error.message);

  await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
}
