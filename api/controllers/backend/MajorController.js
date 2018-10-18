/**
 * MajorController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    // 01 dữ liệu gửi lên không hợp lệ
    // 02 có lỗi xảy ra, không có gì được thay đổi
    // 03 không tìm thấy dữ liệu trong database

    
    //major/getall/:page
    getAll: async (req, res) => {
        res.status(200);
        let code = 200, data = null, message = 'success', { page } = req.param('data') || 1;
        let { school } = req.param('data');
        let list = await Major.find({school :school}).sort([{name: 'ASC'}]).limit(11).skip((page - 1) * 10).populate('school');
        if (list.length > 10) {
            data = {
                list: list.splice(0, 10),
                next: true
            }
        } else {
            data = {
                list,
                next: false
            }
        }
        res.json({ code, message, data });
    },

    // /major/getone/:name
    getOneName: async (req, res) => {
        res.status(200);
        let rs = {
            code: 03,
            message: 'error'
        }
        let { name } = req.param('data') || -1;
        let major = await Major.findOne({ name: name });
        if (major) {
            rs.code = 200;
            rs.message = 'success';
            rs.data = major
        }
        return res.json(rs);
    },
    // /major/getone/:code
    getOneCode: async (req, res) => {
        res.status(200);
        let rs = {
            code: 03,
            message: 'error'
        }
        let { code } = req.param('data') || -1;
        let major = await Major.findOne({ code: code });
        if (major) {
            rs.code = 200;
            rs.message = 'success';
            rs.data = major
        }
        return res.json(rs);
    },

    // get all major with id school
    getAllInSchool: async (req, res) => {
        res.status(200);
        let code = 200, data = null, message = 'success', { school } = req.param('data') || '';
        let list = await Major.find({ school: school });
        data = {
            list,
            next: false
        }
        return res.json({ code, message, data });
    },
   
};

