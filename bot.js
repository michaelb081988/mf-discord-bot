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
    }
    
    if(message.content === '!start') {
        let message = "Joining members: ";
        members.forEach(function(item, index, array) {
            message = message + item;
        });
        message.channel.send(message);
    }
    
    if(message.content === '!clear') {
        members = [];
    }
});
 
// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
