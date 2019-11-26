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
module.exports.run = (client, message) => __awaiter(void 0, void 0, void 0, function* () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9oZWxwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsMkNBQW1EO0FBRW5ELE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHO0lBQ3JCLFdBQVcsRUFBRSx3REFBd0Q7Q0FDdEUsQ0FBQztBQUVGLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLENBQU8sTUFBVyxFQUFFLE9BQWdCLEVBQUUsRUFBRTtJQUMzRCxNQUFNLEtBQUssR0FBRyxJQUFJLHlCQUFZLEVBQUUsQ0FBQztJQUVqQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUs7UUFBRSxPQUFPO0lBRTNCLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksV0FBVyxDQUFDLENBQUM7SUFDakQsS0FBSyxDQUFDLGNBQWMsQ0FDbEIsd0RBQXdELENBQ3pELENBQUM7SUFDRixLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRXpCLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBVSxFQUFFLEdBQVcsRUFBRSxFQUFFO1FBQ2xELElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU07WUFBRSxPQUFPO1FBRTVDLElBQUksbUJBQW1CLEdBQ3JCLEtBQUssQ0FBQyxLQUFLLENBQUMsaUJBQWlCO1lBQzdCLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FDdEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUNuRCxDQUFDO1FBQ0osSUFBSSxhQUFhLEdBQ2YsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLGlCQUFpQixJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEtBQUssRUFBRSxDQUFDO1FBRXpFLElBQUksbUJBQW1CLElBQUksYUFBYSxFQUFFO1lBQ3hDLElBQUksTUFBTSxHQUFHLEtBQUssR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDO1lBQ2hDLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLO2dCQUFFLE1BQU0sSUFBSSxRQUFRLEdBQUcsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxDQUFDO1lBRXRFLElBQUksbUJBQW1CO2dCQUNyQixNQUFNLElBQUksU0FBUyxLQUFLLENBQUMsS0FBSyxDQUFDLGlCQUFpQixNQUFNLENBQUM7WUFFekQsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNqRDtJQUNILENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkIsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1lc3NhZ2UsIE1lc3NhZ2VFbWJlZCB9IGZyb20gJ2Rpc2NvcmQuanMnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMucHJvcHMgPSB7XHJcbiAgZGVzY3JpcHRpb246IFwicmVwbGllcyB0byB0aGUgbWVtYmVyIHdpdGggdGhlIGNvbW1hbmRzIGZvciB0aGUgc2VydmVyXCJcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzLnJ1biA9IGFzeW5jIChjbGllbnQ6IGFueSwgbWVzc2FnZTogTWVzc2FnZSkgPT4ge1xyXG4gIGNvbnN0IGVtYmVkID0gbmV3IE1lc3NhZ2VFbWJlZCgpO1xyXG5cclxuICBpZiAoIW1lc3NhZ2UuZ3VpbGQpIHJldHVybjtcclxuXHJcbiAgZW1iZWQuc2V0VGl0bGUoYCR7bWVzc2FnZS5ndWlsZC5uYW1lfSBDb21tYW5kc2ApO1xyXG4gIGVtYmVkLnNldERlc2NyaXB0aW9uKFxyXG4gICAgXCJBbGwgdGhlIGNvbW1hbmRzICoqeW91KiogaGF2ZSBhY2Nlc3MgdG8gaW4gdGhpcyBzZXJ2ZXJcIlxyXG4gICk7XHJcbiAgZW1iZWQuc2V0Q29sb3IoMHgwMGFlODYpO1xyXG5cclxuICBjbGllbnQuY29tbWFuZHMuZm9yRWFjaCgodmFsdWU6IGFueSwga2V5OiBzdHJpbmcpID0+IHtcclxuICAgIGlmICghdmFsdWUucHJvcHMgfHwgIW1lc3NhZ2UubWVtYmVyKSByZXR1cm47XHJcblxyXG4gICAgbGV0IGVsZXZhdGVkUGVybWlzc2lvbnMgPVxyXG4gICAgICB2YWx1ZS5wcm9wcy5yZXF1aXJlc0VsZXZhdGlvbiAmJlxyXG4gICAgICBtZXNzYWdlLm1lbWJlci5yb2xlcy5oYXMoXHJcbiAgICAgICAgY2xpZW50LmNvbmZpZy5yb2xlc1t2YWx1ZS5wcm9wcy5yZXF1aXJlc0VsZXZhdGlvbl1cclxuICAgICAgKTtcclxuICAgIGxldCBub1Blcm1pc3Npb25zID1cclxuICAgICAgIXZhbHVlLnByb3BzLnJlcXVpcmVzRWxldmF0aW9uIHx8IHZhbHVlLnByb3BzLnJlcXVpcmVzRWxldmF0aW9uID09PSBcIlwiO1xyXG5cclxuICAgIGlmIChlbGV2YXRlZFBlcm1pc3Npb25zIHx8IG5vUGVybWlzc2lvbnMpIHtcclxuICAgICAgdmFyIGhlYWRlciA9IFwiKiohXCIgKyBrZXkgKyBcIioqXCI7XHJcbiAgICAgIGlmICh2YWx1ZS5wcm9wcy51c2FnZSkgaGVhZGVyICs9IGBcXHQqWyEke2tleX0gJHt2YWx1ZS5wcm9wcy51c2FnZX1dKmA7XHJcblxyXG4gICAgICBpZiAoZWxldmF0ZWRQZXJtaXNzaW9ucylcclxuICAgICAgICBoZWFkZXIgKz0gYCAgKioqKCR7dmFsdWUucHJvcHMucmVxdWlyZXNFbGV2YXRpb259KSoqKmA7XHJcblxyXG4gICAgICBlbWJlZC5hZGRGaWVsZChoZWFkZXIsIHZhbHVlLnByb3BzLmRlc2NyaXB0aW9uKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgbWVzc2FnZS5jaGFubmVsLnNlbmQoZW1iZWQpLmNhdGNoKGVyciA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gIH0pO1xyXG59O1xyXG4iXX0=