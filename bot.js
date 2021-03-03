const Discord = require('discord.js');
const client = new Discord.Client();

process.env.TZ = 'Australia/Perth'

let messaged = false;
let lastHours = 0;
let lastMinutes = 0;

//List of channels
let coloChannel = 762832294259195946;
let spamChannel = 0;

//Event Timers // Setting them to FALSE turns them off completely...
let bloodEvent = false; // Guild Box O' Grimoire // AKA Trash Event

client.on('ready', () => {
    console.log('I am ready!');
});
 
client.on('message', message => {
    if(!message.content.StartsWith(process.env.Prefix) || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    
    let date = new Date();
    if (command === 'hello') {
        message.reply(" I am still alive! - Current Time (for Mani): " + date.getHours() + ":" + date.getMinutes());
    }
    
    if (command === 'event') {
		if(args.length === '0') {
			message.reply(" Here are the current events:\nGuild Box O\' Grimoire (blood): " + bloodEvent + "\n\nTo turn on/off the events do !event name (the brackets value).");
		}
		if(args[0] === 'blood') {
			BloodEvent();
			return;
		}
		message.reply(" Sorry but that event is not in my list...");
    }
});

function BloodEvent() {
        if(bloodEvent) {
            bloodEvent = false;
            message.reply(" Blood event is disabled!");
        } else {
            bloodEvent = true;
            message.reply(" Blood event enabled! Have fun!", { file:https://i.imgur.com/HKw7PQj.jpg });
        }
}

function doStuff() {
    // Colo alert timer
    if(CheckTime(9, 57)) {
            if(!messaged) {
                client.channels.get(coloChannel).send('@everyone Time for Colo! https://i.imgur.com/DehsKa7.jpg');
                messaged = true;
            }
    }
    
    // Blood Event
    if(bloodEvent) {
        //Right after our colo ends + a minute or 2
        if(CheckTime(10, 22)) {
                if(!messaged) {
                    client.channels.get(coloChannel).send('Please don\'t forget to spend your Blood! https://i.imgur.com/HKw7PQj.jpg');
                    messaged = true;
                }
        }
    }
    
    //Reset sent message one minute later to stop spam because i am lazy to do this properly
    if(messaged) {
        if(CheckTime(lastHours, lastMinutes +1)) {
           messaged = false;
           lastHours = lastHours-1;
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
