const Album = require("../../models/Album");
const Discord = require("discord.js");
module.exports = {
  name: "view-reviews",
  description: "displays all the reviews added by the users",
  async run(client, message, args) {
    const albums = await Album.findAll({
      where: {
        archive: false,
        hasReview: true,
        serverId: message.guild.id,
      },
      attributes: ["id", "review", "assignTo", "text"],
    });
    console.log(albums);
    // return console.log(tasks);
    let messageContent = albums
      .map((album, idx) => {
        //if (album.assignTo) {
          return `${idx + 1}. ${album.text} (album ID: ${album.id}): ${album.review} - written by <@${album.assignTo}>\n`;
        //} //else {
          //return `${idx + 1}. ${album.review} - ${album.id}. ${album.text}\n`;
        //}
      })
      .join("");

    const embed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Reviews")
      .setDescription(
        messageContent +
          "\n To delete a review, type `y!delete 1`. Replace 1 with the ID(last digit)"
      );

    return message.channel.send(embed);
  },
};
