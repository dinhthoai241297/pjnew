/**
 * SessionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

// 1401 thiếu tham số gửi lên
// 1403 có lỗi xảy ra

const jwt = require('jsonwebtoken');

module.exports = {

    loginSession: async (req, res) => {
        res.status(200);
        let code, message, data;
        code = 1403;
        message = 'error';

        let { session } = req.param('data');
        if (session) {
            jwt.verify(session, sails.config.custom.secretKey, async (error, result) => {
                if (!error) {
                    let { email, password } = result;
                    let user = await User.findOne({ email, password }).populate('province').populate('purpose');
                    if (user) {
                        // login success
                        code = 200;
                        message = 'success';
                        data = {
                            user
                        }
                    }
                }
                return res.json({ code, message, data });
            });
        } else {
            code = 1401;
            return res.json({ code, message, data });
        }
    },

    login: async (req, res) => {
        res.status(200);
        let code, message, data;
        code = 1403;
        message = 'error';
        data = undefined;

        try {
            let { email, password } = req.param('data');
            let user = await User.findOne({ email, password }).populate('province').populate('purpose');
            if (user) {
                let session = jwt.sign({ email, password, createdAt: new Date() }, sails.config.custom.secretKey);
                await Session.create({ user: user.id, session });
                code = 200;
                message = 'success';
                data = { user, session };
            }
            return res.json({ code, message, data });
        } catch (error) {
            code = 1401;
            return res.json({ code, message, data });
        }
    },
    logout: async (req, res) => {
        res.status(200);
        let code, message;
        code = 1403;
        message = 'error';

        try {
            let { session } = req.param('data');
            await Session.destroy({ session }).fetch();
            code = 200;
            message = 'success';
        } catch (error) {
            code = 1401;
        }
        return res.json({ code, message });
    },

    updateprofile: async (req, res) => {
        res.status(200);
        let code = 1403, message = 'error', data = undefined;
        try {
            let { session, user } = req.param('data');
            let { id, fullName, sex, birthday, province, purpose } = user;
            let check = checkName(fullName) && checkBirthday(birthday)&& sex !== '';
            if (check) {
                birthday = new Date(birthday);
                let tmp = await Session.findOne({ session });
                if (tmp) {
                    let u = await User.updateOne({ id }).set({ fullName: fullName, sex: sex, birthday: birthday, purpose: purpose, province: province });
                    code = 200;
                    message = 'success';
                    data = { user: u };
                } else {
                    code = 1402;
                }
            }
        } catch (error) {
            code = 1401;
            console.log(error);
        }
        return res.json({ code, message, data });
    },

    loginFacebook: async (req, res) => {
        res.status(200);
        let code, message, data;
        code = 1403;
        message = 'error';
        data = undefined;

        try {

            let { token } = req.param('data');
            const request = require('request');
            request('https://graph.facebook.com/me?fields=id,name,email&access_token=' + token, { json: true }, async (err, response) => {
                if (err) {
                    code = 1403;
                    message = 'error';
                }
                let { id, name, email } = response.body;
                let user = await User.findOne({ username: id});
                if (!user) {
                   user = await User.create({ username: id, fullName: name, email: email, password: id }).fetch();

                }
                let session = jwt.sign({ email, id, createdAt: new Date() }, sails.config.custom.secretKey);
                await Session.create({ user: user.id, session });
                code = 200;
                message = 'success';
                data = { user, session }
                return res.json({ code, message, data });
            });
        } catch (error) {
            code = 1401;
            return res.json({ code, message, data });
        }
    },


};

    checkSG = subjectGroup => subjectGroup !== '';

    checkName = name => name !== '';

    checkBirthday = birthday => {
        if (!birthday || birthday === '') {
            return false;
        } else {
            return true;
        }
    }
