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
module.exports.props = {
    description: "replies to the member with the commands for the server"
};
module.exports = (client, message) => __awaiter(void 0, void 0, void 0, function* () {
    const embed = new discord_js_1.MessageEmbed();
    if (!message.guild)
        return;
    embed.setTitle(`${message.guild.name} Commands`);
    embed.setDescription("All the commands **you** have access to in this server");
    embed.setColor(0x00ae86);
    client.commands.forEach((value, key) => {
        if (!value.props || !message.member)
            return;
        let elevatedPermissions = value.props.requiresElevation &&
            message.member.roles.has(client.config.roles[value.props.requiresElevation]);
        let noPermissions = !value.props.requiresElevation || value.props.requiresElevation === "";
        if (elevatedPermissions || noPermissions) {
            var header = "**!" + key + "**";
            if (value.props.usage)
                header += `\t*[!${key} ${value.props.usage}]*`;
            if (elevatedPermissions)
                header += `  ***(${value.props.requiresElevation})***`;
            embed.addField(header, value.props.description);
        }
    });
    message.channel.send(embed).catch(err => {
        console.log(err);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9oZWxwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsMkNBQW1EO0FBRW5ELE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHO0lBQ3JCLFdBQVcsRUFBRSx3REFBd0Q7Q0FDdEUsQ0FBQztBQUVGLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBTyxNQUFXLEVBQUUsT0FBZ0IsRUFBRSxFQUFFO0lBQ3ZELE1BQU0sS0FBSyxHQUFHLElBQUkseUJBQVksRUFBRSxDQUFDO0lBRWpDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSztRQUFFLE9BQU87SUFFM0IsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxXQUFXLENBQUMsQ0FBQztJQUNqRCxLQUFLLENBQUMsY0FBYyxDQUNsQix3REFBd0QsQ0FDekQsQ0FBQztJQUNGLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7SUFFekIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFVLEVBQUUsR0FBVyxFQUFFLEVBQUU7UUFDbEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTTtZQUFFLE9BQU87UUFFNUMsSUFBSSxtQkFBbUIsR0FDckIsS0FBSyxDQUFDLEtBQUssQ0FBQyxpQkFBaUI7WUFDN0IsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUN0QixNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQ25ELENBQUM7UUFDSixJQUFJLGFBQWEsR0FDZixDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsaUJBQWlCLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsS0FBSyxFQUFFLENBQUM7UUFFekUsSUFBSSxtQkFBbUIsSUFBSSxhQUFhLEVBQUU7WUFDeEMsSUFBSSxNQUFNLEdBQUcsS0FBSyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUM7WUFDaEMsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUs7Z0JBQUUsTUFBTSxJQUFJLFFBQVEsR0FBRyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLENBQUM7WUFFdEUsSUFBSSxtQkFBbUI7Z0JBQ3JCLE1BQU0sSUFBSSxTQUFTLEtBQUssQ0FBQyxLQUFLLENBQUMsaUJBQWlCLE1BQU0sQ0FBQztZQUV6RCxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ2pEO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWVzc2FnZSwgTWVzc2FnZUVtYmVkIH0gZnJvbSAnZGlzY29yZC5qcyc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5wcm9wcyA9IHtcclxuICBkZXNjcmlwdGlvbjogXCJyZXBsaWVzIHRvIHRoZSBtZW1iZXIgd2l0aCB0aGUgY29tbWFuZHMgZm9yIHRoZSBzZXJ2ZXJcIlxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBhc3luYyAoY2xpZW50OiBhbnksIG1lc3NhZ2U6IE1lc3NhZ2UpID0+IHtcclxuICBjb25zdCBlbWJlZCA9IG5ldyBNZXNzYWdlRW1iZWQoKTtcclxuXHJcbiAgaWYgKCFtZXNzYWdlLmd1aWxkKSByZXR1cm47XHJcblxyXG4gIGVtYmVkLnNldFRpdGxlKGAke21lc3NhZ2UuZ3VpbGQubmFtZX0gQ29tbWFuZHNgKTtcclxuICBlbWJlZC5zZXREZXNjcmlwdGlvbihcclxuICAgIFwiQWxsIHRoZSBjb21tYW5kcyAqKnlvdSoqIGhhdmUgYWNjZXNzIHRvIGluIHRoaXMgc2VydmVyXCJcclxuICApO1xyXG4gIGVtYmVkLnNldENvbG9yKDB4MDBhZTg2KTtcclxuXHJcbiAgY2xpZW50LmNvbW1hbmRzLmZvckVhY2goKHZhbHVlOiBhbnksIGtleTogc3RyaW5nKSA9PiB7XHJcbiAgICBpZiAoIXZhbHVlLnByb3BzIHx8ICFtZXNzYWdlLm1lbWJlcikgcmV0dXJuO1xyXG5cclxuICAgIGxldCBlbGV2YXRlZFBlcm1pc3Npb25zID1cclxuICAgICAgdmFsdWUucHJvcHMucmVxdWlyZXNFbGV2YXRpb24gJiZcclxuICAgICAgbWVzc2FnZS5tZW1iZXIucm9sZXMuaGFzKFxyXG4gICAgICAgIGNsaWVudC5jb25maWcucm9sZXNbdmFsdWUucHJvcHMucmVxdWlyZXNFbGV2YXRpb25dXHJcbiAgICAgICk7XHJcbiAgICBsZXQgbm9QZXJtaXNzaW9ucyA9XHJcbiAgICAgICF2YWx1ZS5wcm9wcy5yZXF1aXJlc0VsZXZhdGlvbiB8fCB2YWx1ZS5wcm9wcy5yZXF1aXJlc0VsZXZhdGlvbiA9PT0gXCJcIjtcclxuXHJcbiAgICBpZiAoZWxldmF0ZWRQZXJtaXNzaW9ucyB8fCBub1Blcm1pc3Npb25zKSB7XHJcbiAgICAgIHZhciBoZWFkZXIgPSBcIioqIVwiICsga2V5ICsgXCIqKlwiO1xyXG4gICAgICBpZiAodmFsdWUucHJvcHMudXNhZ2UpIGhlYWRlciArPSBgXFx0KlshJHtrZXl9ICR7dmFsdWUucHJvcHMudXNhZ2V9XSpgO1xyXG5cclxuICAgICAgaWYgKGVsZXZhdGVkUGVybWlzc2lvbnMpXHJcbiAgICAgICAgaGVhZGVyICs9IGAgICoqKigke3ZhbHVlLnByb3BzLnJlcXVpcmVzRWxldmF0aW9ufSkqKipgO1xyXG5cclxuICAgICAgZW1iZWQuYWRkRmllbGQoaGVhZGVyLCB2YWx1ZS5wcm9wcy5kZXNjcmlwdGlvbik7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIG1lc3NhZ2UuY2hhbm5lbC5zZW5kKGVtYmVkKS5jYXRjaChlcnIgPT4ge1xyXG4gICAgY29uc29sZS5sb2coZXJyKTtcclxuICB9KTtcclxufTtcclxuIl19