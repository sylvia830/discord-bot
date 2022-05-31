const Album = require("../../models/Album");
const Discord = require("discord.js");
module.exports = {
  name: "review",
  description: "add your reviews of the album",
  async run(client, message, args) {
      const id = parseInt(args.shift());
    //try {
      const textWithTaggedUser = args.join(" ");
      // Replace tagged users with ""
      const rg = /<@\![0-9]{1,}>/;
      const review = textWithTaggedUser.replace(rg, "");
      const requestedUserId = message.author.id;
      const serverId = message.guild.id;


      const album = await Album.findByPk(id);
        if (album.serverId === message.guild.id) {
            await Album.update(
            {review,
            hasReview: true,
            assignTo: requestedUserId,},
            {
                where: {
                id,
                },
            }
            );
        }

  

      const embed = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle("Review Added")
        .setDescription(`Review written by <@${requestedUserId}> for album ${album.id} was added`);
      return message.channel.send(embed);
    //} //catch (error) {
      //console.error(error.toString());
     // return message.channel.send("Couldn't create reviews. Did you add any albums to the system?");
    //}
  },
};
