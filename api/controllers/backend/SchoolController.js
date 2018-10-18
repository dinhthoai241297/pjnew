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

   
    // /school/getall/:page
    getAll: async (req, res) => {
        res.status(200);
        let code = 200, message = 'success', data = undefined, { page } = req.param('data') || 1;
        let {province} = req.param('data');
        let list = await School.find({province :province}).sort([{name :'ASC'}]).limit(11).skip((page - 1) * 10).populate('province');
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
   
    // /school/getone/:code
    getOneCode: async (req, res) => {
        res.status(200);
        let code = 303, message = 'error', data = undefined, { codesc } = req.param('data') || 1;
        data = await School.findOne({ code: codesc });
        if (data) {
            code = 200;
            message = 'success';
        }
        return res.json({ code, message, data });
    },

    // /school/getone/:name
    getOneName: async (req, res) => {
        res.status(200);
        let code = 303, message = 'error', data = undefined, { name } = req.param('data') || 1;
        data = await School.findOne({ name: name });
        if (data) {
            code = 200;
            message = 'success';
        }
        return res.json({ code, message, data });
    },


};

