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


    //school/get/id
    getId: async (req, res) => {
        res.status(200);
        let code = 303, message = 'error', data = undefined, { id } = req.param('data');
        data = await School.findOne({ id: id }).populate('province');
        if (data) {
            code = 200;
            message = 'success';
        }
        return res.json({ code, message, data });
    },


    // /school/search
    search: async (req, res) => {
        res.status(200);
        let code = 303, message = 'error', data = undefined, { name, page = 1 } = req.param('data');
        try {
            console.log(name, page);
            let criteria = {};
            if (name) {
                criteria.or = [{ name: { 'contains': name } }, { code: { 'contains': name } }];
            }
            list = await School.find().where(criteria).populate('province').sort([{ name: 'ASC' }]).limit(11).skip((page - 1) * 10);
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
            code = 200;
            message = 'success';
        } catch (error) {
            code = 301;
        }
        return res.json({ code, message, data });
    },
};

