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
        return message.channel.send("Je hebt geen permissie om dat te doen.").then(msg => {
            msg.delete({timeout: 3000})
            message.delete({timeout: 3000});
          });
    }
    }

   
    else if(command === `${prefix}help`){
        var embed = new discord.MessageEmbed()
        .setTitle("Help")
        .setDescription("Hieronder vind je alle commando's.")
        .addFields(
            {name: prefix + "help", value: "Laat alle commando's zien en vertelt wat ze doen."}, //?help
            {name: prefix + "test", value: "Test of de bot online is."}, //?test
            {name: prefix + "alert", value: "Laat een mededeling zien. ?alert [Titel] [bericht]. Voorbeeld: ?alert Mededeling Dit is een voorbeeldmededeling. Je moet voor dit commando de rol 「L」Lead Team hebben."} //?alert
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