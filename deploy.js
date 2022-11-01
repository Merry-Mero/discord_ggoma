const fs = require("node:fs");
const path = require("node:path");

const { REST } = require("@discordjs/rest");
const { Routes } = require("discord.js");
const { clientId, guildId, token } = require("./config.js");

const commands = [];
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  for (let i = 0; i < command.data.length; i++) {
    commands.push(command.data[i].toJSON());
  }
}

const rest = new REST({ version: "10" }).setToken(token);

rest
  .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);