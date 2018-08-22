/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'pages/homepage'
  },

  'POST /major/add' : 'major.add',
  'POST /major/delete/:id' : 'major.delete',
  'POST /major/update' : 'major.update',
  'POST /major/getall/:page' : 'major.getAll',
  'POST /major/getOne/:id' : 'major.getOne',

  'POST /mark/add' : 'mark.add',
  'POST /mark/delete/:id' : 'mark.delete',
  'POST /mark/update' : 'mark.update',
  'POST /mark/getall/:page' : 'mark.getAll',
  'POST /mark/getOne/:id' : 'mark.getOne',

  'POST /province/add' : 'province.add',
  'POST /province/delete/:id' : 'province.delete',
  'POST /province/update' : 'province.update',
  'POST /province/getall/:page' : 'province.getAll',
  'POST /province/getOne/:id' : 'province.getOne',

  'POST /school/add' : 'school.add',
  'POST /school/delete/:id' : 'school.delete',
  'POST /school/update' : 'school.update',
  'POST /school/getall/:page' : 'school.getAll',
  'POST /school/getOne/:id' : 'school.getOne',

  'POST /sector/add' : 'sector.add',
  'POST /sector/delete/:id' : 'sector.delete',
  'POST /sector/update' : 'sector.update',
  'POST /sector/getall/:page' : 'sector.getAll',
  'POST /sector/getOne/:id' : 'sector.getOne',

  'POST /subject/add' : 'subject.add',
  'POST /subject/delete/:id' : 'subject.delete',
  'POST /subject/update' : 'subject.update',
  'POST /subject/getall/:page' : 'subject.getAll',
  'POST /subject/getOne/:id' : 'subject.getOne',

  'POST /subjectgroup/add' : 'subjectGroup.add',
  'POST /subjectgroup/delete/:id' : 'subjectGroup.delete',
  'POST /subjectgroup/update' : 'subjectGroup.update',
  'POST /subjectgroup/getall/:page' : 'subjectGroup.getAll',
  'POST /subjectgroup/getOne/:id' : 'subjectGroup.getOne'

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝



  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝


  //  ╔╦╗╦╔═╗╔═╗
  //  ║║║║╚═╗║
  //  ╩ ╩╩╚═╝╚═╝


};
