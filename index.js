const discord = require("discord.js");
const botConfig = require("./botconfig.json");

const client = new discord.Client();

client.on("ready", async () => {

    console.log(`${client.user.username} is online!`);
    client.user.setActivity(botConfig.prefix + "help", {type: "LISTENING"}); 
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
            {name: prefix + "alert", value: "Laat een mededeling zien. ?alert [Titel] [bericht]. Voorbeeld: ?alert Mededeling Dit is een voorbeeldmededeling. Je moet voor dit commando de rol 「L」Lead Team hebben."}, //?alert
            {name: prefix + "poll", value: "Maak een poll. ?poll [naam-(aan-elkaar)] [antwoord-1-(aan-elkaar)] [antwoord-2-(aan-elkaar)] [Extra info en vraag]. Voorbeeld: ?poll Test? Ja Nee Is dit een test?"}, //?poll
            {name: prefix + "tickethelp", value: "Voor meer info over tickets, doe ?tickethelp"} //?tickethelp
        )
        .setFooter("Copyright 2020")
        .setColor("#00ffe1");

        return message.channel.send(embed);
    }

    else if(command === `${prefix}poll`)
        {
            
            msg = messageArray.slice(4).join(' ');
           
            var embed = new discord.MessageEmbed()
            .setTitle("Poll | " + messageArray[1])
            .addFields(
                {name: "Optie 1", value: messageArray[2]},
                {name: "Optie 2", value: messageArray[3]}
            )
            .setFooter("Verzonden door: " + message.author.username)
            .setColor("#00ffe1")
            .setDescription("Antwoord met 1️⃣ of 2️⃣ om te stemmen! - " + msg);

            return message.channel.send(embed).then(msg => {
                msg.react('1️⃣');
                msg.react('2️⃣');
                message.delete();
            });
            
        }
    else if(command === `${prefix}giveaway`)
        {
            if(message.member.roles.cache.some(role => role.name === '「L」Lead Team')){
                let timev = message.content.slice(client.prefix.length+9)
                if(!timev) return message.channel.send('Je hebt geen tijd meegegeven.')
                let time = parseInt(timev,10)
                if(time<= 15000){
                    return message.channel.send('Je tijd moet langer dan 15 seconden zijn! (15000 ms)')
                }
                let prize = message.content.slice(client.prefix.length+9+time.length)
                if(!prize) return message.channel.send('Je hebt geen prijs meegegeven.')
            }
            else{
                return message.channel.send("Je hebt geen permissie om dat te doen.").then(msg => {
                    msg.delete({timeout: 3000})
                    message.delete({timeout: 3000});
                    });
            }
        }
    else if(command === `${prefix}ticket`)
        {
            const categoryID = "715193942907420702";

            var userName = message.author.username;
            var userDiscriminator = message.author.discriminator;

            var ticketExist = false;

            message.guild.channels.cache.forEach(channel => {

                if(channel.name == userName.toLowerCase() + "-" + userDiscriminator){
                    ticketExist = true;

                    message.channel.send("Je hebt al een ticket aangemaakt. Zie je hem niet staan? Spreek dan even de staff aan.")

                    return;
                }

            });

            if(ticketExist) return;

            message.channel.send("Hoi, " + message.author.username + "! Er is een ticket aangemaakt in #" + userName.toLowerCase() + "-" + userDiscriminator);

            message.guild.channels.create(userName.toLowerCase() + "-" + userDiscriminator, {type: 'text'}).then(
                (createdChannel) => {
                    createdChannel.setParent(categoryID).then(
                        (settedParent) => {

                            settedParent.updateOverwrite(message.guild.roles.cache.find(x => x.name === '@everyone'), {
                                SEND_MESSAGES: false, 
                                VIEW_CHANNEL: false
                            });

                            settedParent.updateOverwrite(message.author.id, {
                                CREATE_INSTANT_INVITE: false, 
                                READ_MESSAGES: true, 
                                SEND_MESSAGES: true, 
                                ATTACH_FILES: true, 
                                CONNECT: true, 
                                ADD_REACTIONS: true,
                                VIEW_CHANNEL: true,
                                READ_MESSAGE_HISTORY: true
                            });

                            settedParent.updateOverwrite(message.guild.roles.cache.find(x => x.name === 'Support Team'), {
                                CREATE_INSTANT_INVITE: false, 
                                READ_MESSAGES: true, 
                                SEND_MESSAGES: true, 
                                ATTACH_FILES: true, 
                                CONNECT: true, 
                                ADD_REACTIONS: true,
                                VIEW_CHANNEL: true,
                                READ_MESSAGE_HISTORY: true
                            });

                            var embedParent = new discord.MessageEmbed()
                                .setTitle(`Hoi ${message.author.username}`)
                                .setDescription("Zet hier je bericht/vraag. Deze tekst word nog aangepast");

                            settedParent.send(embedParent);
                        }
                    ).catch(err => {
                        message.channel.send("Er is iets misgegaan in de code. Neem contact op met de developer of probeer opnieuw.")
                    });
                }
            ).catch(err => {
                message.channel.send("Er is iets misgegaan in de code. Neem contact op met de developer of probeer opnieuw.")
            });
        }
    else if(command === `${prefix}tickethelp`)
        {
            message.channel.send("We zijn nog bezig met deze functie, kom later terug.")
        }
    else if(command === `${prefix}close`)
        {
            const categoryID = "715193942907420702";
            
            if(!message.member.roles.cache.some(role => role.name === 'Support Team')) return message.channel.send("Je hebt geen permissie om dat te doen.")

            if(message.channel.parentID == categoryID){
                message.channel.delete();
            }else{
                message.channel.send("Je kunt dit commando alleen in tickets doen.");
            }

        }
})

client.on('guildMemberAdd', member => {
    return;
})

client.login(process.env.token);