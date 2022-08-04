const discord = require('discord.js');
const fs = require('fs');
const client = new discord.Client({ intents: ["GUILDS","GUILD_MESSAGES"] });
const prefix = '/';
let badWords = require('./data/badwords.js');
let say = require('./data/say.js');
let chId = require('./data/channel.js');
let roleId = require('./data/role.js');
let listen = require('./server.js');
let remove = require('./detector/badword.js');
client.on('ready', () => {
  console.log(client.user.username+' ready!');
  client.user.setActivity("badwords", {
      type: "WATCHING",
      url: "https://github.com/mrsajadpp/"
    }); 
});
client.commands = new discord.Collection();
var commands = fs.readdirSync("./commands").filter(file => file.endsWith('.js'));
for(file of commands){
  const commandName = file.split(".")[0];
  const command = require(`./commands/${commandName}`);
  client.commands.set(commandName, command);
}
client.on('messageCreate', message => {
  client.user.setActivity("badwords", {
      type: "WATCHING",
      url: "https://github.com/mrsajadpp/"
    });
  if (message.content.startsWith(prefix) && message.channel.id == '1004392921002426388') {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift();
    const command = client.commands.get(commandName);
    if(!command) return message.reply({ content: "That command doesn't exist!"});
    command.run(client, message, args, badWords)
  } else {
    remove(client,message,badWords,say,roleId,chId);
  }
});
listen();
client.login(process.env.TOKEN);
