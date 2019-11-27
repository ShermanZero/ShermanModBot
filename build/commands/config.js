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
const fs = require("fs");
const path = require("path");
const Resources_1 = require("../classes/Resources");
const guild_config_1 = require("../resources/guild_config");
module.exports.props = {
    description: "sets up the discord bot for the server"
};
module.exports.run = (client, message) => __awaiter(void 0, void 0, void 0, function* () {
    if (!message.member.hasPermission("ADMINISTRATOR"))
        return;
    let guildDir;
    if (message.guild)
        guildDir = Resources_1.default.getGuildDirectoryFromGuild(message.guild);
    else
        guildDir = null;
    if (!guildDir)
        return yield message.reply("you are not messaging me from a guild!");
    let configFile = path.resolve(guildDir, client.global_config.files.guild_config);
    if (!fs.existsSync(configFile))
        yield message.reply("you don't appear to have a configuration set up for your guild, let's create one");
    yield getRole(client.global_config.elevation_names.owner, message).then(result => {
        if (!result)
            return message.channel.send("You will need to rerun the setup before commands become available");
    });
    yield getRole(client.global_config.elevation_names.moderator, message).then(result => {
        if (!result)
            return message.channel.send("You will need to rerun the setup before commands become available");
    });
    yield getChannel(client.global_config.channel_names.default, "default/welcome", "welcome new members of the guild as they arrive", message);
    yield getChannel(client.global_config.channel_names.mod_logs, "mod logs", "log any moderation action taken by mods and me", message);
    guild_config_1.default.setup = true;
    client.guild_configs[Resources_1.default.getGuildNameFromGuild(message.guild)] = guild_config_1.default;
    fs.writeFile(configFile, JSON.stringify(guild_config_1.default, null, "\t"), (error) => {
        if (error) {
            message.reply("there was a problem creating your config file, you will need to rerun the setup");
        }
        else {
            message.reply("your configuration has been stored!  You can rerun this setup at any time");
        }
    });
});
function getChannel(nameOfChannel, alias, purpose, message) {
    return __awaiter(this, void 0, void 0, function* () {
        let channel;
        yield askQuestion(message.channel, `Do you have a ${alias} channel?  This will be used to ${purpose}.  If you do, and want to enable this feature, simply mention the name of the channel (using #), otherwise, press enter`)
            .then(response => {
            let channelByID = message.guild.channels.find(channel => channel.id === response);
            if (channelByID)
                channel = channelByID;
        })
            .catch(() => {
            message.reply("Your config has been partially generated, but you can rerun at any time");
            return false;
        });
        if (channel) {
            guild_config_1.default.channels[nameOfChannel] = channel.id;
            yield message.channel.send(`\`\`\`${channel} has been set as the ${alias} channel!\`\`\``);
        }
        return true;
    });
}
function getRole(nameOfRole, message) {
    return __awaiter(this, void 0, void 0, function* () {
        let role;
        yield askQuestion(message.channel, `What is the ${nameOfRole} role ID?  You can mention a member with this role, the role itself, input the role's name, or input the ID directly if you know it`)
            .then(response => {
            var _a;
            let roleByName = message.guild.roles.find(role => role.name === response);
            let roleByID = message.guild.roles.find(role => role.id === response);
            let roleByUser = (_a = message.guild.members.get(response)) === null || _a === void 0 ? void 0 : _a.roles.highest;
            if (roleByName)
                role = roleByName;
            else if (roleByID)
                role = roleByID;
            else if (roleByUser)
                role = roleByUser;
            else
                message.reply(`I could not find the ${nameOfRole} role based on your input`);
        })
            .catch(() => {
            message.reply("You will need to rerun the setup, your config file was not generated");
            return false;
        });
        if (role) {
            guild_config_1.default.roles[nameOfRole] = role.id;
            yield message.channel.send(`\`\`\`${role} has been set as the ${nameOfRole} role!\`\`\``);
        }
        return true;
    });
}
function askQuestion(channel, question, filter = () => true, options = { max: 1, time: 30000, errors: ["time"] }) {
    return __awaiter(this, void 0, void 0, function* () {
        let value;
        yield channel.send(question);
        yield channel
            .awaitMessages(filter, options)
            .then(collected => {
            var _a, _b;
            value = (_a = collected.first()) === null || _a === void 0 ? void 0 : _a.content;
            value = value.replace(/[<>@&#]/g, "");
            (_b = collected.first()) === null || _b === void 0 ? void 0 : _b.delete();
        })
            .catch(collected => {
            channel.send("No answer was given in time");
        });
        return value;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLHlCQUF5QjtBQUN6Qiw2QkFBNkI7QUFFN0Isb0RBQXdDO0FBQ3hDLDREQUFxRDtBQUVyRCxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRztJQUNyQixXQUFXLEVBQUUsd0NBQXdDO0NBQ3RELENBQUM7QUFFRixNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFPLE1BQVcsRUFBRSxPQUFnQixFQUFFLEVBQUU7SUFDM0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQztRQUFFLE9BQU87SUFFM0QsSUFBSSxRQUFnQixDQUFDO0lBRXJCLElBQUksT0FBTyxDQUFDLEtBQUs7UUFBRSxRQUFRLEdBQUcsbUJBQUksQ0FBQywwQkFBMEIsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7O1FBQ3hFLFFBQVEsR0FBRyxJQUFXLENBQUM7SUFFNUIsSUFBSSxDQUFDLFFBQVE7UUFBRSxPQUFPLE1BQU0sT0FBTyxDQUFDLEtBQUssQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO0lBRXBGLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ2pGLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQztRQUFFLE1BQU0sT0FBTyxDQUFDLEtBQUssQ0FBQyxrRkFBa0YsQ0FBQyxDQUFDO0lBRXhJLE1BQU0sT0FBTyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDL0UsSUFBSSxDQUFDLE1BQU07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QUU7O1FBQ3pJLElBQUksS0FBVSxDQUFDO1FBRWYsTUFBTSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzdCLE1BQU0sT0FBTzthQUNWLGFBQWEsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDO2FBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRTs7WUFDaEIsS0FBSyxTQUFHLFNBQVMsQ0FBQyxLQUFLLEVBQUUsMENBQUUsT0FBTyxDQUFDO1lBQ25DLEtBQUssR0FBSSxLQUFnQixDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFbEQsTUFBQSxTQUFTLENBQUMsS0FBSyxFQUFFLDBDQUFFLE1BQU0sR0FBRztRQUM5QixDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDakIsT0FBTyxDQUFDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1FBQzlDLENBQUMsQ0FBQyxDQUFDO1FBRUwsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0NBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNZXNzYWdlLCBSb2xlLCBUZXh0Q2hhbm5lbCB9IGZyb20gJ2Rpc2NvcmQuanMnO1xuaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcblxuaW1wb3J0IHJzcmMgZnJvbSAnLi4vY2xhc3Nlcy9SZXNvdXJjZXMnO1xuaW1wb3J0IGd1aWxkX2NvbmZpZyBmcm9tICcuLi9yZXNvdXJjZXMvZ3VpbGRfY29uZmlnJztcblxubW9kdWxlLmV4cG9ydHMucHJvcHMgPSB7XG4gIGRlc2NyaXB0aW9uOiBcInNldHMgdXAgdGhlIGRpc2NvcmQgYm90IGZvciB0aGUgc2VydmVyXCJcbn07XG5cbm1vZHVsZS5leHBvcnRzLnJ1biA9IGFzeW5jIChjbGllbnQ6IGFueSwgbWVzc2FnZTogTWVzc2FnZSkgPT4ge1xuICBpZiAoIW1lc3NhZ2UubWVtYmVyLmhhc1Blcm1pc3Npb24oXCJBRE1JTklTVFJBVE9SXCIpKSByZXR1cm47XG5cbiAgbGV0IGd1aWxkRGlyOiBzdHJpbmc7XG5cbiAgaWYgKG1lc3NhZ2UuZ3VpbGQpIGd1aWxkRGlyID0gcnNyYy5nZXRHdWlsZERpcmVjdG9yeUZyb21HdWlsZChtZXNzYWdlLmd1aWxkKTtcbiAgZWxzZSBndWlsZERpciA9IG51bGwgYXMgYW55O1xuXG4gIGlmICghZ3VpbGREaXIpIHJldHVybiBhd2FpdCBtZXNzYWdlLnJlcGx5KFwieW91IGFyZSBub3QgbWVzc2FnaW5nIG1lIGZyb20gYSBndWlsZCFcIik7XG5cbiAgbGV0IGNvbmZpZ0ZpbGUgPSBwYXRoLnJlc29sdmUoZ3VpbGREaXIsIGNsaWVudC5nbG9iYWxfY29uZmlnLmZpbGVzLmd1aWxkX2NvbmZpZyk7XG4gIGlmICghZnMuZXhpc3RzU3luYyhjb25maWdGaWxlKSkgYXdhaXQgbWVzc2FnZS5yZXBseShcInlvdSBkb24ndCBhcHBlYXIgdG8gaGF2ZSBhIGNvbmZpZ3VyYXRpb24gc2V0IHVwIGZvciB5b3VyIGd1aWxkLCBsZXQncyBjcmVhdGUgb25lXCIpO1xuXG4gIGF3YWl0IGdldFJvbGUoY2xpZW50Lmdsb2JhbF9jb25maWcuZWxldmF0aW9uX25hbWVzLm93bmVyLCBtZXNzYWdlKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgaWYgKCFyZXN1bHQpIHJldHVybiBtZXNzYWdlLmNoYW5uZWwuc2VuZChcIllvdSB3aWxsIG5lZWQgdG8gcmVydW4gdGhlIHNldHVwIGJlZm9yZSBjb21tYW5kcyBiZWNvbWUgYXZhaWxhYmxlXCIpO1xuICB9KTtcbiAgYXdhaXQgZ2V0Um9sZShjbGllbnQuZ2xvYmFsX2NvbmZpZy5lbGV2YXRpb25fbmFtZXMubW9kZXJhdG9yLCBtZXNzYWdlKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgaWYgKCFyZXN1bHQpIHJldHVybiBtZXNzYWdlLmNoYW5uZWwuc2VuZChcIllvdSB3aWxsIG5lZWQgdG8gcmVydW4gdGhlIHNldHVwIGJlZm9yZSBjb21tYW5kcyBiZWNvbWUgYXZhaWxhYmxlXCIpO1xuICB9KTtcblxuICBhd2FpdCBnZXRDaGFubmVsKGNsaWVudC5nbG9iYWxfY29uZmlnLmNoYW5uZWxfbmFtZXMuZGVmYXVsdCwgXCJkZWZhdWx0L3dlbGNvbWVcIiwgXCJ3ZWxjb21lIG5ldyBtZW1iZXJzIG9mIHRoZSBndWlsZCBhcyB0aGV5IGFycml2ZVwiLCBtZXNzYWdlKTtcbiAgYXdhaXQgZ2V0Q2hhbm5lbChjbGllbnQuZ2xvYmFsX2NvbmZpZy5jaGFubmVsX25hbWVzLm1vZF9sb2dzLCBcIm1vZCBsb2dzXCIsIFwibG9nIGFueSBtb2RlcmF0aW9uIGFjdGlvbiB0YWtlbiBieSBtb2RzIGFuZCBtZVwiLCBtZXNzYWdlKTtcblxuICBndWlsZF9jb25maWcuc2V0dXAgPSB0cnVlO1xuXG4gIGNsaWVudC5ndWlsZF9jb25maWdzW3JzcmMuZ2V0R3VpbGROYW1lRnJvbUd1aWxkKG1lc3NhZ2UuZ3VpbGQpXSA9IGd1aWxkX2NvbmZpZztcblxuICAvL2NyZWF0ZSB0aGUgY29uZmlnIGZpbGVcbiAgZnMud3JpdGVGaWxlKGNvbmZpZ0ZpbGUsIEpTT04uc3RyaW5naWZ5KGd1aWxkX2NvbmZpZywgbnVsbCwgXCJcXHRcIiksIChlcnJvcikgPT4ge1xuICAgIGlmKGVycm9yKSB7XG4gICAgICBtZXNzYWdlLnJlcGx5KFwidGhlcmUgd2FzIGEgcHJvYmxlbSBjcmVhdGluZyB5b3VyIGNvbmZpZyBmaWxlLCB5b3Ugd2lsbCBuZWVkIHRvIHJlcnVuIHRoZSBzZXR1cFwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWVzc2FnZS5yZXBseShcInlvdXIgY29uZmlndXJhdGlvbiBoYXMgYmVlbiBzdG9yZWQhICBZb3UgY2FuIHJlcnVuIHRoaXMgc2V0dXAgYXQgYW55IHRpbWVcIik7XG4gICAgfVxuICB9KTtcbn07XG5cbmFzeW5jIGZ1bmN0aW9uIGdldENoYW5uZWwobmFtZU9mQ2hhbm5lbDogc3RyaW5nLCBhbGlhczogc3RyaW5nLCBwdXJwb3NlOiBzdHJpbmcsIG1lc3NhZ2U6IE1lc3NhZ2UpIHtcbiAgbGV0IGNoYW5uZWw6IFRleHRDaGFubmVsO1xuXG4gIGF3YWl0IGFza1F1ZXN0aW9uKFxuICAgIG1lc3NhZ2UuY2hhbm5lbCBhcyBUZXh0Q2hhbm5lbCxcbiAgICBgRG8geW91IGhhdmUgYSAke2FsaWFzfSBjaGFubmVsPyAgVGhpcyB3aWxsIGJlIHVzZWQgdG8gJHtwdXJwb3NlfS4gIElmIHlvdSBkbywgYW5kIHdhbnQgdG8gZW5hYmxlIHRoaXMgZmVhdHVyZSwgc2ltcGx5IG1lbnRpb24gdGhlIG5hbWUgb2YgdGhlIGNoYW5uZWwgKHVzaW5nICMpLCBvdGhlcndpc2UsIHByZXNzIGVudGVyYFxuICApXG4gICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgbGV0IGNoYW5uZWxCeUlEID0gbWVzc2FnZS5ndWlsZC5jaGFubmVscy5maW5kKGNoYW5uZWwgPT4gY2hhbm5lbC5pZCA9PT0gcmVzcG9uc2UpO1xuXG4gICAgICBpZiAoY2hhbm5lbEJ5SUQpIGNoYW5uZWwgPSBjaGFubmVsQnlJRCBhcyBUZXh0Q2hhbm5lbDtcbiAgICB9KVxuICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICBtZXNzYWdlLnJlcGx5KFwiWW91ciBjb25maWcgaGFzIGJlZW4gcGFydGlhbGx5IGdlbmVyYXRlZCwgYnV0IHlvdSBjYW4gcmVydW4gYXQgYW55IHRpbWVcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG5cbiAgaWYgKGNoYW5uZWwpIHtcbiAgICBndWlsZF9jb25maWcuY2hhbm5lbHNbbmFtZU9mQ2hhbm5lbF0gPSBjaGFubmVsLmlkO1xuICAgIGF3YWl0IG1lc3NhZ2UuY2hhbm5lbC5zZW5kKGBcXGBcXGBcXGAke2NoYW5uZWx9IGhhcyBiZWVuIHNldCBhcyB0aGUgJHthbGlhc30gY2hhbm5lbCFcXGBcXGBcXGBgKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRSb2xlKG5hbWVPZlJvbGU6IHN0cmluZywgbWVzc2FnZTogTWVzc2FnZSkge1xuICBsZXQgcm9sZTogUm9sZTtcblxuICBhd2FpdCBhc2tRdWVzdGlvbihcbiAgICBtZXNzYWdlLmNoYW5uZWwgYXMgVGV4dENoYW5uZWwsXG4gICAgYFdoYXQgaXMgdGhlICR7bmFtZU9mUm9sZX0gcm9sZSBJRD8gIFlvdSBjYW4gbWVudGlvbiBhIG1lbWJlciB3aXRoIHRoaXMgcm9sZSwgdGhlIHJvbGUgaXRzZWxmLCBpbnB1dCB0aGUgcm9sZSdzIG5hbWUsIG9yIGlucHV0IHRoZSBJRCBkaXJlY3RseSBpZiB5b3Uga25vdyBpdGBcbiAgKVxuICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgIGxldCByb2xlQnlOYW1lID0gbWVzc2FnZS5ndWlsZC5yb2xlcy5maW5kKHJvbGUgPT4gcm9sZS5uYW1lID09PSByZXNwb25zZSk7XG4gICAgICBsZXQgcm9sZUJ5SUQgPSBtZXNzYWdlLmd1aWxkLnJvbGVzLmZpbmQocm9sZSA9PiByb2xlLmlkID09PSByZXNwb25zZSk7XG4gICAgICBsZXQgcm9sZUJ5VXNlciA9IG1lc3NhZ2UuZ3VpbGQubWVtYmVycy5nZXQocmVzcG9uc2UpPy5yb2xlcy5oaWdoZXN0O1xuXG4gICAgICBpZiAocm9sZUJ5TmFtZSkgcm9sZSA9IHJvbGVCeU5hbWU7XG4gICAgICBlbHNlIGlmIChyb2xlQnlJRCkgcm9sZSA9IHJvbGVCeUlEO1xuICAgICAgZWxzZSBpZiAocm9sZUJ5VXNlcikgcm9sZSA9IHJvbGVCeVVzZXI7XG4gICAgICBlbHNlIG1lc3NhZ2UucmVwbHkoYEkgY291bGQgbm90IGZpbmQgdGhlICR7bmFtZU9mUm9sZX0gcm9sZSBiYXNlZCBvbiB5b3VyIGlucHV0YCk7XG4gICAgfSlcbiAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgbWVzc2FnZS5yZXBseShcIllvdSB3aWxsIG5lZWQgdG8gcmVydW4gdGhlIHNldHVwLCB5b3VyIGNvbmZpZyBmaWxlIHdhcyBub3QgZ2VuZXJhdGVkXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuXG4gIGlmIChyb2xlKSB7XG4gICAgZ3VpbGRfY29uZmlnLnJvbGVzW25hbWVPZlJvbGVdID0gcm9sZS5pZDtcbiAgICBhd2FpdCBtZXNzYWdlLmNoYW5uZWwuc2VuZChgXFxgXFxgXFxgJHtyb2xlfSBoYXMgYmVlbiBzZXQgYXMgdGhlICR7bmFtZU9mUm9sZX0gcm9sZSFcXGBcXGBcXGBgKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5hc3luYyBmdW5jdGlvbiBhc2tRdWVzdGlvbihjaGFubmVsOiBUZXh0Q2hhbm5lbCwgcXVlc3Rpb246IHN0cmluZywgZmlsdGVyID0gKCkgPT4gdHJ1ZSwgb3B0aW9ucyA9IHsgbWF4OiAxLCB0aW1lOiAzMDAwMCwgZXJyb3JzOiBbXCJ0aW1lXCJdIH0pIHtcbiAgbGV0IHZhbHVlOiBhbnk7XG5cbiAgYXdhaXQgY2hhbm5lbC5zZW5kKHF1ZXN0aW9uKTtcbiAgYXdhaXQgY2hhbm5lbFxuICAgIC5hd2FpdE1lc3NhZ2VzKGZpbHRlciwgb3B0aW9ucylcbiAgICAudGhlbihjb2xsZWN0ZWQgPT4ge1xuICAgICAgdmFsdWUgPSBjb2xsZWN0ZWQuZmlyc3QoKT8uY29udGVudDtcbiAgICAgIHZhbHVlID0gKHZhbHVlIGFzIHN0cmluZykucmVwbGFjZSgvWzw+QCYjXS9nLCBcIlwiKTtcbiAgICAgIFxuICAgICAgY29sbGVjdGVkLmZpcnN0KCk/LmRlbGV0ZSgpO1xuICAgIH0pXG4gICAgLmNhdGNoKGNvbGxlY3RlZCA9PiB7XG4gICAgICBjaGFubmVsLnNlbmQoXCJObyBhbnN3ZXIgd2FzIGdpdmVuIGluIHRpbWVcIik7XG4gICAgfSk7XG5cbiAgcmV0dXJuIHZhbHVlO1xufVxuIl19