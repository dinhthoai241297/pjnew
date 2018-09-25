/**
 * Province.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
    // Province
    attributes: {
        name: {
            type: 'string',
            unique: true,
            required: true
        },
        description: {
            type: 'string'
        },
        sector: {
            model: 'sector'
        },
        schools: {
            collection: 'school',
            via: 'province'
        },
        status: {
            model: 'status'
        }
    },
};

