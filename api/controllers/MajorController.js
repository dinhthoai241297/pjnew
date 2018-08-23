/**
 * MajorController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    // 415 invalid data
    // 200 success
    // 304 not modified
    // 404 not found data

    add: async (req, res) => {
        res.status(200);
        let code = 404, data = null, message = 'error';
        try {
            let major = JSON.parse(req.param('data'));
            let school = await School.findOne({ id: mark.school });
            if (school) {
                let s = await Major.create(major).fetch();
                if (s) {
                    code = 200;
                    message = 'success';
                    data = s;
                } else {
                    code = 304;
                }
            }
        } catch (error) {
            code = 415;
        }
        res.json({ code: code, message: message, data: data });
    },

    delete: async (req, res) => {
        res.status(200);
        let code = 404, data = null, message = 'error';
        let id = req.param('id');
        if (id) {
            let rs = await Major.destroy({ id: id }).fetch();
            if (rs && rs.length !== 0) {
                code = 200;
                message = 'success';
                data = rs;
            } else {
                code = 304;
            }
        }
        res.json({ code: code, message: message, data: data });
    },

    // t
    update: async (req, res) => {
        res.status(200);
        let code = 404, data = null, message = 'error';
        try {
            let major = JSON.parse(req.param('data'));
            let school = await School.findOne({ id: mark.school });
            if (school) {
                let s = await Major.update({id: school.id}, major).fetch();
                if (s) {
                    code = 200;
                    message = 'success';
                    data = s;
                } else {
                    code = 304;
                }
            }
        } catch (error) {
            code = 415;
        }
        res.json({ code: code, message: message, data: data });
    },

    // /major/getall/:page
    getAll: async (req, res) => {
        res.status(200);
        let code = 200, data = null, message = 'success', page = req.param('page') || 1;
        let list = await Major.find().limit(11).skip((page - 1) * 10);
        if (list.length > 10) {
            data = {
                list: list.splice(0, 10),
                next: true
            }
        } else {
            data = {
                list: list,
                next: false
            }
        }
        res.json({ code: code, message: message, data: data });
    },

    // /major/getone/:id
    getOne: async (req, res) => {
        res.status(200);
        let code = 404, data = null, message = 'error', id = req.param('id') || -1;
        let major = await Major.findOne({ id: id });
        if (major) {
            code = 200;
            data = major;
            message = 'success';
        }
        return res.json({code: code, message: message, data: data});
    }

};

