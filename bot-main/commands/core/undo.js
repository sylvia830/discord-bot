const Album = require("../../models/Album");
const Discord = require("discord.js");
module.exports = {
  name: "undo",
  description: "Simple undo command",
  async run(client, message, args) {
    const id = parseInt(args.shift());

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
        { isDone: false },
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
      .setTitle("Undo")
      .setDescription(
        `The album with id ${id} has been added back to your unplayed list`
      );
    return message.channel.send(embed);
  },
};
