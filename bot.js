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
let bloodEvent = false; // Guild Box O' Grimoire // AKA Trash Event
let guerrillaEvent = true; //Squirming Darkness Weapon/Armor // XP Dungeon

//Keep a list of AFK/Late players to show during colo live message!
var latePlayers = ["~~      ~~"];
var afkPlayers = ["~~      ~~"];

//A list of random images to use for colo announcements
var coloLogo = [
    "https://media.pocketgamer.biz/2020/3/103913/sinoalice-r225x.jpg",
    "https://i.pinimg.com/originals/c9/03/d5/c903d5c29570b91c6b20284a64ba7874.png",
    "https://i.pinimg.com/originals/fc/ee/37/fcee373c2eb654238ba23ea082144e93.png"
];
var coloImage = [
    "https://i.imgur.com/DehsKa7.jpg",
    "https://i.imgur.com/evYE00g.png",
    "https://sinoalice.global/include/images/ogp.jpg",
    "https://mmoculture.com/wp-content/uploads/2018/11/SINoALICE-image.jpg"
];

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
	
    if(command === 'afk') {
	if(afkPlayers.includes(message.author.username)) {
		message.reply(" is no longer going to be AFK. Removed from the list!!");
		afkPlayers = afkPlayers.filter(e => e !== message.author.username);
		return;
	}
        message.reply(" is going to be afk for this colo. Added to the list! You can unset yourself as afk by doing !afk again...");
        afkPlayers.push(message.author.username);
    }

    if(command === 'late') {
	if(latePlayers.includes(message.author.username)) {
		message.reply(" is no longer going to be late. Removed from the list!!");
		latePlayers = latePlayers.filter(e => e !== message.author.username);
		return;
	}
        message.reply(" is going to be a little late tonight. Please forgive them! You can unset yourself as late by doing !late again...");
        latePlayers.push(message.author.username);
    }

    if(command === 'colo') {
        message.reply(" I announce colo to the discord. Use !late or !afk and I will record it for the days colo announcement! Once you are on the list however you cannot be removed, so let the officers know!");
    }
	
    if(command === 'blood') {
	if(bloodEvent) {
	    message.reply(" blood event messages are disabled");
	    bloodEvent = false;
            return;
	}
	message.reply(" blood event messaged enabled!");
	bloodEvent = true;
	return;
    }

    if(command === 'list' || command === 'lists') {
        var embed = {
            "title": "Colo hype!",
            "color": 2713012,
            "timestamp": "2021-03-05T07:02:05.369Z",
            "footer": {
                "icon_url": "https://i.redd.it/6822bzc0uxu21.jpg",
                "text": "ManifestFailure"
            },
            "thumbnail": {
                "url": coloLogo[Math.floor(Math.random() * coloLogo.length)]
            },
            "image": {
                "url": coloImage[Math.floor(Math.random() * coloImage.length)]
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
        message.channel.send("Here is the current list for tonights colo!", { embed });
    }
});

// 30 minute colo warning // 9:30
cron.schedule('0 30 9 * * *', () => {
	client.channels.get(coloChannel).send("Colo starts in 30 minutes!!", { file: coloImage[Math.floor(Math.random() * coloImage.length)] });
});

// Colo starting in 3 minutes! // 9:57
cron.schedule('0 57 9 * * *', () => {
    var embed = {
        "title": "Colo Starting!",
        "color": 2713012,
        "timestamp": "2021-03-05T07:02:05.369Z",
        "footer": {
          "icon_url": "https://i.redd.it/6822bzc0uxu21.jpg",
          "text": "ManifestFailure"
        },
        "thumbnail": {
          "url": coloLogo[Math.floor(Math.random() * coloLogo.length)]
        },
        "image": {
          "url": coloImage[Math.floor(Math.random() * coloImage.length)]
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
    afkPlayers = ["~~      ~~"];
    latePlayers = ["~~      ~~"];
    client.channels.get(coloChannel).send("@everyone Colo starting now!", { embed });
});

// Blood event, has to be a cron but then check if active during // 10:21
cron.schedule('0 21 10 * * *', () => {
    if(bloodEvent) {
	    client.channels.get(coloChannel).send("Don't forget to spend your event Blood!", { file:"https://i.imgur.com/HKw7PQj.jpg" });
	}
});

// This connects the bot to the Discord servers, without this nothing starts
client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
