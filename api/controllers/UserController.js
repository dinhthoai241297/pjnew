/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    // 801 dữ liệu gửi lên không hợp lệ
    // 802 có lỗi xảy ra, không có gì được thay đổi
    // 803 không tìm thấy dữ liệu trong database

    add: async (req, res) => {
        res.status(200);
        let code = 803, message = 'error';
        try {
            let user = JSON.parse(req.param('data'));
            let s = await User.create(user).fetch();
            if (s) {
                code = 200;
                message = 'success';
            } else {
                code = 802;
            }
        } catch (error) {
            code = 801;
        }
        return res.json({ code, message });
    },

    delete: async (req, res) => {
        res.status(200);
        let code = 801, message = 'error', id = req.param('id');
        if (id) {
            let rs = await User.destroy({ id: id }).fetch();
            if (rs && rs.length !== 0) {
                code = 200;
                message = 'success';
            } else {
                code = 802;
            }
        }
        return res.json({ code, message });
    },

    // t
    update: async (req, res) => {
        res.status(200);
        let code = 803, message = 'error';
        try {
            let user = JSON.parse(req.param('data'));
            let u = await User.update({ id: user.id }, user).fetch();
            if (u) {
                code = 200;
                message = 'success';
            } else {
                code = 802;
            }
        } catch (error) {
            code = 801;
        }
        return res.json({ code, message });
    },

    // /major/getall/:page
    getAll: async (req, res) => {
        res.status(200);
        let code = 200, message = 'success', data = undefined, page = req.param('page') || 1;
        let list = await User.find().limit(11).skip((page - 1) * 10);
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

    // /major/getone/:id
    getOne: async (req, res) => {
        res.status(200);
        let code = 803, message = 'error', data = undefined, id = req.param('id') || -1;
        data = await User.findOne({ id: id });
        if (data) {
            code = 200;
            message = 'success';
        }
        return res.json({ code, message, data });
    },

    // login
    login: async (req, res) => {
        res.status(200);
        let code = 803, message = 'error', data = undefined;
        try {
            let { username, password } = JSON.parse(req.param('data'));
            data = await User.findOne({ username: username, password: password });
            if (data) {
                let role = await Role.findOne({ id: data.role });
                if (role) {
                    data.roles = JSON.parse(role.roles);
                    code = 200;
                    message = 'success';
                } else {
                    code = 803;
                    message = 'error';
                }
            }
        } catch (error) {
            code = 801;
        }
        return res.json({ code, message, data });
    }

    editStatus: async (req, res) => {
        res.status(200);
        let code = 803, message = 'error';
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
                    code = 802;
                }
            }
        }
        catch (error){
            code = 801;
        }
        return res.json({ code, message });
    }
};

