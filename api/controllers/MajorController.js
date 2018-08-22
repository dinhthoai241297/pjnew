/**
 * MajorController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    add: async (req, res) => {
        let major = {
            name: req.query.name,
            code: req.query.code,
            school: req.query.school
        }
        let school = await School.findOne({ id: mark.school });
        if (school) {
            let s = await Major.create(major).fetch();
            if (s) {
                return res.status(200).json(s);
            } else {
                return res.status(304);
            }
        } else {
            return res.status(404);
        }
    },

    delete: async (req, res) => {
        let rs = await Major.destroy({id: req.params.id});
        if (rs && rs.length !== 0) {
            return res.status(200).send(rs);
        } else {
            return res.status(304);
        }
    },

    // t
    update: async (req, res) => {
        let major = {
            name: req.query.name,
            code: req.query.code,
            school: req.query.school
        }
        let school = await School.findOne({ id: mark.school });
        if (school) {
            let s = await Major.update({id: major.id}, major).fetch();
            if (s) {
                return res.status(200).json(s);
            } else {
                return res.status(304);
            }
        } else {
            return res.status(404);
        }
    },

    // /major/getall/:page
    getAll: async (req, res) => {
        let page = req.params.page | 1;
        let list = await Major.find().limit(10).skip((page - 1) * 10);
        return rs.send(list);
    },

    // /major/getone/:id
    getOne: async (req, res) => {
        let id = req.params.id | 1;
        let major = await Major.find({id: id});
        return res.send(major);
    }

};

