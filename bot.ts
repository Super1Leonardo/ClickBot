import { Telegraf } from 'https://deno.land/x/telegraf@v1.8.0/mod.ts';

const botToken = Deno.env.get('BOT_TOKEN');  // Use Deno.env for environment variables
if (!botToken) {
  throw new Error('BOT_TOKEN is not defined');
}

const bot = new Telegraf(botToken);
const clickApiUrl = 'https://click.ru/api/v6/shorten';

bot.start((ctx) => ctx.reply('Привет! Отправь мне ссылку, и я сокращу её для тебя.'));

bot.on('text', async (ctx) => {
  const originalUrl = ctx.message.text;
  try {
    const response = await fetch(`https://clck.ru/--?url=${originalUrl}`);
    const shortenedUrl = await response.text();
    if (shortenedUrl) {
      ctx.reply(`Ваша сокращённая ссылка: ${shortenedUrl}`);
    } else {
      ctx.reply('Извините, произошла ошибка при сокращении вашей ссылки.');
    }
  } catch (error) {
    console.error(error);
    ctx.reply('Извините, произошла ошибка при сокращении вашей ссылки.');
  }
});

bot.launch();