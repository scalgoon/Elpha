const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require('discord.js') 
const Modlog = require("../models/Modlog")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("unmute")
    .setDescription("unmute user")
    .addUserOption(option =>
        option.setName('user')
            .setDescription('user')
            .setRequired(true)
    ),

    async execute(interaction) {

        var user = interaction.options.getUser('user')
        const muteRole = interaction.guild.roles.cache.find(val => val.name === 'Mute')
        const modlog = await Modlog.findOne({guild_id: interaction.guild.id})
        
        if (interaction.guild.members.cache.get(interaction.user.id).permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES) || interaction.guild.members.cache.get(interaction.user.id).permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR) || interaction.user.id === '754381104034742415') {
        interaction.guild.members.fetch(user.id).then(member => {
            member.roles.remove(muteRole).catch(err => console.error(err))
        })
            const embed = new Discord.MessageEmbed()
            .setColor('#00ffff')
             .setTitle(`Unmuted ${user.username}`)
             .setThumbnail(user.displayAvatarURL())
             interaction.reply({ embeds: [embed] })
             if (!modlog) {
                return
            }
            else{
                 interaction.guild.channels.cache.get(modlog.modlog_channel_id).send({
                     embeds: [embed] 
                 })	
             }
        } else {
            interaction.reply('Insufficant Permissions')
        }
    }
}