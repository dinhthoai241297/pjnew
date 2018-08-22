/**
 * TestController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    addSubToGroup: async (req, res) => {
        let json = await Testjson.find();
        res.send(typeof json[0].test === 'json');
    }

};

