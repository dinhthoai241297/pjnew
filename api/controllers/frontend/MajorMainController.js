module.exports = {

    // 1301 dữ liệu gửi lên không hợp lệ
    // 1302 có lỗi xảy ra, không có gì được thay đổi
    // 1303 không tìm thấy dữ liệu trong database

    

    getAll: async (req, res) => {
        res.status(200);
        let code = 200, message = 'success', data = undefined, { page, status } = req.param('data');
        if (!page || page < 0) {
            page = 1;
        }
        let list = await MajorMain.find({ status }).sort([{ name: 'DESC' }]);
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
}