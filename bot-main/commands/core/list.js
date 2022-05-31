const Album = require("../../models/Album");
const Discord = require("discord.js");
module.exports = {
  name: "list",
  description: "the albums we need to listen",
  async run(client, message, args) {
    const albums = await Album.findAll({
      where: {
        archive: false,
        isDone: false,
        serverId: message.guild.id,
      },
      attributes: ["id", "text", "assignTo"],
    });

    let messageContent = albums
      .map((album, idx) => {
        if (album.assignTo) {
          return `${idx + 1}. ${album.text} - added by <@${album.assignTo}> - ${
            album.id
          }\n`;
        } else {
          return `${idx + 1}. ${album.text} - ${album.id}\n`;
        }
      })
      .join("");

    const embed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("New Album List (Not Played)")
      .setDescription(
        messageContent +
          "\n After playing the album, type `y!played 1`. Replace 1 with the ID(last digit)" +
          "\n To view the list of albums played, type `y!played-list`"
      );

    return message.channel.send(embed);
  },
};
