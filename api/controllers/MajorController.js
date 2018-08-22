/**
 * MajorController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    add: async (req, res) => {
        try {
            let major = JSON.parse(req.param('data'));
            let school = await School.findOne({ id: mark.school });
            if (school) {
                let s = await Major.create(major).fetch();
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
            let rs = await Major.destroy({ id: id }).fetch();
            return res.status((rs && rs.length !== 0) ? 200 : 304).send();
        } else {
            return res.status(500).send();
        }
    },

    // t
    update: async (req, res) => {
        try {
            let major = JSON.parse(req.param('data'));
            let school = await School.findOne({ id: mark.school });
            if (school) {
                let s = await Major.update({ id: major.id }, major).fetch();
                return res.status(s ? 200 : 304).send();
            } else {
                return res.status(404).send();
            }
        } catch (error) {
            res.status(500).send();
        }
    },

    // /major/getall/:page
    getAll: async (req, res) => {
        let page = req.param('page') || 1;
        let list = await Major.find().limit(10).skip((page - 1) * 10);
        return rs.send(list);
    },

    // /major/getone/:id
    getOne: async (req, res) => {
        let id = req.param('id') || 1;
        let major = await Major.find({ id: id });
        return res.send(major);
    }

};

