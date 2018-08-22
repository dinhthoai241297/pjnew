/**
 * SubjectGroupController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    add: async (req, res) => {
        try {
            let subjectGroup = JSON.parse(req.param('data'));
            if (subjectGroup.subjects) {
                // kiểm tra từng tổ hợp môn có tồn tại hay k
                subjectGroup.subjects.forEach(async ele => {
                    let sub = await Subject.findOne({ id: ele });
                    if (!sub) {
                        return res.status(404).send();
                    }
                });
                subjectGroup.subjects = JSON.stringify(subjectGroup.subjects);
            }
            let s = await SubjectGroup.create(subjectGroup).fetch();
            return res.status(s ? 200 : 304).json(s);
        } catch (error) {
            return res.status(500).send();
        }
    },

    delete: async (req, res) => {
        let id = req.param('id');
        if (id) {
            let rs = await SubjectGroup.destroy({ id: id }).fetch();
            return res.status((rs && rs.length !== 0) ? 200 : 304).send();
        } else {
            return res.status(500).send();
        }
    },

    // t
    update: async (req, res) => {
        try {
            let subjectGroup = JSON.parse(req.param('data'));
            if (subjectGroup.subjects) {
                // kiểm tra từng tổ hợp môn có tồn tại hay k
                subjectGroup.subjects.forEach(async ele => {
                    let sub = await Subject.findOne({ id: ele });
                    if (!sub) {
                        return res.status(404).send();
                    }
                });
                subjectGroup.subjects = JSON.stringify(subjectGroup.subjects);
            }
            let s = await SubjectGroup.update({id: subjectGroup.id}, subjectGroup).fetch();
            return res.status(s ? 200 : 304).send();
        } catch (error) {
            return res.status(500).send();
        }
    },

    // /subjectGroup/getall/:page
    getAll: async (req, res) => {
        let page = req.param('page') || 1;
        let list = await SubjectGroup.find().limit(10).skip((page - 1) * 10);
        return rs.send(list);
    },

    // /subjectGroup/getone/:id
    getOne: async (req, res) => {
        let id = req.param('id') || 1;
        let subjectGroup = await SubjectGroup.find({ id: id });
        return res.send(subjectGroup);
    }
};
