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

//Keep a list of AFK/Late players to show during colo live message!
var latePlayers = ["aa"];
var afkPlayers = ["aa"];

//Startup so we know it is running and connected
client.on('ready', () => {
    console.log('I am ready!');
    client.channels.get(spamChannel).send("Restart done...");
});
 
// Waiting for messages
client.on('message', message => {
    if(!message.content.startsWith(process.env.Prefix) || message.author.bot) return;
    
    const args = message.content.slice(process.env.Prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    
    let date = new Date();
    if (command === 'hello') {
        client.channels.get(spamChannel).send("I am still alive! - Current Time (for Mani): " + date.getHours() + ":" + date.getMinutes());
    }
	
	if(command === 'sorry') {
		client.channels.get(coloChannel).send("I'm sorry I missed calling out colo. I will do it tomorrow I promise", { file: "https://i.ytimg.com/vi/9XfkZlcG8KU/maxresdefault.jpg" });
	}

    if(command === 'name') {
        client.channels.get(spamChannel).send("Your name shows as " + message.author.username);
    }

    if(command === 'afk') {
        client.channels.get(spamChannel).send(message.author.username + " is going to be afk for this colo. Added to the list!");
        afkPlayers.push(message.author.username);
    }

    if(command === 'late') {
        client.channels.get(spamChannel).send(message.author.username + " is going to be a little late today. Please forgive them!");
        latePlayers.push(message.author.username);
    }

    if(command === 'colotest') {
        var embed = {
            "title": "Colo Starting!",
            "color": 2713012,
            "timestamp": "2021-03-05T07:02:05.369Z",
            "footer": {
              "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png",
              "text": "ManifestFailure"
            },
            "thumbnail": {
              "url": "https://media.pocketgamer.biz/2020/3/103913/sinoalice-r225x.jpg"
            },
            "image": {
              "url": "https://i.imgur.com/DehsKa7.jpg"
            },
            "author": {
              "name": "Colo Announcer",
              "url": "https://manifestfailure.com",
              "icon_url": "https://i.redd.it/6822bzc0uxu21.jpg"
            },
            "fields": [
              {
                "name": "AFK",
                "value": afkPlayers.join("\n"),
                "inline": true
              },
              {
                "name": "Late",
                "value": latePlayers.join("\n"),
                "inline": true
              }
            ]
          };
        client.channels.get(spamChannel).send("@ManifestFailure Colo starting now! BUT IT'S FAKE DO NOT TRUST IT THIS IS A TEST OMG", { embed });
        afkPlayers = ["aa"];
        latePlayers = ["aa"];
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

// Blood event, has to be a cron but then check if active during // 10:21
cron.schedule('0 21 10 * * *', () => {
    if(bloodEvent) {
	    client.channels.get(coloChannel).send("Don't forget to spend your event Blood!", { file:"https://i.imgur.com/HKw7PQj.jpg" });
	}
});

// This connects the bot to the Discord servers, without this nothing starts
client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
