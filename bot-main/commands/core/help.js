const Discord = require("discord.js");
module.exports = {
  name: "help",
  description: "Displays the help menu.",
  run(_client, message, args) {
    const embed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Help")
      .setDescription(
        `
		    1. \`y!add <album name>\` - Add a new album
		    2. \`y!list\` - List all albums yet to be played
		    3. \`y!played <id in list>\` - Mark an album as played
		    4. \`y!played-list\` - List all albums played so far
        5. \`y!review <id in list> <your review>\` - Write your own review for the albums we listened to
        6. \`y!view-reviews\` - List all the reviews written by the users
        7. \`y!delete <id in the list>\` - Delete a review
		  `
      );

    return message.channel.send(embed);
  },
};
