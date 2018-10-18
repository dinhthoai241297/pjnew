/**
 * ProvinceController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    // 201 dữ liệu gửi lên không hợp lệ
    // 202 có lỗi xảy ra, không có gì được thay đổi
    // 203 không tìm thấy dữ liệu trong database

    add: async (req, res) => {
        res.status(200);
        let code = 103, message = 'error';
        try {
            let { province } = req.param('data');
            let sector = await Sector.findOne({ id: province.sector });
            if (sector) {
                let s = await Province.create(province).fetch();
                if (s) {
                    code = 200;
                    message = 'succes';
                } else {
                    code = 202;
                }
            }
        } catch (error) {
            code = 201;
        }
        return res.json({ code, message });
    },

    delete: async (req, res) => {
        res.status(200);
        let code = 201, message = 'error', { id } = req.param('data');
        if (id) {
            let rs = await Province.destroy({ id: id }).fetch();
            if (rs && rs.length !== 0) {
                code = 200;
                message = 'success';
            } else {
                code = 202;
            }
        }
        return res.json({ code, message });
    },

    // t
    update: async (req, res) => {
        res.status(200);
        let code = 103, message = 'error';
        try {
            let { province } = req.param('data');
            let sector = await Sector.findOne({ id: province.sector });
            if (sector) {
                let s = await Province.update({ id: province.id }, province).fetch();
                if (s) {
                    code = 200;
                    message = 'succes';
                } else {
                    code = 202;
                }
            }
        } catch (error) {
            code = 201;
        }
        return res.json({ code, message });
    },

    // /province/getall/:page
    getAll: async (req, res) => {
        res.status(200);
        let code = 200, message = 'success', data = undefined, { page } = req.param('data') || 1;
        let {status} = req.param('data');
        let {sector} = req.param('data');
        let list = await Province.find({status: status, sector: sector}).sort([{name :'ASC'}]).limit(11).skip((page - 1) * 10).populate('sector').populate('status');
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

    // /province/getone/:id
    getOne: async (req, res) => {
        res.status(200);
        let code = 103, message = 'error', data = undefined, { id } = req.param('data') || 1;
        data = await Province.findOne({ id: id });
        if (data) {
            code = 200;
            message = 'success';
        }
        return res.json({ code, message, data });
    },

    updateStatus: async (req, res) => {
        res.status(200);
        let code = 403, message = 'error';
        try {
            let { id, status } = req.param('data');
            let s = await Province.update({ id }).set({ status }).fetch();
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
    }

};

