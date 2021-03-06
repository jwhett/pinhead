const Discord = require('discord.js');
const client = new Discord.Client();
const TOKEN = process.env.TOKEN;
const MAX = process.env.MAX;
const ROLE = process.env.ROLE;
const TLDR = process.env.TLDR;
const denyEmoji = '🚫';
const pinEmoji = '📌';
const enableEmoji = '👍';
const disableEmoji = '😴';
const prefix = '!pinhead';
var disabled = false;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setPresence({ activity: { name: 'with pins' }, status: 'online' });
});

client.login(TOKEN);

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'enable' && isMod(message, message.author)) {
		enable();
		message.react(enableEmoji);
	} else if (command === 'disable' && isMod(message, message.author)) {
		disable();
		message.react(disableEmoji);
	} else if (command === 'help') {
                sendHelp(message);
	}
});

client.on('messageReactionAdd', (mr, user) => {
	if (user.bot || disabled) return;

	if (mr.emoji.name === pinEmoji && mr.message.pinnable && mr.count === MAX){
        	if (hasModDenials(mr)) {
                	console.log("msg was not pinned as it was denied by a mod.");
            		return;
        	}
		mr.message.pin();
		client.channels.cache.get(TLDR).send(`New pin in **#${mr.message.channel.name}**. Here's the content:\n${mr.message.content}`);
	}
});

function isMod(message, user) {
    const member = message.guild.member(user);
    return member && member.roles.cache.some(role => role.name === ROLE);
}

function hasModDenials(messageReaction) {
    return messageReaction.message.reactions.cache.some(reaction => reaction._emoji.name === denyEmoji && reaction.users.cache.some(user => isMod(messageReaction.message,user)));
}

function disable() {
    if (disabled) return;
    disabled = true;
    client.user.setPresence({ activity: { name: 'with jellyfish' }, status: 'idle' });
    console.log("pinning disabled");
}

function enable() {
    if (!disabled) return;
    disabled = false;
    client.user.setPresence({ activity: { name: 'with pins' }, status: 'online' });
    console.log("pinning enabled");
}

function sendHelp(message) {
    message.channel.send(`React to messages you want to pin with ${pinEmoji}. After ${MAX} ${pinEmoji} reactions, the message will be pinned to the channel. Mods can react with ${denyEmoji} to prevent a message from being pinned.`);
}
