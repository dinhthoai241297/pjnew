/**
 * SectorController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    add: async (req, res) => {
        try {
            let sector = JSON.parse(req.param('data'));
            let s = await Sector.create(sector).fetch();
            return res.status(s ? 200 : 304).send();
        } catch (error) {
            return res.status(500).send();
        }
    },

    delete: async (req, res) => {
        let id = req.param('id');
        if (id) {
            let s = await Sector.destroy({ id: id }).fetch();
            return res.status((s && s.length !== 0) ? 200 : 304).send(s);
        } else {
            return res.status(500).send();
        }
    },

    // t
    update: async (req, res) => {
        try {
            let sector = JSON.parse(req.param('data'));
            let s = await Sector.update({ id: sector.id }, sector).fetch();
            return res.status(s ? 200 : 304).send();
        } catch (error) {
            return res.status(500).send();
        }
    },

    // /major/getall/:page
    getAll: async (req, res) => {
        let page = req.param('page') || 1;
        let list = await Sector.find().limit(10).skip((page - 1) * 10);
        return rs.send(list);
    },

    // /major/getone/:id
    getOne: async (req, res) => {
        let id = req.param('id') || 1;
        let sector = await Sector.find({ id: id });
        return res.send(sector);
    }

};

