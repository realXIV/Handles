try {
    var Discord = require("discord.js");
    var config = require("./config.json");
    var fs = require("fs");
    var mkdirp = require("mkdirp");
    var requireDir = require('require-dir');
} catch (err) {
    var exec = require('child_process').exec;
    exec("npm install")
    console.log(`Failed to load dependency, ${err}`)
    return;
}

if (!fs.existsSync(`./guildconfigs.json`)) {
        fs.writeFileSync(`./guildconfigs.json`, "{}")
    }


var bot = new Discord.Client();
var token = config.bottoken;
bot.ownerid = config.ownerid;
bot.prefix = config.prefix;
bot.hubchannel = config.hubid;
bot.hsapikey = config.hsapikey;
bot.funcs = requireDir("./funcs/");
bot.cardinfo = require("./hsinfo/cardinfo.json")
bot.cardnames = require("./hsinfo/cardnames.json")
bot.guildconfigs = require("./guildconfigs.json")

bot.funcs.loadcmds(bot, Discord, fs);

bot.login(token);

bot.on('ready', () => {
    bot.user.setGame(`@${bot.user.username} help`)
    startdate = new Date()
    console.log("Bot online (" + startdate + ")")
    setTimeout(function() {
        process.exit()
    }, 3600000)
});

bot.on('disconnect', () => {
    console.log("Bot disconnected, trying to restart.")
    process.exit()
});

bot.on('guildCreate', guild => {
    console.log(`ADDED TO ${guild.name} (${guild.id})`)
});

bot.on('guildMemberAdd', guildmember => {
    bot.funcs.announcenewusers(bot, guildmember)
});

bot.on('message', msg => {
    if (msg.channel.type == 'dm' || msg.channel.type == "group") {}
    bot.funcs.onMessage(bot, msg)
    setTimeout(function() {
        bot.funcs.logmessage(bot, msg)
    }, 5000)
});

process.on("unhandledRejection", err => {
    fs.appendFile("error.txt", err.stack + "\n", function(error) {});
    console.log("Unhandled Error: \n" + err.stack);
});