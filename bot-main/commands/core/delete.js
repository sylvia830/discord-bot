const Album = require("../../models/Album");
const Discord = require("discord.js");
module.exports = {
  name: "delete",
  description: "Simple delete command",
  async run(client, message, args) {
    const id = parseInt(args.shift());
    const requestedUserId = message.author.id;

    if (!id) {
      const errorEmbed = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle("Error")
        .setDescription(
          "You need to enter the id of the album to undo the changes\n" +
            "Enter `y!help` for help"
        );
      return message.channel.send(errorEmbed);
    }
    const album = await Album.findByPk(id);
    if (album.serverId === message.guild.id) {
      await Album.update(
        { hasReview: false },
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
        .setDescription("You can only add one album back from the current server");
      return message.channel.send(errorEmbed);
    }
    const embed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Deleted")
      .setDescription(
        `The review for ${album.text} (album ID: ${id}) written by <@${album.assignTo}> has been deleted!`
      );
    return message.channel.send(embed);
  },
};
