"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Resources_1 = require("../classes/Resources");
module.exports.props = {
    description: "replies to the member with the commands for the server"
};
module.exports.run = (client, message) => __awaiter(void 0, void 0, void 0, function* () {
    const embed = new discord_js_1.MessageEmbed();
    if (!message.guild)
        return;
    embed.setTitle(`${message.guild.name} Commands`);
    embed.setDescription("All the commands **you** have access to in this server");
    embed.setColor(0x00ae86);
    let guildConfig = client.guild_configsp[Resources_1.default.getGuildNameFromGuild(message.guild)];
    client.commands.forEach((value, key) => {
        if (!value.props || !message.member)
            return;
        let elevatedPermissions = value.props.requiresElevation && message.member.roles.has(guildConfig.roles[value.props.requiresElevation]);
        let noPermissions = !value.props.requiresElevation || value.props.requiresElevation === "";
        if (elevatedPermissions || noPermissions) {
            var header = "**!" + key + "**";
            let desc = value.props.description;
            if (value.props.usage)
                header += `\n\t*!${key} ${value.props.usage}*`;
            if (elevatedPermissions)
                desc += `  \`\`\`css\n[${value.props.requiresElevation}]\`\`\``;
            embed.addField(header, desc, true);
        }
    });
    message.channel.send(embed).catch(err => {
        console.log(err);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9oZWxwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsMkNBQW1EO0FBRW5ELG9EQUF3QztBQUV4QyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRztJQUNyQixXQUFXLEVBQUUsd0RBQXdEO0NBQ3RFLENBQUM7QUFFRixNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFPLE1BQVcsRUFBRSxPQUFnQixFQUFFLEVBQUU7SUFDM0QsTUFBTSxLQUFLLEdBQUcsSUFBSSx5QkFBWSxFQUFFLENBQUM7SUFFakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLO1FBQUUsT0FBTztJQUUzQixLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLFdBQVcsQ0FBQyxDQUFDO0lBQ2pELEtBQUssQ0FBQyxjQUFjLENBQUMsd0RBQXdELENBQUMsQ0FBQztJQUMvRSxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRXpCLElBQUksV0FBVyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsbUJBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUVuRixNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQVUsRUFBRSxHQUFXLEVBQUUsRUFBRTtRQUNsRCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNO1lBQUUsT0FBTztRQUU1QyxJQUFJLG1CQUFtQixHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsaUJBQWlCLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7UUFDdEksSUFBSSxhQUFhLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLGlCQUFpQixJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEtBQUssRUFBRSxDQUFDO1FBRTNGLElBQUksbUJBQW1CLElBQUksYUFBYSxFQUFFO1lBQ3hDLElBQUksTUFBTSxHQUFHLEtBQUssR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDO1lBQ2hDLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDO1lBQ25DLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLO2dCQUFFLE1BQU0sSUFBSSxTQUFTLEdBQUcsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDO1lBRXRFLElBQUksbUJBQW1CO2dCQUFFLElBQUksSUFBSSxpQkFBaUIsS0FBSyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsU0FBUyxDQUFDO1lBRXpGLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNwQztJQUNILENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkIsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1lc3NhZ2UsIE1lc3NhZ2VFbWJlZCB9IGZyb20gJ2Rpc2NvcmQuanMnO1xyXG5cclxuaW1wb3J0IHJzcmMgZnJvbSAnLi4vY2xhc3Nlcy9SZXNvdXJjZXMnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMucHJvcHMgPSB7XHJcbiAgZGVzY3JpcHRpb246IFwicmVwbGllcyB0byB0aGUgbWVtYmVyIHdpdGggdGhlIGNvbW1hbmRzIGZvciB0aGUgc2VydmVyXCJcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzLnJ1biA9IGFzeW5jIChjbGllbnQ6IGFueSwgbWVzc2FnZTogTWVzc2FnZSkgPT4ge1xyXG4gIGNvbnN0IGVtYmVkID0gbmV3IE1lc3NhZ2VFbWJlZCgpO1xyXG5cclxuICBpZiAoIW1lc3NhZ2UuZ3VpbGQpIHJldHVybjtcclxuXHJcbiAgZW1iZWQuc2V0VGl0bGUoYCR7bWVzc2FnZS5ndWlsZC5uYW1lfSBDb21tYW5kc2ApO1xyXG4gIGVtYmVkLnNldERlc2NyaXB0aW9uKFwiQWxsIHRoZSBjb21tYW5kcyAqKnlvdSoqIGhhdmUgYWNjZXNzIHRvIGluIHRoaXMgc2VydmVyXCIpO1xyXG4gIGVtYmVkLnNldENvbG9yKDB4MDBhZTg2KTtcclxuXHJcbiAgbGV0IGd1aWxkQ29uZmlnID0gY2xpZW50Lmd1aWxkX2NvbmZpZ3NwW3JzcmMuZ2V0R3VpbGROYW1lRnJvbUd1aWxkKG1lc3NhZ2UuZ3VpbGQpXTtcclxuXHJcbiAgY2xpZW50LmNvbW1hbmRzLmZvckVhY2goKHZhbHVlOiBhbnksIGtleTogc3RyaW5nKSA9PiB7XHJcbiAgICBpZiAoIXZhbHVlLnByb3BzIHx8ICFtZXNzYWdlLm1lbWJlcikgcmV0dXJuO1xyXG5cclxuICAgIGxldCBlbGV2YXRlZFBlcm1pc3Npb25zID0gdmFsdWUucHJvcHMucmVxdWlyZXNFbGV2YXRpb24gJiYgbWVzc2FnZS5tZW1iZXIucm9sZXMuaGFzKGd1aWxkQ29uZmlnLnJvbGVzW3ZhbHVlLnByb3BzLnJlcXVpcmVzRWxldmF0aW9uXSk7XHJcbiAgICBsZXQgbm9QZXJtaXNzaW9ucyA9ICF2YWx1ZS5wcm9wcy5yZXF1aXJlc0VsZXZhdGlvbiB8fCB2YWx1ZS5wcm9wcy5yZXF1aXJlc0VsZXZhdGlvbiA9PT0gXCJcIjtcclxuXHJcbiAgICBpZiAoZWxldmF0ZWRQZXJtaXNzaW9ucyB8fCBub1Blcm1pc3Npb25zKSB7XHJcbiAgICAgIHZhciBoZWFkZXIgPSBcIioqIVwiICsga2V5ICsgXCIqKlwiO1xyXG4gICAgICBsZXQgZGVzYyA9IHZhbHVlLnByb3BzLmRlc2NyaXB0aW9uO1xyXG4gICAgICBpZiAodmFsdWUucHJvcHMudXNhZ2UpIGhlYWRlciArPSBgXFxuXFx0KiEke2tleX0gJHt2YWx1ZS5wcm9wcy51c2FnZX0qYDtcclxuXHJcbiAgICAgIGlmIChlbGV2YXRlZFBlcm1pc3Npb25zKSBkZXNjICs9IGAgIFxcYFxcYFxcYGNzc1xcblske3ZhbHVlLnByb3BzLnJlcXVpcmVzRWxldmF0aW9ufV1cXGBcXGBcXGBgO1xyXG5cclxuICAgICAgZW1iZWQuYWRkRmllbGQoaGVhZGVyLCBkZXNjLCB0cnVlKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgbWVzc2FnZS5jaGFubmVsLnNlbmQoZW1iZWQpLmNhdGNoKGVyciA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gIH0pO1xyXG59O1xyXG4iXX0=