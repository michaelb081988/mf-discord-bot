const Discord = require('discord.js');
const client = new Discord.Client();

const squad = () => new Discord.MessageEmbed()
      .setAuthor('TOTO', "https://i.imgur.com/ezC66kZ.png")
      .setColor('#AAA')
      .setTitle('First')
      .setDescription('First');

client.on('ready', () => {
    console.log('I am ready!');
});
 
client.on('message', message => {
    if (message.content === '!squad') {
       message.channel.send(first);
    }
});
 
// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
