module.exports = {

    // 1301 dữ liệu gửi lên không hợp lệ
    // 1302 có lỗi xảy ra, không có gì được thay đổi
    // 1303 không tìm thấy dữ liệu trong database

    

    getList: async (req, res) => {
        res.status(200);
        let code = 200, message = 'success', data = undefined;
        let list = await Character.find().sort([{ name: 'ASC' }]).populate('questions');
         if (list) {
            data = {
                list
            }
            code = 200;
            message = 'success';
        }
        return res.json({ code, message, data });
    },
}