const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');
const config = require('./config.json');

client.on('ready', () => {
      console.log(`Logged in as ${client.user.tag}!`);
});

client.login(auth.token);

client.on('messageReactionAdd', (mr, user) => {
	// Don't care about bot reactions
	if (user.bot) return;
	if (mr.emoji.name === '📌' && mr.message.pinnable && mr.count === config.MAX){
            mr.message.pin();
	};
});
