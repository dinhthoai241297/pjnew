/**
 * Major.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
    // Major
    attributes: {
        name: {
            type: 'string'
        },
        code: {
            type: 'string'
        },
        school: {
            model: 'school'
        },
        marks: {
            collection: 'mark',
            via: 'major'
        }
        status: {
            type: 'string',
            defaultsTo: '1',
            required: true
        }
    },

    beforeDestroy: (criteria, proceed) => {
        Major.find(criteria).populate('marks').exec((err, rs) => {
            if (err) {
                return proceed(err);
            }
            rs.forEach(major => {
                major.marks.forEach(async el => {
                    await Mark.destroy({id: el.id});
                });
            });
            return proceed();
        });
    }

};

