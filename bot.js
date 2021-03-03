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
        message.reply(" I am still alive! - Current Time (for Mani): " + date.getHours() + ":" + date.getMinutes());
    }
    if (message.content === '!colo') {
        client.channels.get('762832294259195946').send('Colo time test to make sure it goes to the right channel, but only Mani can send this message so don\'t even try.<:emoji_1:790804706175746068>');
    }
});


function doStuff() {
    let date = new Date();
    if(date.getHours() === 9) {
        if(date.getMinutes() == 57) {
            if(!messaged) {
                client.channels.get('762832294259195946').send('@everyone COLO TIME!!!');
                messaged = true;
            }
        }
        if(date.getMinutes() == 58) {
            messaged = false
        }
    }
}
let myTimer = setInterval(doStuff, 1000); //time is in ms

 
// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
