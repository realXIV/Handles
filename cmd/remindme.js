exports.run = (bot, msg, params = []) => {
  msg.delete()
    var minno = params[0]
    var mins = parseInt(minno) * 60 * 1000;
    if (isNaN(mins)) {
        msg.channel.sendMessage(`${params[0]} is not a valid quantity of time.`).then(m => {setTimeout(m.delete.bind(m), 10000)})
        return;
    }
    params.shift();
    var reminder = params.join(" ")
    msg.reply(`Reminder for \`${reminder}\` set for ${minno} minute(s).`).then(m => {setTimeout(m.delete.bind(m), 10000)})
    setTimeout(function() {
        reply(msg, reminder);
    }, mins);
};

function reply(msg, reminder) {
    if (!reminder){
      return msg.reply(`reminding you from ${msg.createdAt}`)
    } else {
      return msg.reply(`reminding you of \`${reminder}\` from ${msg.createdAt}`)
    }

};

exports.help = {
    name: `remindme`,
    description: `Reminds you in x minutes of y`,
    usage: `remindme`
};

exports.conf = {
    enabled: true,
    aliases: ['remind'],
    permLevel: 1
};
