const Album = require("../../models/Album");
const Discord = require("discord.js");
module.exports = {
  name: "played-list",
  description: "shows the albums played so far",
  async run(client, message, args) {
    const albums = await Album.findAll({
      where: {
        archive: false,
        isDone: true,
        serverId: message.guild.id,
      },
      attributes: ["id", "text", "assignTo"],
    });
    console.log(albums);
    // return console.log(tasks);
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
      .setTitle("Albums we have listened to")
      .setDescription(
        messageContent
      )
      .setFooter("The most beautiful thoughts are always besides the darkest.");

    return message.channel.send(embed);
  },
};
