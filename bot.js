const Discord = require('discord.js'); //DiscordJS base
const client = new Discord.Client(); //Client connector
const cron = require('node-cron'); //Create scheduled cron tasks // Ran at X time

const { Pool, Client } = require('pg');

const db = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
});

//Set time zone to me so i can know when things are supposed to be done
process.env.TZ = 'Australia/Perth';

//List of channels
let coloChannel = '762832294259195946'; // #colosseum
let eventChannel = '762830413830946816'; // #events
let spamChannel = '816677982562811944'; // #mani's-bot-testing

//Event Timers // Setting them to FALSE turns them off completely...
let conquestEvent = true; // Conquest Events, there are so many of them :sigh
let currentConquest = 1; // Current conquest active

let conquestImages = [
    "https://static.wikia.nocookie.net/sinoalice_gamepedia_en/images/f/f7/Nightmare_in_the_chapel.png", //Jörmungandr // 0
    "https://i.imgur.com/ZI15o2d.png" // Belial // 1
];

//Keep a list of AFK/Late players to show during colo live message!
let latePlayers = ["~~      ~~"];
let afkPlayers = ["~~      ~~"];

//A list of random images to use for colo announcements
let coloLogo = [
    "https://media.pocketgamer.biz/2020/3/103913/sinoalice-r225x.jpg",
    "https://i.pinimg.com/originals/c9/03/d5/c903d5c29570b91c6b20284a64ba7874.png",
    "https://i.pinimg.com/originals/fc/ee/37/fcee373c2eb654238ba23ea082144e93.png"
];
let coloImage = [
    "https://i.imgur.com/DehsKa7.jpg",
    "https://i.imgur.com/evYE00g.png",
    "https://sinoalice.global/include/images/ogp.jpg",
    "https://mmoculture.com/wp-content/uploads/2018/11/SINoALICE-image.jpg"
];

//Startup so we know it is running and connected
client.on('ready', () => {
    console.log('I am ready!');
    sendEvent(spamChannel, "Startup Done...");
    db.connect();
});
 
// Waiting for messages
client.on('message', message => {
    if(!message.content.startsWith(process.env.Prefix) || message.author.bot) return;
    
    const args = message.content.slice(process.env.Prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    
    let date = new Date();

    if (command === 'hello') {
        client.channels.get(message.channel.id).send("I am still alive! - Current Time (for Mani): " + date.getHours() + ":" + date.getMinutes());
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
        message.reply(` I announce colo to the discord. Use !late or !afk and I will record it for the days colo announcement!
        !blood will turn on/off the blood event notifications.
        !upgrade will turn off the spam in the #events channel.`);
    }
	
    if(command === 'list' || command === 'lists') {
        sendColo("Here is the current list for tonights colo!", false);
    }

    if(command === 'match') {
        if(args.length == 0) { sayMatchInfo(message.channel.id); return; }
        if(args[0] == 'help' && args.length == 1) { message.reply(" Type !match to see total win/loss numbers. !match guildname win/loss to track a match."); }
        if(args.length != 2) { message.reply("Missing info. To use type !match guildname win/loss!"); return; }
        if(args[1] != "win" && args[1] != "loss") { message.reply("Win/Loss is not correct. To use type !match guildname win/loss!"); return; }
        addWinLoss(args[0], args[1], message);
    }
	
    if(command === 'events') {
        getActiveEvents(message);
    }

    if(command === 'event') {
        if(args.length == 0) {
            sendEvent(message.channel.id, "No event name given. !events to see all available events.");
            return;
        }
        setEventStatus(message, args[0]);
    }
});

// 30 minute colo warning // 9:30
cron.schedule('0 30 9 * * *', () => {
    sendEvent(coloChannel, "Colo starts in 30 minutes!!", coloImage[Math.floor(Math.random() * coloImage.length)]);
});

// Colo starting in 3 minutes! // 9:57
cron.schedule('0 57 9 * * *', () => {
    sendColo("@everyone Colo starting now!", true);
});

// Blood event, has to be a cron but then check if active during // 10:21
cron.schedule('0 21 10 * * *', () => {
    getAndSendEvent(message, 'blood');
});

// Check for guerilla/upgrade event. Will eventually check everything with this.
cron.schedule('0 * * * * *', () => {
    if(isTime(2, 28) || isTime(4, 28) || isTime(6, 28) || isTime(8, 28) || isTime(10, 28) || isTime(18, 28) || isTime(0,28)) {
        getAndSendEvent(message, 'upgrade');
    }

    if(conquestEvent) { //Check conquest event enabled.
        if(isTime(1, 28) || isTime(3, 28) || isTime(5, 28) || isTime(7, 28) || isTime(9, 28) || isTime(11, 28) || isTime(7, 58)) {
            sendEvent(eventChannel, "Conquest Event is live for the next 30 minutes!", conquestImages[currentConquest]);
        }
    }
});

function isTime(hours, minutes) {
    let date = new Date();
    if(date.getHours() == hours && date.getMinutes() == minutes) {
        return true;
    }
    return false;
}

function sendColo(text, reset = false) {
    var embed = {
        "title": "Colo Announcement",
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
    if(reset) {
        afkPlayers = ["~~      ~~"];
        latePlayers = ["~~      ~~"];
    }
    client.channels.get(coloChannel).send(text, { embed });
}

function sendEvent(channel, text, image = null) {
    if(image === null) {
        client.channels.get(channel).send(text);
        return;
    }
    client.channels.get(channel).send(text, { file:image });
}

function getActiveEvents(message) {
    let events = "";
    db.query("SELECT * FROM EVENTS")
    .then(res => {
        for (var i = 0; i < res.rows.length; i++) {
            let active = res.rows[i]['active'];
            events += res.rows[i]['name'] + "(" + res.rows[i]['slug'] + ") is currently: " + ((res.rows[i]['active']) ? 'Enabled' : 'Disabled') + "\n";
        }
        events += "To enable/disable an event use !event name. For example, !event blood";
        sendEvent(message.channel.id, "Current events...\n" + events);
    })
    .catch(err => {
        message.reply(" there was an error. Tell Mani!");
        console.log(err.stack);
    })
}

async function addWinLoss(guild, result, message) {
    //First look to see if guild exists in DB
    const query = {
        text: "INSERT INTO matches(guild,result,date,author) VALUES($1, $2, $3, $4) RETURNING *",
        values: [guild, result, '11/22/3333', message.author.username]
    };
    db.query(query)
    .then(res => {
        sayWinLoss(guild, message.channel.id);
    });
}

async function sayWinLoss(guild, channel) {
    const win = {
        text: "SELECT * FROM matches WHERE guild = $1 AND result = $2",
        values: [guild, 'win']
    };
    const loss = {
        text: "SELECT * FROM matches WHERE guild = $1 AND result = $2",
        values: [guild, 'loss']
    };

    let wins = 0;
    let losses = 0;

    await db.query(win).then(res => wins = res.rows.length);
    await db.query(loss).then(res => losses = res.rows.length);
    sendEvent(channel, "Against " + guild + " we have won " + wins + " and lost " + losses);
}

async function sayMatchInfo(channel) {
    const win = {
        text: "SELECT * FROM matches WHERE result = $1",
        values: ['win']
    };
    const loss = {
        text: "SELECT * FROM matches WHERE result = $1",
        values: ['loss']
    };

    let wins = 0;
    let losses = 0;

    await db.query(win).then(res => wins = res.rows.length);
    await db.query(loss).then(res => losses = res.rows.length);
    sendEvent(channel, "In total we have tracked " + wins + " wins and " + losses + " losses.");
}

function getAndSendEvent(message, event) {
    const query = {
        text: "SELECT * FROM EVENTS WHERE slug = $1",
        values: [event]
    }
    db.query(query)
    .then(res => {
        if(res.rows[0]['active']) {
            sendEvent(eventChannel, res.rows[0]['message'], res.rows[0]['image']);
        }
    });
}

function setEventStatus(message, event) {
    const query = {
        text: "SELECT * FROM EVENTS WHERE slug = $1",
        values: [event]
    }
    db.query(query)
    .then(res => {
        //Check if it exists or not. If not, notify and escape
        if(res.rows.length == 0) {
            message.reply(" event not found. !events to get a full list!");
            return;
        }
        //Check if active or not so we can give it the old swaparoo
        let active = res.rows[0]['active'];
        db.query('UPDATE EVENTS SET active = $1 WHERE slug = $2', [!active, res.rows[0]['slug']])
        .then(resup => {
            if(active) { //Was active, now inactive
                sendEvent(message.channel.id, res.rows[0]['name'] + " is now disabled.");
            } else {
                sendEvent(message.channel.id, res.rows[0]['name'] + " is now active!");
            }
        })
        .catch(err => {
            message.reply(" there was an error. Tell Mani!");
        })
        
    })
    .catch(err => {
        message.reply(" there was an error. Tell Mani!");
    })
}

// This connects the bot to the Discord servers, without this nothing starts
client.login(process.env.BOT_TOKEN); //BOT_TOKEN is the Client Secret