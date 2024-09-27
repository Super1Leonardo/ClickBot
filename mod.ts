import { Bot } from "grammy"

export const bot = new Bot(Deno.env.get("BOT_TOKEN") || "")

bot.command("start", async (ctx) => {
    await ctx.reply("Привет! Отправь любую ссылку, и я верну её в коротком виде!\n\nРаботает на API clck.ru")
})

bot.chatType("private").on("msg:text", async (ctx) => {
    const url = ctx.message.text
    const endpoint = "https://clck.ru/--?url="
    const response = await fetch(endpoint + url)
    await ctx.reply("Твоя ссылка:\n" + await response.text())
})

bot.command("help", (ctx) => {
    ctx.reply("No help")
})