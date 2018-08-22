/**
 * School.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
    // School
    attributes: {
        name: {
            type: 'string'
        },
        code: {
            type: 'string'
        },
        description: {
            type: 'string'
        },
        province: {
            model: 'province'
        },
        majors: {
            collection: 'major',
            via: 'school'
        },
        mark: {
            collection: 'mark',
            via: 'school'
        }
    },

};

