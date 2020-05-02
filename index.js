const discord = require("discord.js");
const botConfig = require("./botconfig.json");

const client = new discord.Client();

client.on("ready", async () => {

    console.log(`${client.user.username} is online!`);
    client.user.setActivity("In development door HRP Development.", {type: "LISTENING"}); 
})

client.on("message", async message => {

    if(message.author.bot) return;

    if(message.channel == "dm") return;

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    if(command === `${prefix}test`){
        return message.channel.send("De bot is online!");
    }
})
client.on('guildMemberAdd', member => {
    var kanaal = message.guild.channels.cache.find(c => c.name == "algemeen"); 


    var embed = new discord.MessageEmbed()
        .setTitle(`Welkom - ${client.user.username}`)
        .setDescription(`Welkom op de MainNetwork server ${member}! Er zijn op dit moment *int* members in de server.`)
        .setFooter("Copyright 2020")
        .setColor("#00ffff");

    return message.send.kanaal(embed);
})

client.login(process.env.token);