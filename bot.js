const Discord = require('discord.js');
const client = new Discord.Client();

process.env.TZ = 'Australia/Perth'

client.on('ready', () => {
    console.log('I am ready!');
});
 
client.on('message', message => {
    let color = 7081235; // hex: #6C0D13
    
    if (message.content === '!hello') {
        message.reply(" I am still alive!");
    }
});

function doStuff() {
    //client.channels.get('773111106931523624').send('Hello here!');
}
setInterval(doStuff, 1000); //time is in ms
 
// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
