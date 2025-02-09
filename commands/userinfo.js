const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require('discord.js')
const moment = require('moment')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("sends user's info")
    .addUserOption(option =>
        option.setName('user')
            .setDescription('user id')
            .setRequired(true)
    ),

    async execute(interaction) {

        var user = interaction.options.getUser('user')
        const embed = new Discord.MessageEmbed()
       .setColor('#00ffff')
        .setTitle(`User info`)
        .setAuthor(user.username + '#' + user.discriminator, user.displayAvatarURL())
        .setColor("00FFFF")
        .setThumbnail(user.displayAvatarURL())
        .addField(`${user.tag}`, `${user}`, true)
        .addField("ID:", `${user.id}`, true)
        .addField("Nickname:", `${user.nickname !== null ? `${user.nickname}` : 'None'}`, true)
        //.addField("Status:", `${user.presence.status}`, true)
        .addField("In Server", interaction.guild.name, true)
        //.addField("Permissons:", interaction.guild.members.cache.get(user).permissions)
       // .addField("Game:", `${user.presence.game ? user.presence.game.name : 'None'}`, true)
        .addField("Bot:", `${user.bot}`, true)
        .addField("Joined The Server On:", `${moment.utc(user.joinedAt).format("dddd, MMMM Do YYYY")}`, true)
        .addField("Account Created On:", `${moment.utc(user.createdAt).format("dddd, MMMM Do YYYY")}`, true) 
        .addField("Roles:", `${user.roles}`, true)
        .setFooter(`Replying to ${user.username}#${user.discriminator}`)

        interaction.reply({ embeds: [embed] })
    }
}