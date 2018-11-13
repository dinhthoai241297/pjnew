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

    // t

    // /mark/getall/:page
    getList: async (req, res) => {
        res.status(200);
        let code = 200, message = 'success', data = undefined;
        let { school } = req.param('data');
        let { year } = req.param('data');
        let list = await Mark.find({ year: year, school: school }).populate('major');
        if (list) {
            code = 200;
            message = 'success';
        }
        return res.json({ code, message, list });

    },


};

