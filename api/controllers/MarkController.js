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
    add: async (req, res) => {
        res.status(200);
        let code = 103, message = 'error';
        try {
            let mark = JSON.parse(req.param('data'));
            for (let i = 0; i < mark.subjectGroups.length; i++) {
                try {
                    let sg = await SubjectGroup.findOne({ id: mark.subjectGroups[i] });
                    if (!sg) {
                        return res.json({ code, message });
                    }
                } catch (error) {
                    code = 101;
                    return res.json({ code, message });
                }
            }
            // mark.subjectGroups.forEach(async ele => {
            //     try {
            //         let sg = await SubjectGroup.findOne({ id: ele });
            //         if (!sg) {
            //             return res.json({ code, message });
            //         }
            //     } catch (error) {
            //         return res.json({ code, message });
            //     }
            // });
            mark.subjectGroups = JSON.stringify(mark.subjectGroups);
            let major = await Major.findOne({ id: mark.major });
            let school = await School.findOne({ id: mark.school });
            if (major && school) {
                let s = await Mark.create(mark).fetch();
                if (s) {
                    code = 200;
                    message = 'success';
                } else {
                    code = 102;
                }
            }
        } catch (error) {
            code = 101;
        }
        return res.json({ code, message });
    },

    delete: async (req, res) => {
        res.status(200);
        let code = 101, message = 'error', id = req.param('id');
        if (id) {
            let rs = await Mark.destroy({ id: id }).fetch();
            if (rs && rs.length !== 0) {
                code = 200;
                message = 'success';
            } else {
                code = 102;
            }
        }
        return res.json({ code, message });
    },

    // t
    update: async (req, res) => {
        res.status(200);
        let code = 103, message = 'error';
        try {
            let mark = JSON.parse(req.param('data'));
            for (let i = 0; i < mark.subjectGroups.length; i++) {
                try {
                    let sg = await SubjectGroup.findOne({ id: mark.subjectGroups[i] });
                    if (!sg) {
                        return res.json({ code, message });
                    }
                } catch (error) {
                    code = 101;
                    return res.json({ code, message });
                }
            }
            // mark.subjectGroups.forEach(async ele => {
            //     let sg = await SubjectGroup.findOne({ id: ele });
            //     if (!sg) {
            //         res.json({
            //             code: code,
            //             message: message
            //         });
            //         return;
            //     }
            // });
            mark.subjectGroups = JSON.stringify(mark.subjectGroups);
            let major = await Major.findOne({ id: mark.major });
            let school = await School.findOne({ id: mark.school });
            if (major && school) {
                let s = await Mark.update({ id: mark.id }, mark).fetch();
                if (s) {
                    code = 200;
                    message = 'success';
                } else {
                    code = 102;
                }
            }
        } catch (error) {
            code = 101;
        }
        return res.json({ code, message });
    },

    // /mark/getall/:page
    getAll: async (req, res) => {
        res.status(200);
        let code = 200, message = 'success', data = undefined, page = req.param('page') || 1;
        let list = await Mark.find().limit(11).skip((page - 1) * 10);
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

    // /mark/getone/:id
    getOne: async (req, res) => {
        res.status(200);
        let code = 103, message = 'error', data = undefined, id = req.param('id') || 1;
        data = await Mark.findOne({ id: id });
        if (data) {
            code = 200;
            message = 'success';
        }
        return res.json({ code, message, data });
    }

    editStatus: async (req, res) => {
        res.status(200);
        let code = 103, message = 'error';
        let status = req.param('status');
        try {
            let major = JSON.parse(req.param('data'));
            let status = await Major.findOne({status: major.status})
            if(status) {
                let s = await Major.update({ status: major.status }, major).fetch();
                if (s) {
                    code = 200;
                    message = 'success';
                } else {
                    code = 102;
                }
            }
        }
        catch (error){
            code = 101;
        }
        return res.json({ code, message });
    }
};

