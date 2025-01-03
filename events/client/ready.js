module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        client.log({
            type: 'info',
            message: `Ready! Logged in as ${client.user.tag}`,
            module: 'ready',
        });
    },
};                                                                                                               