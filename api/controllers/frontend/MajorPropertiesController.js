

module.exports = {

    // 1101 dữ liệu gửi lên không hợp lệ
    // 1102 có lỗi xảy ra, không có gì được thay đổi
    // 1103 không tìm thấy dữ liệu trong database

    

    getAll: async (req, res) => {
        res.status(200);
        let code = 200, message = 'success', data = undefined, { page } = req.param('data');
        if (!page || page < 0) {
            page = 1;
        }
        let list = await GroupMajor.find().sort([{ name: 'DESC' }]).limit(11).skip((page - 1) * 10).populate('groupmajoritem');
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
        return res.json({ code, message, data });
    },

    getOne: async (req, res) => {
        res.status(200);
        let code = 903, message = 'error', data = undefined, { id = '' } = req.param('data');
        data = await GroupMajorItemDetail.findOne({ groupmajoritem : id });
        if (data) {
            code = 200;
            message = 'success';
        }
        return res.json({ code, message, data });
    },
    
  };


