module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        process.env.NODE_ENV === 'dev' && console.log(`Logged in as ${client.user.tag}`);
    },
};                                                                                                               