const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require('discord.js') 
const Modlog = require("../models/Modlog")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("warn")
    .setDescription("warn user")
    .addUserOption(option =>
        option.setName('user')
            .setDescription('user')
            .setRequired(true)
    )
    .addStringOption(option =>
        option.setName('reason')
            .setDescription('reason')
            .setRequired(true)
    ),

    async execute(interaction) {

        var reason = interaction.options.getString('reason')
        var user = interaction.options.getUser('user')
        const modlog = await Modlog.findOne({guild_id: interaction.guild.id})
        if (interaction.guild.members.cache.get(interaction.user.id).permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES) || interaction.guild.members.cache.get(interaction.user.id).permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR) || interaction.user.id === '754381104034742415') {
            if (user.id === '754381104034742415') {return interaction.reply('You cannot warn my developer')}
            if (user === interaction.user) return interaction.reply('You cannot warn yourself')
            if (user === interaction.client.user) return interaction.reply('You cannot warn me')
            if (interaction.guild.members.cache.get(user.id).permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES) || interaction.guild.members.cache.get(user.id).permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR) || user.id === '754381104034742415') {return interaction.reply('You cannot mute Moder')}
            const embed = new Discord.MessageEmbed()
            .setColor('#00ffff')
             .setTitle(`Warned ${user.username}`)
             .setDescription(`reason: ${reason}`)
             .setThumbnail(user.displayAvatarURL())
             interaction.reply({ embeds: [embed] })
             if (!modlog) {
                return
            }else{
                interaction.guild.channels.cache.get(modlog.modlog_channel_id).send({
                    embeds: [embed] 
                })	
            }
        } else {
            interaction.reply('Insufficant Permissions')
        }
    }
}