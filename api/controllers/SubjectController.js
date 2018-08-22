/**
 * SubjectController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    add: async (req, res) => {
        try {
            let subject = JSON.parse(req.param('data'));
            let s = await Subject.create(subject).fetch();
            return res.status(s ? 200 : 304).send();
        } catch (error) {
            res.status(500).send();
        }
    },

    delete: async (req, res) => {
        let id = req.param('id');
        if (id) {
            let rs = await Subject.destroy({ id: id });
            return res.status((rs && rs.length !== 0) ? 200 : 304).send(rs);
        } else {
            res.status(500).send();
        }
    },

    // t
    update: async (req, res) => {
        try {
            let subject = JSON.parse(req.param('data'));
            let s = await Subject.update({ id: subject.id }, subject).fetch();
            return res.status(s ? 200 : 304).send();
        } catch (error) {
            res.status(500).send();
        }
    },

    // /subject/getall/:page
    getAll: async (req, res) => {
        let page = req.param('page') || 1;
        let list = await Subject.find().limit(10).skip((page - 1) * 10);
        return rs.send(list);
    },

    // /subject/getone/:id
    getOne: async (req, res) => {
        let id = req.param('id') || 1;
        let subject = await Subject.find({ id: id });
        return res.send(subject);
    }
};

