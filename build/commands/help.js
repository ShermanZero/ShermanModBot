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
class help {
    constructor() {
        this.props = {
            description: "replies to the member with the commands for the server"
        };
    }
    run(client, message) {
        return __awaiter(this, void 0, void 0, function* () {
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
    }
}
exports.default = help;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9oZWxwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsMkNBQW1EO0FBRW5ELE1BQXFCLElBQUk7SUFBekI7UUFDRSxVQUFLLEdBQUc7WUFDTixXQUFXLEVBQUUsd0RBQXdEO1NBQ3RFLENBQUM7SUF1Q0osQ0FBQztJQXJDTyxHQUFHLENBQUMsTUFBVyxFQUFFLE9BQWdCOztZQUNyQyxNQUFNLEtBQUssR0FBRyxJQUFJLHlCQUFZLEVBQUUsQ0FBQztZQUVqQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUs7Z0JBQUUsT0FBTztZQUUzQixLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLFdBQVcsQ0FBQyxDQUFDO1lBQ2pELEtBQUssQ0FBQyxjQUFjLENBQ2xCLHdEQUF3RCxDQUN6RCxDQUFDO1lBQ0YsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUV6QixNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQVUsRUFBRSxHQUFXLEVBQUUsRUFBRTtnQkFDbEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTTtvQkFBRSxPQUFPO2dCQUU1QyxJQUFJLG1CQUFtQixHQUNyQixLQUFLLENBQUMsS0FBSyxDQUFDLGlCQUFpQjtvQkFDN0IsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUN0QixNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQ25ELENBQUM7Z0JBQ0osSUFBSSxhQUFhLEdBQ2YsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLGlCQUFpQixJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEtBQUssRUFBRSxDQUFDO2dCQUV6RSxJQUFJLG1CQUFtQixJQUFJLGFBQWEsRUFBRTtvQkFDeEMsSUFBSSxNQUFNLEdBQUcsS0FBSyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUM7b0JBQ2hDLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLO3dCQUFFLE1BQU0sSUFBSSxRQUFRLEdBQUcsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxDQUFDO29CQUV0RSxJQUFJLG1CQUFtQjt3QkFDckIsTUFBTSxJQUFJLFNBQVMsS0FBSyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsTUFBTSxDQUFDO29CQUV6RCxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2lCQUNqRDtZQUNILENBQUMsQ0FBQyxDQUFDO1lBRUgsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25CLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztLQUFBO0NBQ0Y7QUExQ0QsdUJBMENDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWVzc2FnZSwgTWVzc2FnZUVtYmVkIH0gZnJvbSAnZGlzY29yZC5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBoZWxwIHtcclxuICBwcm9wcyA9IHtcclxuICAgIGRlc2NyaXB0aW9uOiBcInJlcGxpZXMgdG8gdGhlIG1lbWJlciB3aXRoIHRoZSBjb21tYW5kcyBmb3IgdGhlIHNlcnZlclwiXHJcbiAgfTtcclxuXHJcbiAgYXN5bmMgcnVuKGNsaWVudDogYW55LCBtZXNzYWdlOiBNZXNzYWdlKSB7XHJcbiAgICBjb25zdCBlbWJlZCA9IG5ldyBNZXNzYWdlRW1iZWQoKTtcclxuXHJcbiAgICBpZiAoIW1lc3NhZ2UuZ3VpbGQpIHJldHVybjtcclxuXHJcbiAgICBlbWJlZC5zZXRUaXRsZShgJHttZXNzYWdlLmd1aWxkLm5hbWV9IENvbW1hbmRzYCk7XHJcbiAgICBlbWJlZC5zZXREZXNjcmlwdGlvbihcclxuICAgICAgXCJBbGwgdGhlIGNvbW1hbmRzICoqeW91KiogaGF2ZSBhY2Nlc3MgdG8gaW4gdGhpcyBzZXJ2ZXJcIlxyXG4gICAgKTtcclxuICAgIGVtYmVkLnNldENvbG9yKDB4MDBhZTg2KTtcclxuXHJcbiAgICBjbGllbnQuY29tbWFuZHMuZm9yRWFjaCgodmFsdWU6IGFueSwga2V5OiBzdHJpbmcpID0+IHtcclxuICAgICAgaWYgKCF2YWx1ZS5wcm9wcyB8fCAhbWVzc2FnZS5tZW1iZXIpIHJldHVybjtcclxuXHJcbiAgICAgIGxldCBlbGV2YXRlZFBlcm1pc3Npb25zID1cclxuICAgICAgICB2YWx1ZS5wcm9wcy5yZXF1aXJlc0VsZXZhdGlvbiAmJlxyXG4gICAgICAgIG1lc3NhZ2UubWVtYmVyLnJvbGVzLmhhcyhcclxuICAgICAgICAgIGNsaWVudC5jb25maWcucm9sZXNbdmFsdWUucHJvcHMucmVxdWlyZXNFbGV2YXRpb25dXHJcbiAgICAgICAgKTtcclxuICAgICAgbGV0IG5vUGVybWlzc2lvbnMgPVxyXG4gICAgICAgICF2YWx1ZS5wcm9wcy5yZXF1aXJlc0VsZXZhdGlvbiB8fCB2YWx1ZS5wcm9wcy5yZXF1aXJlc0VsZXZhdGlvbiA9PT0gXCJcIjtcclxuXHJcbiAgICAgIGlmIChlbGV2YXRlZFBlcm1pc3Npb25zIHx8IG5vUGVybWlzc2lvbnMpIHtcclxuICAgICAgICB2YXIgaGVhZGVyID0gXCIqKiFcIiArIGtleSArIFwiKipcIjtcclxuICAgICAgICBpZiAodmFsdWUucHJvcHMudXNhZ2UpIGhlYWRlciArPSBgXFx0KlshJHtrZXl9ICR7dmFsdWUucHJvcHMudXNhZ2V9XSpgO1xyXG5cclxuICAgICAgICBpZiAoZWxldmF0ZWRQZXJtaXNzaW9ucylcclxuICAgICAgICAgIGhlYWRlciArPSBgICAqKiooJHt2YWx1ZS5wcm9wcy5yZXF1aXJlc0VsZXZhdGlvbn0pKioqYDtcclxuXHJcbiAgICAgICAgZW1iZWQuYWRkRmllbGQoaGVhZGVyLCB2YWx1ZS5wcm9wcy5kZXNjcmlwdGlvbik7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIG1lc3NhZ2UuY2hhbm5lbC5zZW5kKGVtYmVkKS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==