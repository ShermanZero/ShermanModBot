const Discord = require("discord.js");

exports.props = {
  "description": "replies to the member with the commands for the server",
  "usage": ""
};

exports.run = (client, message, args) => {
  const embed = new Discord.RichEmbed();
  embed.setTitle(`${message.guild.name} Commands`);
  embed.setDescription("All the commands **you** have access to in this server");
  embed.setColor(0x00AE86);

  client.commands.forEach((value, key) => {
    if(!value.props)
      return;

    let elevatedPermissions = (value.props.requiresElevation && message.member.roles.has(client.config.roles[value.props.requiresElevation]));
    let noPermissions = (!value.props.requiresElevation || value.props.requiresElevation === "");

    if(elevatedPermissions || noPermissions) {
      var header = "**!" + key + "**";
      if(value.props.usage)
        header += `\t*[!${key} ${value.props.usage}]*`

      if(elevatedPermissions)
        header += `  ***(${value.props.requiresElevation})***`;

      embed.addField(header, value.props.description);
    }
  });

  message.channel.send(embed).catch((err) => {console.log(err)});
}
