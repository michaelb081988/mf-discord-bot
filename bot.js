const Discord = require('discord.js');
const client = new Discord.Client();

let members = [];

client.on('ready', () => {
    console.log('I am ready!');
});
 
client.on('message', message => {
    let color = 7081235; // hex: #6C0D13
    
    if (message.content === '!squad') {
        members.push("Test");
        message.reply(" has joined the squad list.");
    }
    
    if(message.content === '!start') {
        let message = "Joining members: ";
        members.forEach(function(item, index, array) {
            message = message + item;
        });
        message.reply(message);
    }
    
    if(message.content === '!clear') {
        members = [];
        message.reply("Cleared squad list");
    }
});
 
// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
