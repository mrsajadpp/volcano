module.exports.run = (client, message, args, badWords) => {
  var word = message.content.split('/add ')[1];
  badWords.push(word);
}
