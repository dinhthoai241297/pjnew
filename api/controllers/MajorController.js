/**
 * MajorController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    // 01 dữ liệu gửi lên không hợp lệ
    // 02 có lỗi xảy ra, không có gì được thay đổi
    // 03 không tìm thấy dữ liệu trong database

    add: async (req, res) => {
        res.status(200);
        let code = 03, message = 'error';
        try {
            let major = JSON.parse(req.param('data'));
            let school = await School.findOne({ id: major.school });
            if (school) {
                let s = await Major.create(major).fetch();
                if (s) {
                    code = 200;
                    message = 'success';
                } else {
                    code = 02;
                }
            }
        } catch (error) {
            code = 01;
        }
        res.json({ code: code, message: message });
    },

    delete: async (req, res) => {
        res.status(200);
        let code = 03, message = 'error';
        let id = req.param('id');
        if (id) {
            let rs = await Major.destroy({ id: id }).fetch();
            if (rs && rs.length !== 0) {
                code = 200;
                message = 'success';
            } else {
                code = 02;
            }
        }
        res.json({ code: code, message: message });
    },

    // t
    update: async (req, res) => {
        res.status(200);
        let code = 03, message = 'error';
        try {
            let major = JSON.parse(req.param('data'));
            let school = await School.findOne({ id: major.school });
            if (school) {
                let s = await Major.update({ id: major.id }, major).fetch();
                if (s) {
                    code = 200;
                    message = 'success';
                } else {
                    code = 02;
                }
            }
        } catch (error) {
            code = 01;
        }
        res.json({ code: code, message: message });
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
                list,
                next: false
            }
        }
        res.json({ code, message, data });
    },

    // /major/getone/:id
    getOne: async (req, res) => {
        res.status(200);
        let rs = {
            code: 03,
            message: 'error'
        }
        let id = req.param('id') || -1;
        let major = await Major.findOne({ id: id });
        if (major) {
            rs.code = 200;
            rs.message = 'success';
            rs.data = major
        }
        return res.json(rs);
    },

    // get all major with id school
    getAllInSchool: async (req, res) => {
        res.status(200);
        let code = 200, data = null, message = 'success', school = req.param('school') || '';
        let list = await Major.find({school : school});
        data = {
            list,
            next: false
        }
        return res.json({ code, message, data });
    }

    editStatus: async (req, res) => {
        res.status(200);
        let code = 03, message = 'error';
        let status = req.param('status');
        try {
            let major = JSON.parse(req.param('data'));
            let status = await Major.findOne({status: major.status})
            if(status) {
                let s = await Major.update({ status: major.status }, major).fetch();
                if (s) {
                    code = 200;
                    message = 'success';
                } else {
                    code = 02;
                }
            }
        }
        catch (error){
            code = 01;
        }
        return res.json({ code, message });
    }
};

