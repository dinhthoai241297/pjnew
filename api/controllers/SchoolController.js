/**
 * SchoolController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    add: async (req, res) => {
        let school = {
            name: req.query.name,
            code: req.query.code,
            description: req.query.description,
            idProvince: req.query.idProvince
        }
        let province = await Province.findOne({ id: school.idProvince });
        if (province) {
            let s = await School.create(school).fetch();
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
        let rs = await School.destroy({id: req.params.id});
        if (rs && rs.length !== 0) {
            return res.status(200).send(rs);
        } else {
            return res.status(304);
        }
    },

    // t
    update: async (req, res) => {
        let school = {
            id: req.query.id,
            name: req.query.name,
            code: req.query.code,
            description: req.query.description,
            idProvince: req.query.idProvince
        }
        let province = await Province.findOne({ id: school.idProvince });
        if (province) {
            let s = await School.update({id: school.id}, school).fetch();
            if (s) {
                return res.status(200).json(s);
            } else {
                return res.status(304);
            }
        } else {
            return res.status(404);
        }
    },

    // /school/getall/:page
    getAll: async (req, res) => {
        let page = req.params.page | 1;
        let list = await School.find().limit(10).skip((page - 1) * 10);
        return rs.send(list);
    },

    // /school/getone/:id
    getOne: async (req, res) => {
        let id = req.params.id | 1;
        let school = await School.find({id: id});
        return res.send(school);
    }

};

