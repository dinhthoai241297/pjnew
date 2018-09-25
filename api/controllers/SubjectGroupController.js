/**
 * SubjectGroupController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    // 601 dữ liệu gửi lên không hợp lệ
    // 602 có lỗi xảy ra, không có gì được thay đổi
    // 603 không tìm thấy dữ liệu trong database

    add: async (req, res) => {
        res.status(200);
        let code = 603, message = 'error';
        try {
            let subjectGroup = JSON.parse(req.param('data'));
            for (let i = 0; i < subjectGroup.subjects.length; i++) {
                try {
                    let sub = await Subject.findOne({ id: subjectGroup.subjects[i] });
                    if (!sub) {
                        return res.json({ code, message });
                    }
                } catch (error) {
                    return res.json({ code, message });
                }
            }
            // subjectGroup.subjects.forEach(async ele => {
            //     try {
            //         let sub = await Subject.findOne({ id: ele });
            //         if (!sub) {
            //             return res.json({ code, message });
            //         }
            //     } catch (error) {
            //         return res.json({ code, message });
            //     }
            // });
            subjectGroup.subjects = JSON.stringify(subjectGroup.subjects);
            let s = await SubjectGroup.create(subjectGroup).fetch();
            if (s) {
                code = 200;
                message = 'success';
            } else {
                code = 602;
            }
        } catch (error) {
            code = 601;
        }
        return res.json({ code, message });
    },

    delete: async (req, res) => {
        res.status(200);
        let code = 601, message = 'error', id = req.param('id');
        if (id) {
            let rs = await SubjectGroup.destroy({ id: id }).fetch();
            if (rs && rs.length !== 0) {
                code = 200;
                message = 'success';
            } else {
                code = 602;
            }
        }
        return res.json({ code, message });
    },

    // t
    update: async (req, res) => {
        res.status(200);
        let code = 603, message = 'error';
        try {
            let subjectGroup = JSON.parse(req.param('data'));
                        for (let i = 0; i < subjectGroup.subjects.length; i++) {
                try {
                    let sub = await Subject.findOne({ id: subjectGroup.subjects[i] });
                    if (!sub) {
                        return res.json({ code, message });
                    }
                } catch (error) {
                    return res.json({ code, message });
                }
            }
            // subjectGroup.subjects.forEach(async ele => {
            //     try {
            //         let sub = await Subject.findOne({ id: ele });
            //         if (!sub) {
            //             return res.json({ code, message });
            //         }
            //     } catch (error) {
            //         return res.json({ code, message });
            //     }
            // });
            subjectGroup.subjects = JSON.stringify(subjectGroup.subjects);
            let s = await SubjectGroup.update({ id: subjectGroup.id }, subjectGroup).fetch();
            if (s) {
                code = 200;
                message = 'success';
            } else {
                code = 602;
            }
        } catch (error) {
            code = 601;
        }
        return res.json({ code, message });
    },

    // /subjectGroup/getall/:page
    getAll: async (req, res) => {
        res.status(200);
        let code = 200, message = 'success', data = undefined, page = req.param('page') || 1;
        let list = await SubjectGroup.find().limit(11).skip((page - 1) * 10);
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

    // /subjectGroup/getone/:id
    getOne: async (req, res) => {
        res.status(200);
        let code = 603, message = 'error', data = undefined, id = req.param('id') || 1;
        data = await SubjectGroup.findOne({ id: id });
        if (data) {
            code = 200;
            message = 'success';
        }
        return res.json({ code, message, data });
    }

    editStatus: async (req, res) => {
        res.status(200);
        let code = 603, message = 'error';
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
                    code = 602;
                }
            }
        }
        catch (error){
            code = 601;
        }
        return res.json({ code, message });
    }
};
