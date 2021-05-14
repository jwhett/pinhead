const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');
const config = require('./config.json');
const denyEmoji = '🚫';
const pinEmoji = '📌';

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
	if (user.bot) return; // Don't care about bot reactions

	if (mr.emoji.name === pinEmoji && mr.message.pinnable && mr.count === config.MAX){
        	if (hasModDenials(mr)) {
                	console.log("msg was not pinned as it was denied by a mod.");
            		return;
        	}
		mr.message.pin();
	}
});

function isMod(messageReaction, user) {
    const member = messageReaction.message.guild.member(user);
    return member && member.roles.cache.some(role => role.name === config.ROLE);
}

function hasModDenials(messageReaction) {
    return messageReaction.message.reactions.cache.some(reaction => reaction._emoji.name === denyEmoji && reaction.users.cache.some(user => isMod(messageReaction,user)));
}
