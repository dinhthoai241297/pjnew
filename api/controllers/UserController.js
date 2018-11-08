/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var md5 = require('md5');

const ACTIVE = 1;
const DELETE = 1;
const PENDING = 1;
const LOCK = 1;

module.exports = {
    // 801 dữ liệu gửi lên không hợp lệ
    // 802 có lỗi xảy ra, không có gì được thay đổi
    // 803 không tìm thấy dữ liệu trong database
    // 804 Tài khoản chưa kích hoạt
    checkSession: async (req, res) => {
        res.status(200);
        let code = 803, message = 'error';
        try {
            let { session } = req.param('data');
            let s = await Login.findOne({ session: session });
            if (s) {
                code = 200;
                message = 'success';
            } else {
                code = 802;
            }
        } catch (error) {
            code = 801;
        }
        return res.json({ code, message });
    },

    add: async (req, res) => {
        res.status(200);
        let code = 803, message = 'error';
        try {
            let { user } = req.param('data');
            let username = user.username;
            let tmp = await User.findOne({ username: username });
            if (!tmp) {
                let s = await User.create(user).fetch();
                if (s) {
                    let { session } = req.param('data');
                    let tmp = await Login.findOne({ session: session });
                    let iduser = JSON.parse(tmp.user).id;
                    let log = await Logtime.create({ iduser: iduser, action: "add", collection: "user" });
                    code = 200;
                    message = 'success';
                } else {
                    code = 802;
                }
            }

        } catch (error) {
            code = 801;
        }
        return res.json({ code, message });
    },

    delete: async (req, res) => {
        res.status(200);
        let code = 801, message = 'error', { id } = req.param('data');
        if (id) {
            let rs = await User.destroy({ id: id }).fetch();
            if (rs && rs.length !== 0) {
                let { session } = req.param('data');
                let tmp = await Login.findOne({ session: session });
                let iduser = JSON.parse(tmp.user).id;
                let log = await Logtime.create({ iduser: iduser, action: "delete", collection: "user" });
                code = 200;
                message = 'success';
            } else {
                code = 802;
            }
        }
        return res.json({ code, message });
    },

    // user/update
    update: async (req, res) => {
        res.status(200);
        let code = 803, message = 'error';
        try {
            let { user } = req.param('data');
            let u = await User.update({ id: user.id }, user).fetch();
            if (u) {
                let { session } = req.param('data');
                let tmp = await Login.findOne({ session: session });
                let iduser = JSON.parse(tmp.user).id;
                let log = await Logtime.create({ iduser: iduser, action: "update", collection: "user" });
                code = 200;
                message = 'success';
            } else {
                code = 802;
            }
        } catch (error) {
            code = 801;
        }
        return res.json({ code, message });
    },

    // /user/getall/:page
    getAll: async (req, res) => {
        res.status(200);
        let code = 200, message = 'success', data = undefined, { page } = req.param('data') || 1;
        let { status } = req.param('data');
        let { role } = req.param('data');
        let { date } = req.param('data');
        let start = date.start;
        let end = date.end;
        let list = await User.find({ status: status, role: role, createdAt: { '>=': start, '<': end } }).sort([{ username: 'ASC' }]).limit(11).skip((page - 1) * 10).populate('role').populate('status');
        if (list.length > 10) {
            data = {
                list: list.slice(0, 10),
                next: true,

            }
        } else {
            data = {
                list,
                next: false
            }
        }
        return res.json({ code, message, data });
    },

    // /user/getone/:id
    getOne: async (req, res) => {
        res.status(200);
        let code = 803, message = 'error', data = undefined, { id } = req.param('data') || -1;
        data = await User.findOne({ id: id });
        if (data) {
            code = 200;
            message = 'success';
        }
        return res.json({ code, message, data });
    },

    // user/login : for admin
    loginAdmin: async (req, res) => {
        res.status(200);
        let code = 803, message = 'error', data = undefined, user = undefined, session = undefined, role;
        try {
            let { username, password } = req.param('data');
            user = await User.findOne({ username: username, password: password }).populate('status').populate('role');
            if (user) {
                if (user.status.status === ACTIVE) {
                    // create session
                    let time = (new Date).getTime();
                    session = md5(user.id + time);
                    await Login.create({ session, time, user: JSON.stringify(user) });
                    code = 200;
                    message = 'success';
                } else {
                    code = 804;
                    message = 'user not active';
                }
            }
        } catch (error) {
            code = 801;
        }
        if (user && session) {
            data = { user, session };
        }
        return res.json({ code, message, data });
    },
    //user/login : login for user
    loginUser: async (req, res) => {
        res.status(200);
        let code = 803, message = 'error', data = undefined, user = undefined, session = undefined;
        try {
            let { email, password } = req.param('data');
            user = await User.findOne({ email: email, password: password });
            if (user) {
                let time = (new Date).getTime();
                session = md5(user.id + time);
                await Login.create({ session, time, user: JSON.stringify(user) });
                code = 200;
                message = 'success';
            }
        } catch (error) {
            code = 801;
        }
        if (user && session) {
            data = { user, session };
        }
        return res.json({ code, message, data });
    },

    // user/logout
    logout: async (req, res) => {
        res.status(200);
        let code = 803, message = 'error';
        try {
            let { session } = req.param('data');
            let rs = await Login.destroy({ session: session }).fetch();
            if (rs && rs.length !== 0) {
                code = 200;
                message = 'success';
            }
        } catch (error) {
            code = 801;
        }
        return res.json({ code, message });
    },

    updateStatus: async (req, res) => {
        res.status(200);
        let code = 403, message = 'error';
        try {
            let { id, status } = req.param('data');
            let s = await User.update({ id }).set({ status }).fetch();
            if (s) {
                code = 200;
                message = 'success';
            } else {
                code = 402;
            }
        } catch (error) {
            code = 401;
        }
        return res.json({ code, message });
    },

    register: async (req, res) => {
        res.status(200);
        let code = 803, message = 'error';
        try {
            let { user } = req.param('data');
            let email = user.email;
            let tmp = await User.findOne({ email: email });
            if (!tmp) {
                user.birthday = new Date(user.birthday);
                let s = await User.create(user).fetch();
                if (s) {
                    let log = await Logtime.create({ iduser: "No ID", action: "register", collection: "user" }).fetch();
                    code = 200;
                    message = 'success';
                } else {
                    code = 802;
                }
            }
        } catch (error) {
            code = 801;
        }
        return res.json({ code, message });
    },
    getKey: async (req, res) => {
        res.status(200);
        let code = 803, message = 'error';
        try {
            let { email } = req.param('data');
            let tmp = await User.findOne({ email: email });
            if (tmp) {
                // render code ra collection Key
                //gửi key vào mail đã nhận
            }
        } catch (error) {
            code = 801;
        }
        return res.json({ code, message });
    },
    resetPass: async (req, res) => {
        res.status(200);
        let code = 803, message = 'error';
        try {
            let { key } = req.param('data');
            let tmp = await Key.findOne({ key: key });
            if (tmp) {
                // so sánh với key trong Collection Key
                // update pass
                // xóa key trong Collection
            }

        } catch (error) {
            console.log(error);
            code = 801;
        }
        return res.json({ code, message });
    },


};

