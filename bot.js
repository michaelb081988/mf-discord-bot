const Discord = require('discord.js'); //DiscordJS base
const client = new Discord.Client(); //Client connector
const cron = require('node-cron'); //Create scheduled cron tasks // Ran at X time

//Set time zone to me so i can know when things are supposed to be done
process.env.TZ = 'Australia/Perth'

//List of channels
let coloChannel = '762832294259195946'; // #colosseum
let eventChannel = '762830413830946816'; // #events
let spamChannel = '816677982562811944'; // #mani's-bot-testing

//Event Timers // Setting them to FALSE turns them off completely...
let bloodEvent = true; // Guild Box O' Grimoire // AKA Trash Event
let guerrillaEvent = true; //Squirming Darkness Weapon/Armor // XP Dungeon

//Startup so we know it is running and connected
client.on('ready', () => {
    console.log('I am ready!');
});
 
// Waiting for messages
client.on('message', message => {
    if(!message.content.startsWith(process.env.Prefix) || message.author.bot) return;
    
    const args = message.content.slice(process.env.Prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    
    let date = new Date();
    if (command === 'hello') {
        client.channels.get(spamChannel).send(" I am still alive! - Current Time (for Mani): " + date.getHours() + ":" + date.getMinutes());
    }
});

// 30 minute colo warning // 9:30
cron.schedule('0 30 9 * * *', () => {
	client.channels.get(coloChannel).send("Colo starts in 30 minutes!!", { file:"https://i.imgur.com/DehsKa7.jpg" });
});

// Colo starting in 3 minutes! // 9:57
cron.schedule('0 57 9 * * *', () => {
    client.channels.get(coloChannel).send("@everyone Colo starting now!", { file:"https://i.imgur.com/DehsKa7.jpg" });
});

// Blood event, has to be a cron but then check if active during // 10:20
cron.schedule('0 28 10 * * *', () => {
    if(bloodEvent) {
	    client.channels.get('762832294259195946').send("Don't forget to spend your event Blood!", { file:"https://i.imgur.com/HKw7PQj.jpg" });
	}
});

// This connects the bot to the Discord servers, without this nothing starts
client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
