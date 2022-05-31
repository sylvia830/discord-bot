const Album = require("../../models/Album");
const Discord = require("discord.js");
module.exports = {
  name: "add",
  description: "add album to the list",
  async run(client, message, args) {
    //try {
      const textWithTaggedUser = args.join(" ");
      // Replace tagged users with ""
      const rg = /<@\![0-9]{1,}>/;
      const text = textWithTaggedUser.replace(rg, "");

      // Get Tagged User (first) to assign
      const requestedUserId = message.author.id;
      //let taggedUserId = "";
      //if (taggedUser) {
        //taggedUserId = taggedUser.id;
      //}

      const serverId = message.guild.id;

      const newAlbum = await Album.create({
        text,
        serverId,
        assignTo: requestedUserId,
      });

      const embed = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle("Added")
        .setDescription(`Album ${newAlbum.text} was added`);
      return message.channel.send(embed);
    } //catch (error) {
      //console.error(error.toString());
      //return message.channel.send("Couldn't create task");
    //}
 // },
};
