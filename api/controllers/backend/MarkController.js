/**
 * MarkController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    // 101 dữ liệu gửi lên không hợp lệ
    // 102 có lỗi xảy ra, không có gì được thay đổi
    // 103 không tìm thấy dữ liệu trong database

   
    // /mark/getall/:page
    getAll: async (req, res) => {
        res.status(200);
        let code = 200, message = 'success', data = undefined, { page } = req.param('data') || 1;
        let {school} = req.param ('data');
        let {major}  = req.param('data');
        let {year} = req.param('data');
        let list = await Mark.find({school : school, major :major, year:year}).sort([{mark:'DESC' }]).limit(11).skip((page - 1) * 10).populate('major').populate('school');
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
        let tmp;
        for (let i = 0; i < data.list.length; i++) {
            tmp = await SubjectGroup.find({
                id: {
                    in: JSON.parse(data.list[i].subjectGroups)
                }
            });
            data.list[i].subjectGroups = tmp;
        }
        return res.json({ code, message, data });
    },

    // /mark/getone/:year
    getOne: async (req, res) => {
        res.status(200);
        let code = 103, message = 'error', data = undefined, { year } = req.param('data') || 1;
        data = await Mark.findOne({ year : year });
        if (data) {
            code = 200;
            message = 'success';
        }
        return res.json({ code, message, data });
    },
// /mark/getone/:id
    getOne: async (req, res) => {
        res.status(200);
        let code = 103, message = 'error', data = undefined, { id } = req.param('data') || 1;
        data = await Mark.findOne({ id: id });
        if (data) {
            code = 200;
            message = 'success';
        }
        return res.json({ code, message, data });
    },
    // /mark/getone/:id
    getOne: async (req, res) => {
        res.status(200);
        let code = 103, message = 'error', data = undefined, { id } = req.param('data') || 1;
        data = await Mark.findOne({ id: id });
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
            let s = await Mark.update({ id }).set({ status }).fetch();
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

