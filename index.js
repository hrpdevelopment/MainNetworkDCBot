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

    else if(command === `${prefix}alert`){
        var i = new int(2 + messageArray.length);
        
        var embed = new discord.MessageEmbed()
        .setTitle(messageArray[1])
        .setDescription(messageArray[i])
        .setFooter("Van: " + message.author.username)
        .setColor("#00ffe1");

        return message.channel.send(embed);
    }
})
client.on('guildMemberAdd', member => {
    return;
})

client.login(process.env.token);