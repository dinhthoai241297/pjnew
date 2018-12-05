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
        let code = 200, message = 'success', data = undefined,rs =undefined,listpv =undefined,result = undefined, list = undefined,{ page, province, subjectGroups } = req.param('data');
        if (!page || page < 0) {
            page = 1;
        } 

        let db = Mark.getDatastore().manager;
        listmark = await db.collection('mark').aggregate([
        {
            $match: {
                subjectGroups: { $regex: subjectGroups } 
            }
        },
        {
           $group: {_id: "$school" } }
           ]).toArray(async(error, rs) => {
           if (!error) {

            let listid = [];
            for (let i = 0; i < rs.length; i++) {
                listid.push(rs[i]._id); 
            }
            console.log(listid);

             let listin =  await School.find({ id: { in: [listid] }});
             console.log(listin);
            //        let dc = School.getDatastore().manager;
            //        listsc = await db.collection('school').aggregate([
            //        {
            //         $match: {
            //             _id : { $in: [listid] } 
            //         }

            //     },
            //     { $skip: (page - 1) * 20 },
            //     { $limit: 21 }
            //     ]).toArray(async(err, result) => {
            //         console.log(result);
            //     });
            // }
            // console.log(listid);
}
});


        },





                   // let listin =  await School.find({ id: { in: [listid] }});
                   // console.log(listin);
                 // let list = listin.concat(listpv);
                //  if (list.length > 20) {
                //     data = {
                //         list: list.slice(0, 20),
                //         next: true
                //     }
                // } else {
                //     data = {
                //         list,
                //         next: false
                //     }
                // }
                // code = 200;
                // message = 'success';



            // await console.log(listid);
            // return res.json({ code, message, data });



          // console.log(list);

            // let listin =  await School.find({ id: { in: [listsc] } });
        //     if (!error) {
        //      let list = listin;
        //      if (list.length > 20) {
        //         data = {
        //             list: list.slice(0, 20),
        //             next: true
        //         }
        //     } else {
        //         data = {
        //             list,
        //             next: false
        //         }
        //     }
        //     code = 200;
        //     message = 'success';
        // }
        // return res.json({ code, message, data });


 //    });
        // console.log(subjectGroups)
        // let listmark = await Mark.find();
        // // console.log(listmark);
        // let listsg = await Mark.find().where({ subjectGroups: {contains :subjectGroups}});
        // // console.log(listsg);
        // for(i =0; i< listsg.length; i++){
        //     let tmp = listsg[i];
        //     let b = tmp.school;
            // let listsc = a.filter(onlyUnique);

            // for(i =0; i<listsc.length;i++){
            //     a = null;
            //     array = undefined;
            //     if()
            // }
            // let a = listsc.distinct();
            // console.log(listsc);
            // let listin =  await School.find({ id: { in: [listsc] }});
            // console.log(listin);
            // let db = Mark.getDatastore().manager;
            // await db.collection('mark').find(
            //     {subjectGroups: { $regex: subjectGroups }}, {distinct("school")}
            //     ).toArray(function (err, listsg) {
            //         if (err) return res.serverError(err);
            // listsg.distinct("school",function(err,result){
     //            if(listsg){
     //                for(let i = 0; i< listsg.length ;i++){
     //                   let tmp = listsg[i];
     //                   let listsc = tmp.school;
     //                   console.log(listsc);


     //           }
     //     // });
     // });

                // }
        //        }
        //        // console.log(list);
        //    });


        // for (let i =0; i < listmark.length; i++) {
        //     tmp = l
        // }
        // for(let i = 0; i < listmark.length ; i++){
        // let listsc = listmark[i];
        // let listidsc = listsc.school;
        // console.log(listidsc);
        // list = await School.find({province : province ,id: {in :[listidsc]}});
        // console.log(list);
    // }
    //     // if (list.length > 10) {
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
        // }
        // return res.json({ code, message, data });
          // let listnin = await School.find({ province: { nin: [province] } });
        // let list = listin.concat(listnin);
        // let listin = await School.find({ province: province });
        // let tmp = await Province.findOne({id : province});
        // let sectorid = tmp.sector;
        // let listsector = await Province.find({sector:sectorid});
        // for(let i =0; i < listsector.length; i++ ){
        //     let arraysc = listsector[i];
        //     let listid = arraysc.id;
        //     let listnin = await School.find({ province: { in: [listid] } });
        //     let list = listin.concat(listnin);
        //     if (list.length > 20) {
        //         data = {
        //             list: list.slice(0, 20),
        //             next: true
        //         }
        //     } else {
        //         data = {
        //             list,
        //             next: false
        //         }
        //     }
        //     return res.json({ code, message, data });
        // };



    };


