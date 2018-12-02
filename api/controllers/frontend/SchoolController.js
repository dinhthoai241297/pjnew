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
        let code = 200, message = 'success', data = undefined, { page, province, subjectGroups } = req.param('data');
        if (!page || page < 0) {
            page = 1;
        }
        // let listmark = await Mark.find({ subjectGroups : subjectGroups });
        // for(let i = 0; i < listmark.length ; i++){
        // let listsc = listmark[i];
        // let listidsc = listsc.school;
        // console.log(listidsc);
        // list = await School.find({province : province ,id: {in :[listidsc]}});
        // console.log(list);
        // if (list.length > 10) {
        //     data = {
        //         list: list.slice(0, 10),
        //         next: true
        //     }
        // } else {
        //     data = {
        //         list,
        //         next: false
        //     }
        // }
        // return res.json({ code, message, data });
          // let listnin = await School.find({ province: { nin: [province] } });
        // let list = listin.concat(listnin);
        let listin = await School.find({ province: province });
        let tmp = await Province.findOne({id : province});
        let sectorid = tmp.sector;
        let listsector = await Province.find({sector:sectorid});
        for(let i =0; i < listsector.length; i++ ){
            let arraysc = listsector[i];
            let listid = arraysc.id;
            let listnin = await School.find({ province: { in: [listid] } });
            let list = listin.concat(listnin);
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
            return res.json({ code, message, data });
        };
    }
};


