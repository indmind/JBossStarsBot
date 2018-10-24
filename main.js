const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

require('dotenv').config()

const token = process.env.TOKEN;

const bot = new TelegramBot(token, {polling: true});

bot.on('message', msg => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if(text == '/start') return bot.sendMessage(chatId, 
    'just tell me the repository name and I will tell the repo stargaze'
  )

  axios.get('https://api.github.com/orgs/JBossOutreach/repos', {
    responseType: 'json'
  }).then(({data}) => {
    const repo = data.filter(d => d.name == text)[0];
    const response = repo ? 
      `${text} has ${repo["stargazers_count"]} stars` 
      : 'sorry, I can\'t find the repository';

    bot.sendMessage(chatId, response);
  })
})
