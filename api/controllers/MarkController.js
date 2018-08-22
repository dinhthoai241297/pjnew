/**
 * MarkController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    // t
    add: async (req, res) => {
        try {
            let mark = JSON.parse(req.param('data'));
            if (mark.subjectGroups) {
                mark.subjectGroups.forEach(async ele => {
                    let sg = await SubjectGroup.findOne({ id: ele });
                    if (!sg) {
                        return res.status(404).send();
                    }
                });
                mark.subjectGroups = JSON.stringify(mark.subjectGroups);
            } else {
                return res.status(500).send();
            }
            let major = await Major.findOne({ id: mark.major });
            let school = await School.findOne({ id: mark.school });
            if (major && school) {
                let s = await Mark.create(mark).fetch();
                return res.status(s ? 200 : 304).send();
            } else {
                return res.status(404).send();
            }
        } catch (error) {
            res.status(500).send();
        }
    },

    delete: async (req, res) => {
        let id = req.param('id');
        if (id) {
            let rs = await mark.destroy({ id: id }).fetch();
            return res.status((rs && rs.length !== 0) ? 200 : 304).send();
        } else {
            return res.status(500).send();
        }
    },

    // t
    update: async (req, res) => {
        try {
            let mark = JSON.parse(req.param('data'));
            mark.subjectGroups.forEach(async ele => {
                let sg = await SubjectGroup.findOne({ id: ele });
                if (!sg) {
                    return res.status(404).send();
                }
            });
            mark.subjectGroups = JSON.stringify(mark.subjectGroups);
            let major = await Major.findOne({ id: mark.major });
            let school = await School.findOne({ id: mark.school });
            if (major && school) {
                let s = await Mark.update({ id: mark.id }, mark).fetch();
                return res.status(s ? 200 : 304).send();
            } else {
                return res.status(404).send();
            }
        } catch (error) {
            res.status(500).send();
        }
    },

    // /mark/getall/:page
    getAll: async (req, res) => {
        let page = req.param('page') || 1;
        let list = await Mark.find().limit(10).skip((page - 1) * 10);
        return rs.send(list);
    },

    // /mark/getone/:id
    getOne: async (req, res) => {
        let id = req.param('id') || 1;
        let mark = await Mark.find({ id: id });
        return res.send(mark);
    }
};

