module.exports = {
    /**
     * Delete a role or channel
     * @param {import('../utils').Interaction} command
     * @param {import('../utils')} utils
     */
    async execute(command, utils) {
        try {
            const guildID = command.guildID; // The current guild
            const authorID = command.authorID; // The command author
            const type = command.data.options[0].name; // Either role or channel
            
            // Fetch the current guild and author
            const guild = await command.client.guilds.fetch(guildID);
            const author = await guild.members.fetch(authorID);

            // Check the type of thing to delete
            switch (type) {
                // Delete a role
                case 'role': {
                    // Check the author's permissions
                    if (await utils.check(author, guildID, {permissions: ['MANAGE_ROLES'], roles: ['admin']}) === false) {
                        throw new Error('Missing Permissions');
                    }

                    // Get the role and delete it
                    const role = guild.roles.cache.get(options[0].value);
                    await role.delete();

                    // Send a confirmation message
                    command.send(`Success! \`${role.name}\` has been deleted`);
                    break;
                }

                // Delete a channel
                case 'channel': {
                    // Check the author's permissions
                    if (await utils.check(author, guildID, {permissions: ['MANAGE_CHANNELS'], roles: ['admin']}) === false) {
                        throw new Error('Missing Permissions');
                    }

                    // Get the channel and delete it
                    const channel = guild.channels.cache.get(options[0].value);
                    await channel.delete();

                    // Send a confirmation message
                    command.send(`Success! \`${channel.name}\` has been deleted`);
                    break;
                }
            }

        } catch (err) {
            // Log any errors
            command.error(err);
        }
    },

    // The data to register the command
    json: {
        name: 'delete',
        description: 'Delete a role or channel',
        options: [
            {
                name: 'role',
                description: 'Delete a role',
                type: 1,
                options: [
                    {
                        name: 'role',
                        description: 'The role to delete',
                        type: 8, 
                        required: true
                    }
                ]
            },
            {
                name: 'channel',
                description: 'Delete a channel',
                type: 1,
                options: [
                    {
                        name: 'channel',
                        description: 'The channel to delete',
                        type: 7,
                        required: true
                    }
                ]
            }
        ]
    }
};
