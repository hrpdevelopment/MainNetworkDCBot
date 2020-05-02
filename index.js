const discord = require("discord.js");
const botConfig = require("./botconfig.json");

const client = new discord.Client();
client.login(proces.env.token);

client.on("ready", async () => {

    console.log(`${client.user.username} is online!`);
    client.user.setActivity("In development door HRP Development", {type: "Listening"});
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