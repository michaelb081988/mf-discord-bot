const Discord = require('discord.js');
const client = new Discord.Client();

process.env.TZ = 'Australia/Perth'

let messaged = false;
let lastHours = 0;
let lastMinutes = 0;

//Event Timers // Setting them to FALSE turns them off completely...
let bloodEvent = false; // Guild Box O' Grimoire // AKA Trash Event


client.on('ready', () => {
    console.log('I am ready!');
});
 
client.on('message', message => {
    let date = new Date();
    if (message.content === '!hello') {
        message.reply(" I am still alive! - Current Time (for Mani): " + date.getHours() + ":" + date.getMinutes());
    }
    
    if (message.content === '!blood') {
        if(bloodEvent) {
            bloodEvent = false;
            message.reply(" Blood event is disabled!");
        } else {
            bloodEvent = true;
            message.reply(" Blood event enabled! Have fun! https://i.imgur.com/HKw7PQj.jpg");
        }
    }
});

function doStuff() {
    // Mani test event to the spammy level chat
        if(CheckTime(13, 33)) {
            if(!messaged) {
                client.channels.get('763085331565117482').send('New time test with a bunch of other stuff... https://i.imgur.com/DehsKa7.jpg');
                messaged = true;
            }
    }
    
    // Colo alert timer
    if(CheckTime(9, 57)) {
            if(!messaged) {
                client.channels.get('762832294259195946').send('@everyone Time for Colo! https://i.imgur.com/DehsKa7.jpg');
                messaged = true;
            }
    }
    
    // Blood Event
    if(bloodEvent) {
        //Right after our colo ends + a minute or 2
        if(CheckTime(10, 22)) {
                if(!messaged) {
                    client.channels.get('762832294259195946').send('Please don\'t forget to spend your Blood! https://i.imgur.com/HKw7PQj.jpg');
                    messaged = true;
                }
        }
    }
    
    //Reset sent message one minute later to stop spam because i am lazy to do this properly
    if(messaged) {
        if(CheckTime(lastHours, lastMinutes +1)) {
           messaged = false;
           lastHours = hours-1;
        }
    }
}
let myTimer = setInterval(doStuff, 1000); //time is in ms

function CheckTime(hours, minutes) {
    let date = new Date();
    if(date.getHours() === hours) {
        if(date.getMinutes() === minutes) {
            lastHours = hours;
            lastMinutes = minutes;
            return true;
        }
    }
    return false;
}

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
