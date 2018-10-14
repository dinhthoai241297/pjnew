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

    'sector/getall': 'canView',
    'major/getall': 'canView',
    'mark/getall': 'canView',
    'status/getall': 'canView',
    'province/getall': 'canView',
    'school/getall': 'canView',
    'subject/getall': 'canView',
    'subjectgroup/getall': 'canView',

    'sector/getone': 'canUpdate',
    'major/getone': 'canUpdate',
    'mark/getone': 'canUpdate',
    'status/getone': 'canUpdate',
    'province/getone': 'canUpdate',
    'school/getone': 'canUpdate',
    'subject/getone': 'canUpdate',
    'subjectgroup/getone': 'canUpdate',

    'sector/add': 'canAdd',
    'major/add': 'canAdd',
    'mark/add': 'canAdd',
    'status/add': 'canAdd',
    'province/add': 'canAdd',
    'school/add': 'canAdd',
    'subject/add': 'canAdd',
    'subjectgroup/add': 'canAdd',

    'sector/update': 'canUpdate',
    'major/update': 'canUpdate',
    'mark/update': 'canUpdate',
    'status/update': 'canUpdate',
    'province/update': 'canUpdate',
    'school/update': 'canUpdate',
    'subject/update': 'canUpdate',
    'subjectgroup/update': 'canUpdate',

    'sector/updatestatus': 'canDelete',
    'major/updatestatus': 'canDelete',
    'mark/updatestatus': 'canDelete',
    'province/updatestatus': 'canDelete',
    'school/updatestatus': 'canDelete',
    'subject/updatestatus': 'canDelete',
    'subjectgroup/updatestatus': 'canDelete',

    'sector/delete': 'isRoot',
    'major/delete': 'isRoot',
    'mark/delete': 'isRoot',
    'status/delete': 'isRoot',
    'province/delete': 'isRoot',
    'school/delete': 'isRoot',
    'subject/delete': 'isRoot',
    'subjectgroup/delete': 'isRoot',

    'role/*': 'isRoot',
    'user/*': 'isRoot',

    'user/login': true,
    'user/logout': true,
    // 'school/getall': true,
    // 'school/getonecode': true,
    // 'school/getonename': true,
};
