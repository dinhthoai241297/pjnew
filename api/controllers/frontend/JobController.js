

module.exports = {

    // 1001 dữ liệu gửi lên không hợp lệ
    // 1002 có lỗi xảy ra, không có gì được thay đổi
    // 1003 không tìm thấy dữ liệu trong database



    getOne: async (req, res) => {
        res.status(200);
        let code = 903, message = 'error', data = undefined, { id = '' } = req.param('data');
        data = await Content.findOne({ job: id }).populate('job');

        if (data) {
            code = 200;
            message = 'success';
        }
        return res.json({ code, message, data });
    },
    search: async (req, res) => {
        res.status(200);
        let code = 1003, message = 'error', data = undefined, { keyword, page } = req.param('data'), list = undefined;
        if (!page || page < 0) {
            page = 1;
        }
        try {
            let db = Job.getDatastore().manager;
            list = await db.collection('job').aggregate([
                {
                    $match: {
                        name: { $regex: keyword, $options: "i" }
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
            code = 1001;
            return res.json({ code, message, data });
        }
    },
    getlist: async (req, res) => {
        res.status(200);
        let code = 200, message = 'Error', data = undefined, rs = undefined, list = undefined, { page, p1, p2, p3, p4 } = req.param('data');
        if (!page || page < 0) {
            page = 1;
        }
        let logdata = await DataJob.create({ p1, p2, p3, p4 });
        try {
            let arr =[];
            if(!p1 && !p2 && !p3 && !p4){
             list = await Job.find();
            } else {
             // Lọc theo điều kiện P1
             let list1 = undefined;
             if(p1){
             list1 = await Job.find({p1: p1});
             for(let i =0; i< list1.length; i ++){
                arr.push(String(list1[i].id));
             } 
             }
             
             // Lọc theo điều kiện P2
             let list2 = undefined;
             if(p2){
             list2 = await Job.find({p2: p2});
             for(let i =0; i< list2.length; i ++){
                arr.push(String(list2[i].id));
             } 
             }
             // Lọc theo điều kiện P3
             let list3 = undefined;
             if(p3){
             list3 = await Job.find({p3: p3});
             for(let i =0; i< list3.length; i ++){
                arr.push(String(list3[i].id));
             } 
             }
             // Lọc theo điều kiện P4
             let list4 = undefined;
             if(p4){
             list4 = await Job.find({p4: p4});
             for(let i =0; i< list4.length; i ++){
                arr.push(String(list4[i].id));
             } 
             }
              list = await Job.find({id :{in: arr}}).limit(11).skip((page - 1) * 10);
             }
    
            if (list.length > 10) {
                data = {
                    list: list.slice(0, 10),
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
            return res.json({ code, message, data });

        } catch (error) {
            code = 301;
            return res.json({ code, message, data });
        }
    },


};


