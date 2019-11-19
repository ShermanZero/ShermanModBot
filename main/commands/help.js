const Discord = require("discord.js");

exports.props = {
  "requiresElevation": false,
  "description": "replies to the member with the commands for the server",
  "usage": ""
};

exports.run = (client, message, args) => {
  const modRole = message.member.roles.has(client.config.modID);

  var helpMessage = "here are the commands for the server:\n";

  const embed = new Discord.RichEmbed();
  embed.setTitle(`${message.guild.name} Commands`);
  embed.setDescription("All the commands **you** have access to in this server");
  embed.setColor(0x00AE86);

  client.commands.forEach((value, key) => {
    if(!value.props)
      return;

    if((value.props.requiresElevation && modRole) || !value.props.requiresElevation) {
      var header = "**!" + key + "**";
      if(value.props.usage)
        header += `\t*[!${key} ${value.props.usage}]*`

      embed.addField(header, value.props.description);
    }
  });

  message.reply({embed});
}
