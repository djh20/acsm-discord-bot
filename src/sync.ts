import { Client, REST, Routes, SlashCommandBuilder } from "discord.js";
import { Command } from "./interaction";
import { logger } from "./interaction";

export async function syncCommands(client: Client, commands: Command[], guildId?: string) {
  if (!client.token || !client.application?.id) return;

  logger.info("Syncing commands...");

  const jsonSlashCommands = commands.map(command => {
    const slashCommand = new SlashCommandBuilder()
      .setName(command.name)
      .setDescription(command.description);

    if (command.configureSlashCommand) {
      command.configureSlashCommand(slashCommand);
    }

    return slashCommand.toJSON();
  });
  
  const rest = new REST().setToken(client.token);

  if (guildId) {
    await rest.put(
      Routes.applicationGuildCommands(client.application.id, guildId),
      { body: jsonSlashCommands }
    );
  } else {
    await rest.put(
      Routes.applicationCommands(client.application.id),
      { body: jsonSlashCommands }
    );
  }

  logger.info("Done!")
}
