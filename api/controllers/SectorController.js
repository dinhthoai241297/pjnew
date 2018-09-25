/**
 * SectorController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    // 401 dữ liệu gửi lên không hợp lệ
    // 402 có lỗi xảy ra, không có gì được thay đổi
    // 403 không tìm thấy dữ liệu trong database

    add: async (req, res) => {
        res.status(200);
        let code = 403, message = 'error';
        try {
            let sector = JSON.parse(req.param('data'));
            let s = await Sector.create(sector).fetch();
            if (s) {
                code = 200;
                message = 'success';
            } else {
                code = 402;
            }
        } catch (error) {
            code = 401;
        }
        return res.json({ code, message });
    },

    delete: async (req, res) => {
        res.status(200);
        let code = 401, message = 'error', id = req.param('id');
        if (id) {
            let rs = await Sector.destroy({ id: id }).fetch();
            if (rs && rs.length !== 0) {
                code = 200;
                message = 'success';
            } else {
                code = 402;
            }
        }
        return res.json({ code, message });
    },

    // t
    update: async (req, res) => {
        res.status(200);
        let code = 403, message = 'error';
        try {
            let sector = JSON.parse(req.param('data'));
            let s = await Sector.update({ id: sector.id }, sector).fetch();
            if (s) {
                code = 200;
                message = 'success';
            } else {
                code = 402;
            }
        } catch (error) {
            code = 401;
        }
        return res.json({ code, message });
    },

    // /major/getall/:page
    getAll: async (req, res) => {
        res.status(200);
        let code = 200, message = 'success', data = undefined, page = req.param('page') || 1;
        let list = await Sector.find().limit(11).skip((page - 1) * 10);
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
        let code = 403, message = 'error', data = undefined, id = req.param('id') || 1;
        data = await Sector.findOne({ id: id });
        if (data) {
            code = 200;
            message = 'success';
        }
        return res.json({ code, message, data });
    }

    editStatus: async (req, res) => {
        res.status(200);
        let code = 403, message = 'error';
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
                    code = 402;
                }
            }
        }
        catch (error){
            code = 401;
        }
        return res.json({ code, message });
    }

};

