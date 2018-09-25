/**
 * SchoolController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    // 301 dữ liệu gửi lên không hợp lệ
    // 302 có lỗi xảy ra, không có gì được thay đổi
    // 303 không tìm thấy dữ liệu trong database

    add: async (req, res) => {
        res.status(200);
        let code = 303, message = 'error';
        try {
            let school = JSON.parse(req.param('data'));
            let province = await Province.findOne({ id: school.province });
            if (province) {
                let s = await School.create(school).fetch();
                if (s) {
                    code = 200;
                    message = 'success';
                } else {
                    code = 302;
                }
            }
        } catch (error) {
            code = 301;
        }
        return res.json({ code, message });
    },

    delete: async (req, res) => {
        res.status(200);
        let code = 301, message = 'error';
        let id = req.param('id');
        if (id) {
            let rs = await School.destroy({ id: id }).fetch();
            if (rs && rs.length !== 0) {
                code = 200;
                message = 'success';
            } else {
                code = 302;
            }
        }
        return res.json({ code, message });
    },

    // t
    update: async (req, res) => {
        res.status(200);
        let code = 303, message = 'error';
        try {
            let school = JSON.parse(req.param('data'));
            let province = await Province.findOne({ id: school.province });
            if (province) {
                let s = await School.update({ id: school.id }, school).fetch();
                if (s) {
                    code = 200;
                    message = 'success';
                } else {
                    code = 302;
                }
            }
        } catch (error) {
            code = 301;
        }
        return res.json({ code, message });
    },

    // /school/getall/:page
    getAll: async (req, res) => {
        res.status(200);
        let code = 200, message = 'success', data = undefined, page = req.param('page') || 1;
        let list = await School.find().limit(11).skip((page - 1) * 10);
        if (list.length > 10) {
            data = {
                list: list.slice(0, 10),
                next: true
            }
        } else {
            data = {
                list,
                next: false
            }
        }
        return res.json({ code, message, data });
    },

    // /school/getone/:id
    getOne: async (req, res) => {
        res.status(200);
        let code = 303, message = 'error', data = undefined, id = req.param('id') || 1;
        data = await School.findOne({ id: id });
        if (data) {
            code = 200;
            message = 'success';
        }
        return res.json({ code, message, data });
    }

    editStatus: async (req, res) => {
        res.status(200);
        let code = 303, message = 'error';
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
                    code = 302;
                }
            }
        }
        catch (error){
            code = 301;
        }
        return res.json({ code, message });
    }

};

