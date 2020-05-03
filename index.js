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
        if(message.member.roles.cache.some(role => role.name === '「L」Lead Team')){
            message.delete();
            
            msg = messageArray.slice(2).join(' ');
            var embed = new discord.MessageEmbed()
            .setTitle(messageArray[1])
            .setDescription(msg)
            .setFooter("Verzonden door: " + message.author.username)
            .setColor("#00ffe1");

        return message.channel.send(embed);
    }
    else{
        message.channel.send("Je hebt geen permissie om dat te doen. Mongool :P");
        message.delete({timeout: 3000});
        return;
    }
    }

   
    else if(command === `${prefix}help`){
        var embed = new discord.MessageEmbed()
        .setTitle("Help")
        .setDescription("Hieronder vind je alle commando's.")
        .addFields(
            {name: prefix + "help", value: "Laat alle commando's zien en vertelt wat ze doen."},
            {name: prefix + "test", value: "Test of de bot online is."}
        )
        .setFooter("Copyright 2020")
        .setColor("#00ffe1");

        return message.channel.send(embed);
    }
})
client.on('guildMemberAdd', member => {
    return;
})

client.login(process.env.token);