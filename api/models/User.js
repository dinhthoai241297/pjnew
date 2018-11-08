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
            type: 'string'
            
        },
        password: {
            type: 'string',
            required: true
        },
        email: {

            type: 'string'

        },
        fullName: {
            type: 'string',
            required: true,
        },
        sex: {
            type: 'string',
            required: true
        },

        birthday: {
            type: 'ref',
            columnType:'datetime',

        },
        phonenumber: {
            type: 'number',
            unique: true
        },
        purpose: {
            model: 'subjectgroup',
            required: true
        },
        province: {
            model: 'province'
        },
        role: {
            model: 'role'
        },
        status: {
            model: 'status'
        },
    }
};

