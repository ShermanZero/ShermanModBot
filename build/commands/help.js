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
const path = require("path");
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
    let guildDir = Resources_1.default.getGuildDirectoryFromGuild(message.guild);
    let guildConfig = require(path.resolve(guildDir, client.global_config.files.guild_config));
    client.commands.forEach((value, key) => {
        if (!value.props || !message.member)
            return;
        let elevatedPermissions = value.props.requiresElevation && message.member.roles.has(guildConfig.roles[value.props.requiresElevation]);
        let noPermissions = !value.props.requiresElevation || value.props.requiresElevation === "";
        if (elevatedPermissions || noPermissions) {
            var header = "**!" + key + "**";
            if (value.props.usage)
                header += `\t*!${key} ${value.props.usage}*`;
            if (elevatedPermissions)
                header += `  \`\`\`${value.props.requiresElevation}\`\`\``;
            embed.addField(header, value.props.description);
        }
    });
    message.channel.send(embed).catch(err => {
        console.log(err);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9oZWxwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsMkNBQW1EO0FBQ25ELDZCQUE2QjtBQUU3QixvREFBNkM7QUFFN0MsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUc7SUFDckIsV0FBVyxFQUFFLHdEQUF3RDtDQUN0RSxDQUFDO0FBRUYsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBTyxNQUFXLEVBQUUsT0FBZ0IsRUFBRSxFQUFFO0lBQzNELE1BQU0sS0FBSyxHQUFHLElBQUkseUJBQVksRUFBRSxDQUFDO0lBRWpDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSztRQUFFLE9BQU87SUFFM0IsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxXQUFXLENBQUMsQ0FBQztJQUNqRCxLQUFLLENBQUMsY0FBYyxDQUFDLHdEQUF3RCxDQUFDLENBQUM7SUFDL0UsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUV6QixJQUFJLFFBQVEsR0FBRyxtQkFBUyxDQUFDLDBCQUEwQixDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuRSxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztJQUUzRixNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQVUsRUFBRSxHQUFXLEVBQUUsRUFBRTtRQUNsRCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNO1lBQUUsT0FBTztRQUU1QyxJQUFJLG1CQUFtQixHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsaUJBQWlCLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7UUFDdEksSUFBSSxhQUFhLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLGlCQUFpQixJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEtBQUssRUFBRSxDQUFDO1FBRTNGLElBQUksbUJBQW1CLElBQUksYUFBYSxFQUFFO1lBQ3hDLElBQUksTUFBTSxHQUFHLEtBQUssR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDO1lBQ2hDLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLO2dCQUFFLE1BQU0sSUFBSSxPQUFPLEdBQUcsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDO1lBRXBFLElBQUksbUJBQW1CO2dCQUFFLE1BQU0sSUFBSSxXQUFXLEtBQUssQ0FBQyxLQUFLLENBQUMsaUJBQWlCLFFBQVEsQ0FBQztZQUVwRixLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ2pEO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWVzc2FnZSwgTWVzc2FnZUVtYmVkIH0gZnJvbSAnZGlzY29yZC5qcyc7XHJcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XHJcblxyXG5pbXBvcnQgUmVzb3VyY2VzIGZyb20gJy4uL2NsYXNzZXMvUmVzb3VyY2VzJztcclxuXHJcbm1vZHVsZS5leHBvcnRzLnByb3BzID0ge1xyXG4gIGRlc2NyaXB0aW9uOiBcInJlcGxpZXMgdG8gdGhlIG1lbWJlciB3aXRoIHRoZSBjb21tYW5kcyBmb3IgdGhlIHNlcnZlclwiXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5ydW4gPSBhc3luYyAoY2xpZW50OiBhbnksIG1lc3NhZ2U6IE1lc3NhZ2UpID0+IHtcclxuICBjb25zdCBlbWJlZCA9IG5ldyBNZXNzYWdlRW1iZWQoKTtcclxuXHJcbiAgaWYgKCFtZXNzYWdlLmd1aWxkKSByZXR1cm47XHJcblxyXG4gIGVtYmVkLnNldFRpdGxlKGAke21lc3NhZ2UuZ3VpbGQubmFtZX0gQ29tbWFuZHNgKTtcclxuICBlbWJlZC5zZXREZXNjcmlwdGlvbihcIkFsbCB0aGUgY29tbWFuZHMgKip5b3UqKiBoYXZlIGFjY2VzcyB0byBpbiB0aGlzIHNlcnZlclwiKTtcclxuICBlbWJlZC5zZXRDb2xvcigweDAwYWU4Nik7XHJcblxyXG4gIGxldCBndWlsZERpciA9IFJlc291cmNlcy5nZXRHdWlsZERpcmVjdG9yeUZyb21HdWlsZChtZXNzYWdlLmd1aWxkKTtcclxuICBsZXQgZ3VpbGRDb25maWcgPSByZXF1aXJlKHBhdGgucmVzb2x2ZShndWlsZERpciwgY2xpZW50Lmdsb2JhbF9jb25maWcuZmlsZXMuZ3VpbGRfY29uZmlnKSk7XHJcblxyXG4gIGNsaWVudC5jb21tYW5kcy5mb3JFYWNoKCh2YWx1ZTogYW55LCBrZXk6IHN0cmluZykgPT4ge1xyXG4gICAgaWYgKCF2YWx1ZS5wcm9wcyB8fCAhbWVzc2FnZS5tZW1iZXIpIHJldHVybjtcclxuXHJcbiAgICBsZXQgZWxldmF0ZWRQZXJtaXNzaW9ucyA9IHZhbHVlLnByb3BzLnJlcXVpcmVzRWxldmF0aW9uICYmIG1lc3NhZ2UubWVtYmVyLnJvbGVzLmhhcyhndWlsZENvbmZpZy5yb2xlc1t2YWx1ZS5wcm9wcy5yZXF1aXJlc0VsZXZhdGlvbl0pO1xyXG4gICAgbGV0IG5vUGVybWlzc2lvbnMgPSAhdmFsdWUucHJvcHMucmVxdWlyZXNFbGV2YXRpb24gfHwgdmFsdWUucHJvcHMucmVxdWlyZXNFbGV2YXRpb24gPT09IFwiXCI7XHJcblxyXG4gICAgaWYgKGVsZXZhdGVkUGVybWlzc2lvbnMgfHwgbm9QZXJtaXNzaW9ucykge1xyXG4gICAgICB2YXIgaGVhZGVyID0gXCIqKiFcIiArIGtleSArIFwiKipcIjtcclxuICAgICAgaWYgKHZhbHVlLnByb3BzLnVzYWdlKSBoZWFkZXIgKz0gYFxcdCohJHtrZXl9ICR7dmFsdWUucHJvcHMudXNhZ2V9KmA7XHJcblxyXG4gICAgICBpZiAoZWxldmF0ZWRQZXJtaXNzaW9ucykgaGVhZGVyICs9IGAgIFxcYFxcYFxcYCR7dmFsdWUucHJvcHMucmVxdWlyZXNFbGV2YXRpb259XFxgXFxgXFxgYDtcclxuXHJcbiAgICAgIGVtYmVkLmFkZEZpZWxkKGhlYWRlciwgdmFsdWUucHJvcHMuZGVzY3JpcHRpb24pO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICBtZXNzYWdlLmNoYW5uZWwuc2VuZChlbWJlZCkuY2F0Y2goZXJyID0+IHtcclxuICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgfSk7XHJcbn07XHJcbiJdfQ==