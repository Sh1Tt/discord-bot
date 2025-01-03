const { TARGET_MESSAGE_ID, TARGET_CHANNEL_ID } = process.env;

module.exports = {
    name: 'messageReactionAdd',
    once: false,
    async execute(reaction, user, client) {
        // Ignore bot reactions
        if (user.bot) return;

        // Find the channel
        const channel = await client.channels.fetch(TARGET_CHANNEL_ID);

        if (!channel) {
            process.env.NODE_ENV === 'dev' && console.log('Channel not found');
            return;
        }

        // Fetch the message by its ID
        try {
            const message = await channel.messages.fetch(TARGET_MESSAGE_ID);
            if (!message) {
                process.env.NODE_ENV === 'dev' && console.log('Message not found');
                return;
            }

            if (reaction.message.id === message.id) {
                const member = await message.guild.members.fetch(user.id);
                
                switch (reaction._emoji.name) {
                    case '❤️':
                        const aweRole = message.guild.roles.cache.find(role => role.name === 'AWE');
                        member.roles.add(aweRole);
                        process.env.NODE_ENV === 'dev' && console.log(`${user.username} reacted with ${reaction._emoji.name}, and was given the AWE role.`);
                        break;

                    default:
                        return;
                }
            }
        }
        catch (error) {
            console.error(`Error in messageReactionAdd: ${error}`);
        }
    },
};