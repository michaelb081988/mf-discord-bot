const Discord = require('discord.js');
const client = new Discord.Client();

process.env.TZ = 'Australia/Perth'

let messaged = false;

client.on('ready', () => {
    console.log('I am ready!');
});
 
client.on('message', message => {
    let date = new Date();
    if (message.content === '!hello') {
        message.reply(" I am still alive! " + date.getHours());
    }
});


function doStuff() {
    let date = new Date();
    if(date.getHours() === 11) {
        if(date.getMinutes() == 10) {
            if(!messaged) {
                client.channels.get('773111106931523624').send('@everyone COLO TIME!!!');
                messaged = true;
            }
        }
        if(date.getMinutes() == 11) {
            messaged = false
        }
    }
}
let myTimer = setInterval(doStuff, 1000); //time is in ms

 
// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
