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
        let code = 303, message = 'error', data = undefined, { name, page, type, number } = req.param('data'), list = undefined;
        if (!page || page < 0) {
            page = 1;
        }
        try {    
           if(type==='MAJOR')   {
              let db = Major.getDatastore().manager;
              list = await db.collection('major').aggregate([
              {
                $match: { code: { $regex: number }}
            },
            {
                $lookup: {
                    from: 'school',
                    localField: 'school',
                    foreignField: '_id',
                    as: 'school'
                },

            },
            {
                $unwind: "$school"
            },
            {
                $lookup: {
                    from :'province',
                    localField:'school.province',
                    foreignField: '_id',
                    as: 'province'
                }
            },
            {    
                $lookup: {
                    from: 'mark',
                    localField: '_id',
                    foreignField: 'major',
                    as: 'marks'
                }
            },
            {
                $unwind: "$marks"
            },
            {
                $match: { "marks.year" : 2018 }
            },
            {$sort: {"marks.mark": -1}},
        // {
        //     $JSON.parse(marks.subjectGroup)
        // }
        // // {
        // //     $unwind: "$marks.subjectGroup"
        // // },
        {
            $lookup: {
                from :'subjectGroup',
                localField:'marks.subjectGroup',
                foreignField: '_id',
                as: 'subjectGroups'
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


    }
    else {
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
    };

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

    suggest: async (req, res) => {
        res.status(200);
        let code = 200, message = 'Error', data = undefined, rs = undefined, list = undefined, { page, subjectGroups, mark,majorcode, year, province} = req.param('data');
        if (!page || page < 0) {
            page = 1;
        }
        if (!year) {
            year = 2018;
        }

        try {
            if(!subjectGroups && !majorcode && !mark && !province) {
                list = await Mark.find({year : year}).populate('school').populate('major').limit(21).skip((page - 1) * 20);
                console.log(list);
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
                return res.json({ code, message, data });


            } else {
                let lmajor =[];
                let lschoolpr =[];
                let lschool =[];
                let lnschool =[];
                let lsector =[];
                let lnsector =[];

                let fmajor = await Major.find({code : {contains: majorcode}});
                for(let i = 0; i < fmajor.length; i++){
                 lmajor.push(String(fmajor[i].id));
             }
               //tìm theo tỉnh thành + điểm + ngành + năm
               let fschoolpr = await School.find({ province : province });
               for(let i =0; i< fschoolpr.length; i ++){
                   lschoolpr.push(String(fschoolpr[i].id));
               } 
               let list1 = await Mark.find({ school : {in: lschoolpr}, major : {in : lmajor}, year : year, mark : {'>=' : mark , '<' : mark+3}}).sort('mark ASC').populate('school').populate('major').limit(21).skip((page - 1) * 20);
          

             // tìm theo khu vực + điểm + ngành + năm
             let fsector = await Province.findOne({ id : province }); 
             let sector = fsector.sector;
             let fprovince = await Province.find({sector : sector});
             for(let i =0; i< fprovince.length; i ++){
                if(fprovince[i].id != province){
                   lsector.push(String(fprovince[i].id));
               }
           }  
           let lschoolst = await School.find({province : {in : lsector}});
            for(let i =0; i< lschoolst.length; i ++){
                   lschool.push(String(lschoolst[i].id));
               }
           let list2 = await Mark.find({ school : {in: lschool}, major : {in : lmajor}, year : year, mark : {'>=' : mark , '<' : mark+3}}).sort('mark ASC').populate('school').populate('major').limit(21).skip((page - 1) * 20);
              // Tìm theo ngành + điểm + năm 
           for(let i =0; i< fprovince.length; i ++){
                   lnsector.push(String(fprovince[i].id));
               }
            let lnschoolst = await School.find({province : {in : lnsector}});
               for(let i =0; i< lnschoolst.length; i ++){
                   lnschool.push(String(lnschoolst[i].id));
               }
           let list3 = await Mark.find({ school : {nin: lnschool}, major : {in : lmajor}, year : year, mark : {'>=' : mark , '<' : mark+3}}).sort('mark ASC').populate('school').populate('major').limit(21).skip((page - 1) * 20);
               list = list1.concat(list2).concat(list3);
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
            return res.json({ code, message, data });
        }
    }
    catch (error) {
        code = 301;
        return res.json({ code, message, data });
    }
},

};


