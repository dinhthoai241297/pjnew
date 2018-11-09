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
        let code = 200, message = 'success';
        let list = await School.find().sort([{name :'ASC'}]);
        if (list) {
            code = 200;
            message = 'success';
        }
        return res.json({ code, message, list });
    },
    // /school/getAll/: School-province
    getSchoolProvince: async (req, res) => {
        res.status(200);
        let code = 303, message = 'error', data = undefined, { province } = req.param('data') || 1;
        data = await School.find({ province: province });
        if (data) {
            code = 200;
            message = 'success';
        }
        return res.json({ code, message, data });
    },
    // /school/getall/: School-sector
    getSchoolSector: async (req, res) => {
        res.status(200);
        let code = 303, message = 'error', data = undefined, listid= undefined;
        let { sector } = req.param('data');
        province = await Province.find({ sector: sector});
        for (let i = 0; i < province.length; i++) {
            let tmp = province[i];
            listid = tmp.id;
            data = await School.find({province: {in:[listid]}});
            if (data) {
                code = 200;
                message = 'success';
            }
            return res.json({ code, message, data });
        };
        
    },
    
    // /school/getall/:code
    getOneCode: async (req, res) => {
        res.status(200);
        let code = 303, message = 'error', data = undefined, { codesc } = req.param('data') || 1;
        data = await School.find().where({code: {contains :codesc}});
        if (data) {
            code = 200;
            message = 'success';
        }
        return res.json({ code, message, data });
    },

    // /school/getall/:name
    getOneName: async (req, res) => {
        res.status(200);
        let code = 303, message = 'error', data = undefined, { name } = req.param('data') || 1;
        data = await School.find().where({name: {contains :name}});
        if (data) {
            code = 200;
            message = 'success';
        }
        return res.json({ code, message, data });
    },


};

