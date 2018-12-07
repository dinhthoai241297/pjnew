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

    '/test': {
        view: 'test'
    },

    //ADMIN
    'POST /admin/major/add': 'admin.major.add',
    'POST /admin/major/delete': 'admin.major.delete',
    'POST /admin/major/update': 'admin.major.update',
    'POST /admin/major/getall': 'admin.major.getAll',
    'POST /admin/major/getone': 'admin.major.getOne',
    'POST /admin/major/getallinschool': 'admin.major.getAllInSchool',
    'POST /admin/major/updatestatus': 'admin.major.updateStatus',

    'POST /admin/mark/add': 'admin.mark.add',
    'POST /admin/mark/delete': 'admin.mark.delete',
    'POST /admin/mark/update': 'admin.mark.update',
    'POST /admin/mark/getall': 'admin.mark.getAll',
    'POST /admin/mark/getone': 'admin.mark.getOne',
    'POST /admin/mark/updatestatus': 'admin.mark.updateStatus',

    'POST /admin/new/add': 'admin.new.add',
    'POST /admin/new/delete': 'admin.new.delete',
    'POST /admin/new/update': 'admin.new.update',
    'POST /admin/new/getall': 'admin.new.getAll',
    'POST /admin/new/getone': 'admin.new.getOne',
    'POST /admin/new/updatestatus': 'admin.new.updateStatus',

    'POST /admin/province/add': 'admin.province.add',
    'POST /admin/province/delete': 'admin.province.delete',
    'POST /admin/province/update': 'admin.province.update',
    'POST /admin/province/getall': 'admin.province.getAll',
    'POST /admin/province/getone': 'admin.province.getOne',
    'POST /admin/province/updatestatus': 'admin.province.updateStatus',

    'POST /admin/school/add': 'admin.school.add',
    'POST /admin/school/delete': 'admin.school.delete',
    'POST /admin/school/update': 'admin.school.update',
    'POST /admin/school/getall': 'admin.school.getAll',
    'POST /admin/school/getone': 'admin.school.getOne',
    'POST /admin/school/updatestatus': 'admin.school.updateStatus',

    'POST /admin/sector/add': 'admin.sector.add',
    'POST /admin/sector/delete': 'admin.sector.delete',
    'POST /admin/sector/update': 'admin.sector.update',
    'POST /admin/sector/getall': 'admin.sector.getAll',
    'POST /admin/sector/getone': 'admin.sector.getOne',
    'POST /admin/sector/updatestatus': 'admin.sector.updateStatus',

    'POST /admin/subject/add': 'admin.subject.add',
    'POST /admin/subject/delete': 'admin.subject.delete',
    'POST /admin/subject/update': 'admin.subject.update',
    'POST /admin/subject/getall': 'admin.subject.getAll',
    'POST /admin/subject/getone': 'admin.subject.getOne',
    'POST /admin/subject/updatestatus': 'admin.subject.updateStatus',

    'POST /admin/subjectgroup/add': 'admin.subjectGroup.add',
    'POST /admin/subjectgroup/delete': 'admin.subjectGroup.delete',
    'POST /admin/subjectgroup/update': 'admin.subjectGroup.update',
    'POST /admin/subjectgroup/getall': 'admin.subjectGroup.getAll',
    'POST /admin/subjectgroup/getone': 'admin.subjectGroup.getOne',
    'POST /admin/subjectgroup/updatestatus': 'admin.subjectgroup.updateStatus',

    'POST /user/add': 'user.add',
    'POST /user/delete': 'user.delete',
    'POST /user/update': 'user.update',
    'POST /user/getall': 'user.getAll',
    'POST /user/getone': 'user.getOne',
    'POST /user/register': 'user.register',
    'POST /user/logout': 'frontend.user.logout',
    'POST /user/login': 'frontend.user.login',
    'POST /user/loginsession': 'frontend.user.loginSession',
    'POST /user/loginadmin': 'user.loginAdmin',
    'POST /user/updatestatus': 'user.updateStatus',
    'POST /user/checksession': 'user.checkSession',
    'POST /user/getkey': 'user.getKey',
    'POST /user/resetpass': 'user.resetPass',
    'POST /user/updateprofile': 'user.updateprofile',

    'POST /admin/role/add': 'admin.role.add',
    'POST /admin/role/delete': 'admin.role.delete',
    'POST /admin/role/update': 'admin.role.update',
    'POST /admin/role/getall': 'admin.role.getAll',
    'POST /admin/role/getone': 'admin.role.getOne',
    'POST /admin/role/updatestatus': 'admin.role.updateStatus',

    'POST /admin/status/add': 'admin.status.add',
    'POST /admin/status/delete': 'admin.status.delete',
    'POST /admin/status/update': 'admin.status.update',
    'POST /admin/status/getall': 'admin.status.getAll',
    'POST /admin/status/getone': 'admin.status.getOne',

    'POST /admin/media/upload': 'admin.media.upload',
    'POST /admin/media/getlist': 'admin.media.getList',
    'POST /admin/media/updatestatus': 'admin.media.updateStatus',

    //upload image
    'POST /admin/image/upload': 'admin.image.upload',

    //FRONTEND

    //province
    'POST /frontend/province/getall': 'frontend.province.getAll',
    'POST /frontend/province/getone': 'frontend.province.getOne',

    //subjectGroup
    'POST /frontend/subjectgroup/getall': 'frontend.subjectGroup.getAll',

    //school
    'POST /frontend/school/getid': 'frontend.school.getId',
    'POST /frontend/school/search': 'frontend.school.search',
    'POST /frontend/school/getlist': 'frontend.school.getList',

    //mark
    'POST /frontend/mark/getlist': 'frontend.mark.getList',

    // News
    'POST /frontend/new/getall': 'frontend.new.getAll',
    'POST /frontend/new/getone': 'frontend.new.getOne',
    'POST /frontend/new/search': 'frontend.new.search',

};
