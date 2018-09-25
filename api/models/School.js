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
            type: 'string',
            required: true
        },
        code: {
            type: 'string',
            unique: true,
            required: true
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
        },
        image: {
            type: 'string'
        }
        status: {
            type: 'string',
            defaultsTo: '1',
            required: true
        }
    },

    beforeDestroy: (criteria, proceed) => {
        School.find(criteria).populate('majors').exec((err, rs) => {
            if (err) {
                return proceed(err);
            }
            rs.forEach(school => {
                school.majors.forEach(async el => {
                    await Major.destroy({id: el.id});
                });
            });
            return proceed();
        });
    }

};

