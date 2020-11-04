const Discord = require('discord.js');
const client = new Discord.Client();


client.on('ready', () => {
    console.log('I am ready!');
});
 
client.on('message', message => {
    let color = 7081235; // hex: #6C0D13
    
    if (message.content === '!squad') {
        message.channel.send({
        embed: {
            color: color, // Yes, variables will work
            title: '**Hello world!**',
            description: 'Markdown _for the win_!',
            author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL
            },
            timestamp: message.createdAt,
        }
    });
    }
});
 
// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
