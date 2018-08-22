/**
 * MarkController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    // t
    add: async (req, res) => {
        let mark = {
            year: req.query.year,
            mark: req.query.mark,
            aspiration: req.query.aspiration,
            note: req.query.note,
            major: req.query.major,
            school: req.query.school
        }
        let major = await Major.findOne({ id: mark.major });
        let school = await School.findOne({ id: mark.school });
        if (major && school) {
            let s = await Mark.create(mark).fetch();
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
        let rs = await mark.destroy({ id: req.params.id });
        if (rs && rs.length !== 0) {
            return res.status(200).send(rs);
        } else {
            return res.status(304);
        }
    },

    // t
    update: async (req, res) => {
        let mark = {
            id: req.query.id,
            year: req.query.year,
            mark: req.query.mark,
            aspiration: req.query.aspiration,
            note: req.query.note,
            major: req.query.major,
            school: req.query.school
        }
        let major = await Major.findOne({ id: mark.major });
        let school = await School.findOne({ id: mark.school });
        if (major && school) {
            let s = await Mark.update({id: mark.id},mark).fetch();
            if (s) {
                return res.status(200).json(s);
            } else {
                return res.status(304);
            }
        } else {
            return res.status(404);
        }
    },

    // /mark/getall/:page
    getAll: async (req, res) => {
        let page = req.params.page | 1;
        let list = await Mark.find().limit(10).skip((page - 1) * 10);
        return rs.send(list);
    },

    // /mark/getone/:id
    getOne: async (req, res) => {
        let id = req.params.id | 1;
        let mark = await Mark.find({ id: id });
        return res.send(mark);
    }
};

