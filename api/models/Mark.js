/**
 * Mark.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
    // Mark
    attributes: {
        year: {
            type: 'number',
        },
        mark: {
            type: 'number'
        },
        aspiration: {
            type: 'number'
        },
        note: {
            type: 'string'
        },
        major: {
            model: 'major'
        },
        school: {
            model : 'school'
        },
        subjectGroups: {
            type: 'json'
        }
        status: {
            type: 'string',
            defaultsTo: '1',
            required: true
        }
    },

};

