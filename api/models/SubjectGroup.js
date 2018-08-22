/**
 * SubjectGroup.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
    // SubjectGroup
    attributes: {
        name: {
            type: 'string',
            unique: true,
            required: true
        },
        description: {
            type: 'string'
        },
        subjects: {
            type: 'json'
        }
    }

};

