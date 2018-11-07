/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

    /***************************************************************************
    *                                                                          *
    * Default policy for all controllers and actions, unless overridden.       *
    * (`true` allows public access)                                            *
    *                                                                          *
    ***************************************************************************/

    // '*': true,
    '*': 'isLoggedIn',
    //ADMIN
    'admin/sector/getall': 'canView',
    'admin/major/getall': 'canView',
    'admin/mark/getall': 'canView',
    'admin/status/getall': 'canView',
    'admin/province/getall': 'canView',
    'admin/school/getall': 'canView',
    'admin/subject/getall': 'canView',
    'admin/subjectgroup/getall': 'canView',
    

    'admin/sector/getone': 'canUpdate',
    'admin/major/getone': 'canUpdate',
    'admin/mark/getone': 'canUpdate',
    'admin/status/getone': 'canUpdate',
    'admin/province/getone': 'canUpdate',
    'admin/school/getone': 'canUpdate',
    'admin/subject/getone': 'canUpdate',
    'admin/subjectgroup/getone': 'canUpdate',

    'admin/sector/add': 'canAdd',
    'admin/major/add': 'canAdd',
    'admin/mark/add': 'canAdd',
    'admin/status/add': 'canAdd',
    'admin/province/add': 'canAdd',
    'admin/school/add': 'canAdd',
    'admin/subject/add': 'canAdd',
    'admin/subjectgroup/add': 'canAdd',

    'admin/sector/update': 'canUpdate',
    'admin/major/update': 'canUpdate',
    'admin/mark/update': 'canUpdate',
    'admin/status/update': 'canUpdate',
    'admin/province/update': 'canUpdate',
    'admin/school/update': 'canUpdate',
    'admin/subject/update': 'canUpdate',
    'admin/subjectgroup/update': 'canUpdate',

    'admin/sector/updatestatus': 'canDelete',
    'admin/major/updatestatus': 'canDelete',
    'admin/mark/updatestatus': 'canDelete',
    'admin/province/updatestatus': 'canDelete',
    'admin/school/updatestatus': 'canDelete',
    'admin/subject/updatestatus': 'canDelete',
    'admin/subjectgroup/updatestatus': 'canDelete',

    'admin/sector/delete': 'isRoot',
    'admin/major/delete': 'isRoot',
    'admin/mark/delete': 'isRoot',
    'admin/status/delete': 'isRoot',
    'admin/province/delete': 'isRoot',
    'admin/school/delete': 'isRoot',
    'admin/subject/delete': 'isRoot',
    'admin/subjectgroup/delete': 'isRoot',

    'admin/role/*': 'isRoot',
    'user/*': 'isRoot',

    'user/loginadmin': true,
    'user/loginuser': true,
    'user/logout': true,
    'user/register': true,
    'admin/sector/getall': true,
    'admin/major/getall': true,
    'admin/mark/getall': true,
    'admin/status/getall': true,
    'admin/province/getall': true,
    'admin/school/getall': true,
    'admin/subject/getall': true,
    'admin/subjectgroup/getall': true,





   //BACKEND
    'backend/province/getall': true,
    'backend/province/getone':  true,
  
    'backend/school/getall': true,
    'backend/school/getonecode': true,
    'backend/school/getonename': true, 
};
