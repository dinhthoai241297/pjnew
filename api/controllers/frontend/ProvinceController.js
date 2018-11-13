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


    // /province/getall/:page
    getAll: async (req, res) => {
        res.status(200);
        let code = 200, message = 'success';
        let list = await Province.find().sort([{ name: 'ASC' }]);
        if (list) {
            code = 200;
            message = 'success';
        }
        return res.json({ code, message, list });
    },

    // /province/getone/:id
    getOne: async (req, res) => {
        res.status(200);
        let code = 103, message = 'error', data = undefined, { id = '' } = req.param('data');
        data = await Province.findOne({ id: id });
        if (data) {
            code = 200;
            message = 'success';
        }
        return res.json({ code, message, data });
    }
};

