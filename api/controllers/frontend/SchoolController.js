/**
 * SchoolController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

 module.exports = {

    // 301 dữ liệu gửi lên không hợp lệ
    // 302 có lỗi xảy ra, không có gì được thay đổi
    // 303 không tìm thấy dữ liệu trong database


    //school/get/id
    getId: async (req, res) => {
        res.status(200);
        let code = 303, message = 'error', data = undefined, { id } = req.param('data');
        data = await School.findOne({ id: id }).populate('province');
        if (data) {
            code = 200;
            message = 'success';
        }
        return res.json({ code, message, data });
    },

    // /school/search
    search: async (req, res) => {
        res.status(200);
        let code = 303, message = 'error', data = undefined, { name, page } = req.param('data'), list = undefined;
        if (!page || page < 0) {
            page = 1;
        }
        try {
            let db = School.getDatastore().manager;
            list = await db.collection('school').aggregate([
            {
                $match: {
                    $or: [
                    {
                        $or: [
                        { code: { $regex: name, $options: "i" } },
                        { name: { $regex: name, $options: "i" } }
                        ]
                    }
                    ]
                }
            },
            {
                $lookup: {
                    from: 'province',
                    localField: 'province',
                    foreignField: '_id',
                    as: 'province'
                }
            },
            { $skip: (page - 1) * 20 },
            { $limit: 21 }
            ]).toArray((error, rs) => {
                if (!error) {
                    list = rs;
                    if (list.length > 20) {
                        data = {
                            list: list.slice(0, 20),
                            next: true
                        }
                    } else {
                        data = {
                            list,
                            next: false
                        }
                    }
                    code = 200;
                    message = 'success';
                }
                return res.json({ code, message, data });
            });
        } catch (error) {
            code = 301;
            return res.json({ code, message, data });
        }
    },



    // /school/getList/:province + subjectGroup


    getList: async (req, res) => {
        res.status(200);
        let code = 200, message = 'success', data = undefined, rs = undefined, list = undefined, { page, province, subjectGroups } = req.param('data');
        if (!page || page < 0) {
            page = 1;
        }
        try {
            let db = Mark.getDatastore().manager;
            listmark = await db.collection('mark').aggregate([
            {
                $match: {
                    subjectGroups: { $regex: subjectGroups }
                }
            },
            {
                $group: { _id: "$school" }
            }
            ]).toArray(async (error, rs) => {
                if (!error) {
                    let listid1 = [];
                    let listid2 = [];
                    let listid3 = [];
                    for (let i = 0; i < rs.length; i++) {
                        listid1.push(String(rs[i]._id));
                    }
                    //tìm trường có Khối + trong tỉnh
                    let listin = await School.find({ id: { in: listid1 }, province :province }).populate('province').limit(11).skip((page - 1) * 20);
                    //tìm trường có khối + trong khu vực
                    let tmp1 = await Province.findOne({ id : province });
                    let sectorid = tmp1.sector;
                    let tmp2 = await Province.find({ sector : sectorid });
                    for (let i = 0; i < tmp2.length; i++) {
                     if (tmp2[i].id != province ){
                        listid2.push((tmp2[i].id));
                        }
                    }    
                    let listst = await School.find({id :{ in: listid1 }, province : {in : listid2}}).populate('province').limit(11).skip((page - 1) * 20);
                    let lista = listin.concat(listst);
                       //tìm tường có khối - tỉnh - khu vực
                       for (let i = 0; i < tmp2.length; i++) {
                         if (tmp2[i].id != province ){
                            listid3.push((tmp2[i].id));
                        }
                    } 
                    let listcl = await School.find({id :{ in: listid1 }, province : {nin : listid3}}).populate('province').limit(11).skip((page - 1) * 20);
                    list = listin.concat(listst).concat(listcl);
                    if (list.length > 20) {
                        data = {
                            list: list.slice(0, 20),
                            next: true
                        }
                    } else {
                        data = {
                            list,
                            next: false
                        }
                    }
                    code = 200;
                    message = 'success';
                }
                return res.json({ code, message, data });
            });
        }
        catch (error) {
            code = 301;
            return res.json({ code, message, data });
        }
    },

};


