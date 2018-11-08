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
<<<<<<< HEAD
            type: 'string'
            
           
=======
            type: 'string',
            unique: true
>>>>>>> 4272fb9b949bfa69241ccb9540408c7bbad3cf3c
        },
        password: {
            type: 'string',
            required: true
        },
        email: {
<<<<<<< HEAD
            type: 'string'
          
            
=======
            type: 'string',
            required: true,
            unique: true
>>>>>>> 4272fb9b949bfa69241ccb9540408c7bbad3cf3c
        },
        fullName: {
            type: 'string',
            required: true,
        },
        sex: {
            type: 'string',
            required: true
        },
<<<<<<< HEAD
         birthday: {
            type: 'ref',
            columnType:'datetime',
=======
        birthday: {
            type: 'ref',
            columnType: 'datetime',
>>>>>>> 4272fb9b949bfa69241ccb9540408c7bbad3cf3c
            required: true
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

