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
    yield getRole(client.global_config.elevation_names.mod, message).then(result => {
        if (!result)
            return message.channel.send("You will need to rerun the setup before commands become available");
    });
    yield getChannel(client.global_config.channel_names.default, "default/welcome", "welcome new members of the guild as they arrive", message);
    yield getChannel(client.global_config.channel_names.mod_logs, "mod logs", "log any moderation action taken by mods and me", message);
    guild_config_1.default.setup = true;
    fs.writeFileSync(configFile, JSON.stringify(guild_config_1.default, null, "\t"));
});
function getChannel(nameOfChannel, alias, purpose, message) {
    return __awaiter(this, void 0, void 0, function* () {
        let channel;
        yield askQuestion(message.channel, `Do you have a ${alias} channel?  This will be used to ${purpose}.  If you do, and want to enable this feature, simply mention the name of the channel (using #), otherwise, press enter`).then(response => {
            console.log("response", response);
            let channelByID = message.guild.channels.find(channel => channel.id === response);
            if (channelByID)
                channel = channelByID;
        });
        if (channel) {
            guild_config_1.default.channels[nameOfChannel] = channel.id;
            yield message.channel.send(`${channel} has been set as the ${alias} channel!`);
        }
        return true;
    });
}
function getRole(nameOfRole, message) {
    return __awaiter(this, void 0, void 0, function* () {
        let role;
        yield askQuestion(message.channel, `What is the ${nameOfRole} role ID?  You can mention a member with this role, the role itself, input the role's name, or input the ID directly if you know it`).then(response => {
            var _a;
            console.log("response", response);
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
        });
        if (role) {
            guild_config_1.default.roles[nameOfRole] = role.id;
            yield message.channel.send(`${role} has been set as the ${nameOfRole} role!`);
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
            var _a;
            value = (_a = collected.first()) === null || _a === void 0 ? void 0 : _a.content;
            value = value.replace(/[<>@&#]/g, "");
        })
            .catch(collected => {
            channel.send("No answer was given in time, aborting setup.  Run !config to rereun setup");
        });
        return value;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLHlCQUF5QjtBQUN6Qiw2QkFBNkI7QUFFN0Isb0RBQTZDO0FBQzdDLDREQUFxRDtBQUVyRCxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRztJQUNyQixXQUFXLEVBQUUsd0NBQXdDO0NBQ3RELENBQUM7QUFFRixNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFPLE1BQVcsRUFBRSxPQUFnQixFQUFFLEVBQUU7SUFDM0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQztRQUFFLE9BQU87SUFFM0QsSUFBSSxRQUFnQixDQUFDO0lBRXJCLElBQUksT0FBTyxDQUFDLEtBQUs7UUFBRSxRQUFRLEdBQUcsbUJBQVMsQ0FBQywwQkFBMEIsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7O1FBQzdFLFFBQVEsR0FBRyxJQUFXLENBQUM7SUFFNUIsSUFBSSxDQUFDLFFBQVE7UUFBRSxPQUFPLE1BQU0sT0FBTyxDQUFDLEtBQUssQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO0lBRXBGLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ2pGLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQztRQUFFLE1BQU0sT0FBTyxDQUFDLEtBQUssQ0FBQyxrRkFBa0YsQ0FBQyxDQUFDO0lBRXhJLE1BQU0sT0FBTyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDL0UsSUFBRyxDQUFDLE1BQU07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QztRQUM1RixDQUFDLENBQUMsQ0FBQztRQUVMLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWVzc2FnZSwgUm9sZSwgVGV4dENoYW5uZWwgfSBmcm9tICdkaXNjb3JkLmpzJztcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5cbmltcG9ydCBSZXNvdXJjZXMgZnJvbSAnLi4vY2xhc3Nlcy9SZXNvdXJjZXMnO1xuaW1wb3J0IGd1aWxkX2NvbmZpZyBmcm9tICcuLi9yZXNvdXJjZXMvZ3VpbGRfY29uZmlnJztcblxubW9kdWxlLmV4cG9ydHMucHJvcHMgPSB7XG4gIGRlc2NyaXB0aW9uOiBcInNldHMgdXAgdGhlIGRpc2NvcmQgYm90IGZvciB0aGUgc2VydmVyXCJcbn07XG5cbm1vZHVsZS5leHBvcnRzLnJ1biA9IGFzeW5jIChjbGllbnQ6IGFueSwgbWVzc2FnZTogTWVzc2FnZSkgPT4ge1xuICBpZiAoIW1lc3NhZ2UubWVtYmVyLmhhc1Blcm1pc3Npb24oXCJBRE1JTklTVFJBVE9SXCIpKSByZXR1cm47XG4gIFxuICBsZXQgZ3VpbGREaXI6IHN0cmluZztcblxuICBpZiAobWVzc2FnZS5ndWlsZCkgZ3VpbGREaXIgPSBSZXNvdXJjZXMuZ2V0R3VpbGREaXJlY3RvcnlGcm9tR3VpbGQobWVzc2FnZS5ndWlsZCk7XG4gIGVsc2UgZ3VpbGREaXIgPSBudWxsIGFzIGFueTtcblxuICBpZiAoIWd1aWxkRGlyKSByZXR1cm4gYXdhaXQgbWVzc2FnZS5yZXBseShcInlvdSBhcmUgbm90IG1lc3NhZ2luZyBtZSBmcm9tIGEgZ3VpbGQhXCIpO1xuXG4gIGxldCBjb25maWdGaWxlID0gcGF0aC5yZXNvbHZlKGd1aWxkRGlyLCBjbGllbnQuZ2xvYmFsX2NvbmZpZy5maWxlcy5ndWlsZF9jb25maWcpO1xuICBpZiAoIWZzLmV4aXN0c1N5bmMoY29uZmlnRmlsZSkpIGF3YWl0IG1lc3NhZ2UucmVwbHkoXCJ5b3UgZG9uJ3QgYXBwZWFyIHRvIGhhdmUgYSBjb25maWd1cmF0aW9uIHNldCB1cCBmb3IgeW91ciBndWlsZCwgbGV0J3MgY3JlYXRlIG9uZVwiKTtcblxuICBhd2FpdCBnZXRSb2xlKGNsaWVudC5nbG9iYWxfY29uZmlnLmVsZXZhdGlvbl9uYW1lcy5vd25lciwgbWVzc2FnZSkudGhlbihyZXN1bHQgPT4ge1xuICAgIGlmKCFyZXN1bHQpIHJldHVybiBtZXNzYWdlLmNoYW5uZWwuc2VuZChcIllvdSB3aWxsIG5lZWQgdG8gcmVydW4gdGhlIHNldHVwIGJlZm9yZSBjb21tYW5kcyBiZWNvbWUgYXZhaWxhYmxlXCIpO1xuICB9KTtcbiAgYXdhaXQgZ2V0Um9sZShjbGllbnQuZ2xvYmFsX2NvbmZpZy5lbGV2YXRpb25fbmFtZXMubW9kLCBtZXNzYWdlKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgaWYgKCFyZXN1bHQpIHJldHVybiBtZXNzYWdlLmNoYW5uZWwuc2VuZChcIllvdSB3aWxsIG5lZWQgdG8gcmVydW4gdGhlIHNldHVwIGJlZm9yZSBjb21tYW5kcyBiZWNvbWUgYXZhaWxhYmxlXCIpO1xuICB9KTtcblxuICBhd2FpdCBnZXRDaGFubmVsKGNsaWVudC5nbG9iYWxfY29uZmlnLmNoYW5uZWxfbmFtZXMuZGVmYXVsdCwgXCJkZWZhdWx0L3dlbGNvbWVcIiwgXCJ3ZWxjb21lIG5ldyBtZW1iZXJzIG9mIHRoZSBndWlsZCBhcyB0aGV5IGFycml2ZVwiLCBtZXNzYWdlKTtcbiAgYXdhaXQgZ2V0Q2hhbm5lbChjbGllbnQuZ2xvYmFsX2NvbmZpZy5jaGFubmVsX25hbWVzLm1vZF9sb2dzLCBcIm1vZCBsb2dzXCIsIFwibG9nIGFueSBtb2RlcmF0aW9uIGFjdGlvbiB0YWtlbiBieSBtb2RzIGFuZCBtZVwiLCBtZXNzYWdlKTtcblxuICBndWlsZF9jb25maWcuc2V0dXAgPSB0cnVlO1xuXG4gIC8vY3JlYXRlIHRoZSBjb25maWcgZmlsZVxuICBmcy53cml0ZUZpbGVTeW5jKGNvbmZpZ0ZpbGUsIEpTT04uc3RyaW5naWZ5KGd1aWxkX2NvbmZpZywgbnVsbCwgXCJcXHRcIikpO1xufTtcblxuYXN5bmMgZnVuY3Rpb24gZ2V0Q2hhbm5lbChuYW1lT2ZDaGFubmVsOiBzdHJpbmcsIGFsaWFzOiBzdHJpbmcsIHB1cnBvc2U6IHN0cmluZywgbWVzc2FnZTogTWVzc2FnZSkge1xuICBsZXQgY2hhbm5lbDogVGV4dENoYW5uZWw7XG5cbiAgYXdhaXQgYXNrUXVlc3Rpb24obWVzc2FnZS5jaGFubmVsIGFzIFRleHRDaGFubmVsLCBgRG8geW91IGhhdmUgYSAke2FsaWFzfSBjaGFubmVsPyAgVGhpcyB3aWxsIGJlIHVzZWQgdG8gJHtwdXJwb3NlfS4gIElmIHlvdSBkbywgYW5kIHdhbnQgdG8gZW5hYmxlIHRoaXMgZmVhdHVyZSwgc2ltcGx5IG1lbnRpb24gdGhlIG5hbWUgb2YgdGhlIGNoYW5uZWwgKHVzaW5nICMpLCBvdGhlcndpc2UsIHByZXNzIGVudGVyYCkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJyZXNwb25zZVwiLCByZXNwb25zZSk7XG5cbiAgICBsZXQgY2hhbm5lbEJ5SUQgPSBtZXNzYWdlLmd1aWxkLmNoYW5uZWxzLmZpbmQoY2hhbm5lbCA9PiBjaGFubmVsLmlkID09PSByZXNwb25zZSk7XG5cbiAgICBpZihjaGFubmVsQnlJRCkgY2hhbm5lbCA9IGNoYW5uZWxCeUlEIGFzIFRleHRDaGFubmVsO1xuICB9KTtcblxuICBpZihjaGFubmVsKSB7XG4gICAgZ3VpbGRfY29uZmlnLmNoYW5uZWxzW25hbWVPZkNoYW5uZWxdID0gY2hhbm5lbC5pZDtcbiAgICBhd2FpdCBtZXNzYWdlLmNoYW5uZWwuc2VuZChgJHtjaGFubmVsfSBoYXMgYmVlbiBzZXQgYXMgdGhlICR7YWxpYXN9IGNoYW5uZWwhYCk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0Um9sZShuYW1lT2ZSb2xlOiBzdHJpbmcsIG1lc3NhZ2U6IE1lc3NhZ2UpIHtcbiAgbGV0IHJvbGU6IFJvbGU7XG5cbiAgYXdhaXQgYXNrUXVlc3Rpb24obWVzc2FnZS5jaGFubmVsIGFzIFRleHRDaGFubmVsLCBgV2hhdCBpcyB0aGUgJHtuYW1lT2ZSb2xlfSByb2xlIElEPyAgWW91IGNhbiBtZW50aW9uIGEgbWVtYmVyIHdpdGggdGhpcyByb2xlLCB0aGUgcm9sZSBpdHNlbGYsIGlucHV0IHRoZSByb2xlJ3MgbmFtZSwgb3IgaW5wdXQgdGhlIElEIGRpcmVjdGx5IGlmIHlvdSBrbm93IGl0YCkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJyZXNwb25zZVwiLCByZXNwb25zZSk7XG5cbiAgICBsZXQgcm9sZUJ5TmFtZSA9IG1lc3NhZ2UuZ3VpbGQucm9sZXMuZmluZChyb2xlID0+IHJvbGUubmFtZSA9PT0gcmVzcG9uc2UpO1xuICAgIGxldCByb2xlQnlJRCA9IG1lc3NhZ2UuZ3VpbGQucm9sZXMuZmluZChyb2xlID0+IHJvbGUuaWQgPT09IHJlc3BvbnNlKTtcbiAgICBsZXQgcm9sZUJ5VXNlciA9IG1lc3NhZ2UuZ3VpbGQubWVtYmVycy5nZXQocmVzcG9uc2UpPy5yb2xlcy5oaWdoZXN0O1xuXG4gICAgaWYgKHJvbGVCeU5hbWUpIHJvbGUgPSByb2xlQnlOYW1lO1xuICAgIGVsc2UgaWYgKHJvbGVCeUlEKSByb2xlID0gcm9sZUJ5SUQ7XG4gICAgZWxzZSBpZiAocm9sZUJ5VXNlcikgcm9sZSA9IHJvbGVCeVVzZXI7XG4gICAgZWxzZSBtZXNzYWdlLnJlcGx5KGBJIGNvdWxkIG5vdCBmaW5kIHRoZSAke25hbWVPZlJvbGV9IHJvbGUgYmFzZWQgb24geW91ciBpbnB1dGApO1xuICB9KTtcblxuICBpZiAocm9sZSkge1xuICAgIGd1aWxkX2NvbmZpZy5yb2xlc1tuYW1lT2ZSb2xlXSA9IHJvbGUuaWQ7XG4gICAgYXdhaXQgbWVzc2FnZS5jaGFubmVsLnNlbmQoYCR7cm9sZX0gaGFzIGJlZW4gc2V0IGFzIHRoZSAke25hbWVPZlJvbGV9IHJvbGUhYCk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gYXNrUXVlc3Rpb24oY2hhbm5lbDogVGV4dENoYW5uZWwsIHF1ZXN0aW9uOiBzdHJpbmcsIGZpbHRlciA9ICgpID0+IHRydWUsIG9wdGlvbnMgPSB7IG1heDogMSwgdGltZTogMzAwMDAsIGVycm9yczogW1widGltZVwiXSB9KSB7XG4gIGxldCB2YWx1ZTogYW55O1xuXG4gIGF3YWl0IGNoYW5uZWwuc2VuZChxdWVzdGlvbik7XG4gIGF3YWl0IGNoYW5uZWxcbiAgICAuYXdhaXRNZXNzYWdlcyhmaWx0ZXIsIG9wdGlvbnMpXG4gICAgLnRoZW4oY29sbGVjdGVkID0+IHtcbiAgICAgIHZhbHVlID0gY29sbGVjdGVkLmZpcnN0KCk/LmNvbnRlbnQ7XG4gICAgICB2YWx1ZSA9ICh2YWx1ZSBhcyBzdHJpbmcpLnJlcGxhY2UoL1s8PkAmI10vZywgXCJcIik7XG4gICAgfSlcbiAgICAuY2F0Y2goY29sbGVjdGVkID0+IHtcbiAgICAgIGNoYW5uZWwuc2VuZChcIk5vIGFuc3dlciB3YXMgZ2l2ZW4gaW4gdGltZSwgYWJvcnRpbmcgc2V0dXAuICBSdW4gIWNvbmZpZyB0byByZXJldW4gc2V0dXBcIik7XG4gICAgfSk7XG5cbiAgcmV0dXJuIHZhbHVlO1xufVxuIl19