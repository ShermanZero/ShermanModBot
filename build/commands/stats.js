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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = __importDefault(require("discord.js"));
var Resources_1 = __importDefault(require("../classes/Resources"));
var ranks_json_1 = __importDefault(require("../resources/ranks/ranks.json"));
exports.props = {
    description: "replies to the user with their current server stats",
    usage: ""
};
exports.run = function (client, message, args) { return __awaiter(void 0, void 0, void 0, function () {
    var username, content, member;
    return __generator(this, function (_a) {
        username = Resources_1.default.getUsernameFromMessage(message);
        content = client.getUserContent(message.guild, username);
        member = message.member;
        if (message.mentions.members.size !== 0) {
            member = message.mentions.members.first();
            username = Resources_1.default.getUsernameFromMember(member);
            content = Resources_1.default.getUserContentsFromName(message, username);
        }
        if (!content) {
            message.delete().catch(function (err) {
                console.log(err);
            });
            try {
                return [2 /*return*/, message.reply(message.mentions.members.first().displayName + " does not yet have any stats :( they need to post a message in the server to be registered by me.")];
            }
            catch (err_1) {
                console.log(err_1);
            }
        }
        message.channel.send(exports.getEmbed(client, member, content)).catch(function (err) {
            console.log(err);
        });
        message.delete().catch(function (err) {
            console.log(err);
        });
        return [2 /*return*/];
    });
}); };
exports.getEmbed = function (client, member, content) {
    var name = "**" +
        content.hidden.username
            .substring(0, content.hidden.username.lastIndexOf("_"))
            .toUpperCase() +
        "**";
    var rankColor = member.guild.roles.find(function (role) { return role.name === content.rank.name; }).color;
    var embed = new discord_js_1.default.RichEmbed();
    embed.setTitle(name + " | " + calculatePosition(client, content));
    embed.setColor(rankColor);
    embed.setThumbnail(ranks_json_1.default.urls[content.rank.name]);
    var levelStats = "";
    if (content.rank.name !== null)
        levelStats += ("**rank:**  *" + content.rank.name + "*\n").toUpperCase();
    if (content.rank.level !== null)
        levelStats += ("**level:**  *" + content.rank.level + "*\n").toUpperCase();
    if (content.rank.xp !== null)
        levelStats += ("**xp:**  *" + getFormattedNumber(content.rank.xp) + " / " + getFormattedNumber(content.rank.levelup) + "*\n").toUpperCase();
    if (levelStats !== "")
        embed.addField("**LEVEL STATS**", levelStats);
    var raceStats = "";
    if (content.race.wins !== null)
        raceStats += ("**wins:**  *" + content.race.wins + "*\n").toUpperCase();
    if (raceStats !== "")
        embed.addField("**MARBLE RACE STATS**", raceStats);
    var miscStats = "";
    if (content.misc.joined !== null)
        miscStats += ("**joined:**  *" + content.misc.joined + "*\n").toUpperCase();
    if (content.misc.first_message !== null)
        miscStats += ("**first message:**  *" + content.misc.first_message + "*\n").toUpperCase();
    if (content.misc.warnings !== null)
        miscStats += ("**warnings:**  *" + content.misc.warnings + "*\n").toUpperCase();
    if (miscStats !== "")
        embed.addField("**MISC. STATS**", miscStats);
    if (member.roles.has(client.config.roles.mod)) {
        embed.setFooter("BE RESPECTFUL TO ALL - ESPECIALLY MODERATORS", "https://i.ibb.co/MC5389q/crossed-swords-2694.png");
        embed.setDescription("`SERVER MOD`");
    }
    return embed;
};
function getFormattedNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function calculatePosition(client, content) {
    var guild = client.getGuild(content.hidden.guildname);
    var usersHigher = 0;
    var entries = Object.entries(guild);
    for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
        var _a = entries_1[_i], username = _a[0], userContent = _a[1];
        if (username != content.hidden.username &&
            userContent.rank.xp > content.rank.xp)
            usersHigher++;
    }
    return "*RANK #" + (usersHigher + 1) + "*";
}
//# sourceMappingURL=stats.js.map