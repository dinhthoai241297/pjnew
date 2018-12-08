/**
 * SubjectGroupController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

     // 1601 dữ liệu gửi lên không hợp lệ - Message : The submitted data is invalid
     // 1602 có lỗi xảy ra, không có gì được thay đổi -  Message : The submitted data is invalid
     // 1603 không tìm thấy dữ liệu trong database - Data not found in the database

    // /subjectGroup/getall/:page
    getAll: async (req, res) => {
        res.status(200);
        let code = 200, message = 'success', data = undefined;
        let list = await SubjectGroup.find().sort([{ code: 'ASC' }]);
        return res.json({ code, message, data: { list, next: false } });
    }
};
