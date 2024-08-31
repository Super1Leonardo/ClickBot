import { Telegraf } from 'telegraf';
import { BOT_TOKEN } from '.env'
import { request } from 'https';
import axios from 'axios'

const bot = new Telegraf(BOT_TOKEN)
bot.telegram.setWebhook(`https://${process.env.VERCEL_URL}/bot${process.env.BOT_TOKEN}`);
bot.startWebhook(`/bot${process.env.BOT_TOKEN}`, null, process.env.PORT || 3000);
const clickApiUrl = 'https://click.ru/api/v6/shorten';

bot.start((ctx) => ctx.reply('Привет! Отправь мне ссылку, и я сокращу её для тебя.'))

bot.on('text', async (ctx) => {
  const originalUrl = ctx.message.text
  try {
    const response = await axios.get(`https://clck.ru/--`, { params: { url: originalUrl } })
    if (response.data) {
      ctx.reply(`Ваша сокращённая ссылка: ${response.data}`)
    } else {
      ctx.reply('Извините, произошла ошибка при сокращении вашей ссылки.')
    }
  } catch (error) {
    ctx.reply('Извините, произошла ошибка при сокращении вашей ссылки.')
  }
})

bot.launch()
