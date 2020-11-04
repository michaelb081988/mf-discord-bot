const Discord = require('discord.js');
const client = new Discord.Client();


client.on('ready', () => {
    console.log('I am ready!');
});
 
client.on('message', message => {
    if (message.content === '!squad') {
        message.reply('Test reactions hype!');
        
        message.react('👍').then(r => {
                            message.react('👎');
                    });
        
        message.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == '👍' || reaction.emoji.name == '👎'),
                            { max: 1, time: 30000 }).then(collected => {
                                    if (collected.first().emoji.name == '👍') {
                                            message.reply('Thumb up');
                                    }
                                    else
                                            message.reply('Thumb down');
                            }).catch(() => {
                                    message.reply('No reaction after 30 seconds, operation canceled');
                            });
    }
});
 
// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
