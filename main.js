const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');
const config = require('./config.json');

client.on('ready', () => {
      console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
    if (message.content === 'pinhead') {
        message.channel.send("https://media.giphy.com/media/NsGsjTRJBj8Fq/giphy.gif");
    }
});

client.login(auth.token);

client.on('messageReactionAdd', (mr, user) => {
	// Don't care about bot reactions
	if (user.bot) return;
	console.log(`reaction from ${user.username}`);
	if (mr.emoji.name === '📌' && mr.message.pinnable && mr.count === config.MAX){
            mr.message.pin();
	};
});
