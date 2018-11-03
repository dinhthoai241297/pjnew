/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {

        //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
        //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
        //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝


        //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
        //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
        //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


        //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
        //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
        //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
        username: {
            type: 'string',
            required: true,
            unique: true
        },
        password: {
            type: 'string',
            required: true
        },
        email: {
            type: 'string',
            required: true

        },
        fullName: {
            type: 'string',
            required: true
        },
        // sex: {
        //     type: 'string',
        //     required: true
        // },
        //  birthday: {
        //     type: 'number',
        //     required: true
        // },
        // phonenumber: {
        //     type: 'number',
        //     unique: true
        // },
        // purpose: {
        //     model: 'subjectgroup',
        //     required: true
        // },
        // province: {
        //     model: 'province'
        // },
        // secret: {
        //     type: 'number',
        //     unique : true
        // },
        role: {
            model: 'role'
        },
        status: {
            model: 'status'
        }
      
    }
};

