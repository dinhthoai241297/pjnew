/**
 * SchoolController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    add: async (req, res) => {
        try {
            let school = JSON.parse(req.param('data'));
            let province = await Province.findOne({ id: school.idProvince });
            if (province) {
                let s = await School.create(school).fetch();
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
            let rs = await School.destroy({ id: id }).fetch();
            if (rs && rs.length !== 0) {
                return res.status(200).send();
            } else {
                return res.status(304).send();
            }
        } else {
            res.status(500).send();
        }
    },

    // t
    update: async (req, res) => {
        try {
            let school = JSON.parse(req.param('data'));
            let province = await Province.findOne({ id: school.province });
            if (province) {
                let s = await School.update({id : school.id}, school).fetch();
                return res.status(s ? 200 : 304).send();
            } else {
                return res.status(404).send();
            }
        } catch (error) {
            res.status(500).send();
        }
    },

    // /school/getall/:page
    getAll: async (req, res) => {
        let page = req.param('page') || 1;
        let list = await School.find().limit(10).skip((page - 1) * 10);
        return rs.send(list);
    },

    // /school/getone/:id
    getOne: async (req, res) => {
        let id = req.param('id') || 1;
        let school = await School.find({ id: id });
        return res.send(school);
    }

};

