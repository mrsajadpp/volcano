function remove (client, message,badWords,say,roleId,chId) {
  var i = 0;
  var word = '';
  var count = 0;
  for ( i = 0; i < badWords.length; i++) {
    if (badWords[i].includes(message.content)) {
       word = badWords[i];
    }
  }
  if (badWords.includes(message.content)) {
    var msg = message;
    for (var l = 0; l < say.length; l++) {
      if (say[l].id === message.author.id) {
        say[l] = {
           id: message.author.id,
           count: say[l].count + 1
        };
        if (say[l].count == 5) {
            let role = message.guild.roles.cache.find(r => r.name === "muted");
          message.member.roles.add(role).catch(console.error);
          say[l].count = 0;
          role = '';
        }
      } else {
        say.push({
           id: message.author.id,
           count: count + 1
        });
        count = 0;
      }
    }
    message.delete();
    message.channel.send(`🩹 Removed <@${message.author.id}>'s Message as it had a bad word in it used ${message.content}. Bad word's strictly prohibited this server.`).catch(console.error);
  }
}
module.exports = remove;
