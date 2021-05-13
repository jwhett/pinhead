const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');

client.on('ready', () => {
      console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
      if (msg.content === 'ping') {
              msg.reply(`Is ${client.user.tag} an instrument?`);
      }
});

client.login(auth.token);

client.on('messageReactionAdd', (mr, user) => {
	// Don't care about bot reactions
	if (user.bot) return;

}
