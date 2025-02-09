const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require("discord.js");
const Modlog = require("../models/Modlog");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("setmodlogchannel")
		.setDescription("Set the modlog message channel")
		.addChannelOption(option => option
			.setName("modlog")
			.setDescription("The channel to set as the modlog channel")
			.setRequired(true)
		),
	async execute(interaction) {
		
		if (!interaction.member.permissions.has([ Permissions.FLAGS.MANAGE_CHANNELS , Permissions.FLAGS.MANAGE_MESSAGES , Permissions.FLAGS.MANAGE_ROLES , Permissions.FLAGS.ADMINISTRATOR ])) {
			interaction.reply("You do not have permission to use this command!");
			return;
		} 

		Modlog.findOne({ guild_id: interaction.guild.id }, (err, settings) => {
			if (err) {
				console.log(err);
				interaction.reply("An error occurred while trying to set the modlog channel!");
				return;
			}

			if (!settings) {
				settings = new Modlog({
					guild_id: interaction.guild.id,
					modlog_channel_id: interaction.options.getChannel("modlog").id
				});
			} else {
				settings.modlog_channel_id = interaction.options.getChannel("modlog").id;
			}

			settings.save(err => {
				if (err) {
					console.log(err);
					interaction.reply("An error occurred while trying to set the modlog channel!");
					return;
				}

				interaction.reply(`Modlog channel has been set to ${interaction.options.getChannel("modlog")}`);
			})
		})

	}
}