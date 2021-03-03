const Discord = require('discord.js');
const client = new Discord.Client();

process.env.TZ = 'Australia/Perth'

let messaged = false;

//Event Timers
let bloodEvent = true; // Guild Box O' Grimoire // AKA Trash Event

client.on('ready', () => {
    console.log('I am ready!');
});
 
client.on('message', message => {
    let date = new Date();
    if (message.content === '!hello') {
        message.reply(" I am still alive! - Current Time (for Mani): " + date.getHours() + ":" + date.getMinutes());
    }
});


function doStuff() {
    let date = new Date();
    
    // Colo alert timer
    if(date.getHours() === 9) {
        if(date.getMinutes() == 57) {
            if(!messaged) {
                client.channels.get('762832294259195946').send('@everyone Time for Colo! https://i.imgur.com/DehsKa7.jpg');
                messaged = true;
            }
        }
        if(date.getMinutes() == 58) {
            messaged = false
        }
    }
    
    // Blood Event
    if(bloodEvent) {
        //Right after our colo ends + a minute or 2
        if(date.getHours() === 10) {
            if(date.getMinutes() == 22) {
                if(!messaged) {
                    client.channels.get('762832294259195946').send('Please don\'t forget to spend your Blood! https://i.imgur.com/HKw7PQj.jpg');
                    messaged = true;
                }
            }
            if(date.getMinutes() == 23) {
                messaged = false
            }
        }
    }
}
let myTimer = setInterval(doStuff, 1000); //time is in ms

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
