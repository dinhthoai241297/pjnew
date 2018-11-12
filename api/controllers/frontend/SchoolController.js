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
        data = await School.findOne({ id: id });
        if (data) {
            code = 200;
            message = 'success';
        }
        return res.json({ code, message, data });
    },
    
   
    // /school/search
    search: async (req, res) => {
        res.status(200);
        let code = 303, message = 'error', data = undefined, { name } = req.param('data') || 1;
        list = await School.find().where({ or: [ {name: {contains :name}}, {code: {contains : name}}]}).sort([{name :'ASC'}]).limit(11).skip((page - 1) * 10);
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
};

