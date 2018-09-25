/**
 * RoleController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    // 701 dữ liệu gửi lên không hợp lệ
    // 702 có lỗi xảy ra, không có gì được thay đổi
    // 703 không tìm thấy dữ liệu trong database

    add: async (req, res) => {
        res.status(200);
        let code = 703, message = 'error';
        try {
            let role = JSON.parse(req.param('data'));
            role.roles = JSON.stringify(role.roles);
            let s = await Role.create(role).fetch();
            if (s) {
                code = 200;
                message = 'success';
            } else {
                code = 702;
            }
        } catch (error) {
            code = 701;
        }
        return res.json({ code, message });
    },

    delete: async (req, res) => {
        res.status(200);
        let code = 701, message = 'error', id = req.param('id');
        if (id) {
            let rs = await Role.destroy({ id: id }).fetch();
            if (rs && rs.length !== 0) {
                code = 200;
                message = 'success';
            } else {
                code = 702;
            }
        }
        return res.json({ code, message });
    },

    // t
    update: async (req, res) => {
        res.status(200);
        let code = 703, message = 'error';
        try {
            let role = JSON.parse(req.param('data'));
            role.roles = JSON.stringify(role.roles);
            let r = await Role.update({ id: role.id }, role).fetch();
            if (r) {
                code = 200;
                message = 'success';
            } else {
                code = 702;
            }
        } catch (error) {
            code = 701;
        }
        return res.json({ code, message });
    },

    // /major/getall/:page
    getAll: async (req, res) => {
        res.status(200);
        let code = 200, message = 'success', data = undefined, page = req.param('page') || 1;
        let list = await Role.find();
        data = {
            list, next: false
        }
        return res.json({ code, message, data });
    },

    // /major/getone/:id
    getOne: async (req, res) => {
        res.status(200);
        let code = 703, message = 'error', data = undefined, id = req.param('id') || -1;
        data = await Role.findOne({ id: id });
        if (data) {
            code = 200;
            message = 'success';
        }
        return res.json({ code, message, data });
    }

    editStatus: async (req, res) => {
        res.status(200);
        let code = 703, message = 'error';
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
                    code = 702;
                }
            }
        }
        catch (error){
            code = 701;
        }
        return res.json({ code, message });
    }

};

