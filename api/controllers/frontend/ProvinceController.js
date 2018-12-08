/**
 * ProvinceController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    // 1201 dữ liệu gửi lên không hợp lệ -  Message : The submitted data is invalid
    // 1202 có lỗi xảy ra, không có gì được thay đổi - Message : The submitted data is invalid
    // 1203 không tìm thấy dữ liệu trong database -   Data not found in the database



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
        let code = 1203, message = 'error', data = undefined, { id = '' } = req.param('data');
        data = await Province.findOne({ id: id });
        if (data) {
            code = 200;
            message = 'success';
        }
        return res.json({ code, message, data });
    }
};

