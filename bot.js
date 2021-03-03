const Discord = require('discord.js');
const client = new Discord.Client();

process.env.TZ = 'Australia/Perth'

client.on('ready', () => {
    console.log('I am ready!');
});
 
client.on('message', message => {
    if (message.content === '!hello') {
        message.reply(" I am still alive!");
    }
});

let myTimer = setInterval(doStuff, 1000); //time is in ms

function doStuff() {
    let date = new Date();
    if(date.getHours()) == "10") {
        client.channels.get('773111106931523624').send('everyone COLO TIME!!!');
    }
}

 
// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
