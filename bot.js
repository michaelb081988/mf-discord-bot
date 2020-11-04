const Discord = require('discord.js');
const client = new Discord.Client();


client.on('ready', () => {
    console.log('I am ready!');
});
 
client.on('message', message => {
    let color = 7081235; // hex: #6C0D13
    
    if (message.content === '!squad') {
        let embed = new Discord.RichEmbed({
        title: '**Hello World**',
        description: 'Markdown _for the win_!'
    });

    embed.setColor(color);
    embed.setTimestamp(message.createdAt);
    embed.setAuthor(message.author.tag, message.author.displayAvatarURL);
    }
});
 
// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
