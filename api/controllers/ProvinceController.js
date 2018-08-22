/**
 * ProvinceController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    add: async (req, res) => {
        try {
            let province = JSON.parse(req.param('data'));
            let sector = await Sector.findOne({ id: mark.sector });
            if (sector) {
                let s = await Province.create(province).fetch();
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
            let rs = await Province.destroy({ id: id }).fetch();
            return res.status((rs && rs.length !== 0) ? 200 : 304).send();
        } else {
            res.status(500).send();
        }
    },

    // t
    update: async (req, res) => {
        try {
            let province = JSON.parse(req.param('data'));
            let sector = await Sector.findOne({ id: mark.sector });
            if (sector) {
                let s = await Province.update({id: province.id}, province).fetch();
                return res.status(s ? 200 : 304).send();
            } else {
                return res.status(404).send();
            }
        } catch (error) {
            res.status(500).send();
        }
    },

    // /province/getall/:page
    getAll: async (req, res) => {
        let page = req.param('page') || 1;
        let list = await Province.find().limit(10).skip((page - 1) * 10);
        return rs.send(list);
    },

    // /province/getone/:id
    getOne: async (req, res) => {
        let id = req.param('id') || 1;
        let province = await Province.find({ id: id });
        return res.send(province);
    }

};

