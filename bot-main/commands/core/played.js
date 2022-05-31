const Album = require("../../models/Album");
const Discord = require("discord.js"); 
module.exports = {
  name: "played",
  description: "moves the album to another list that records the albums played so far",
  async run(client, message, args) {
    const id = parseInt(args.shift());

    if (!id) {
      const errorEmbed = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle("Error")
        .setDescription(
          "You need to enter the id of the album to mark it as played\n" +
            "Enter `y!help` for help"
        );
      return message.channel.send(errorEmbed);
    }

    const album = await Album.findByPk(id);
    if (album.serverId === message.guild.id) {
      await Album.update(
        { isDone: true },
        {
          where: {
            id,
          },
        }
      );
    } else {
      const errorEmbed = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle("Error")
        .setDescription("You can only mark one album as played from the current server");
      return message.channel.send(errorEmbed);
    }

    const embed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Played")
      .setDescription(`The album with id ${id} has been marked as played`);
    message.channel.send(embed);
    return message.react("🎵");
  },
};
