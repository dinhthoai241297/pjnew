/**
 * MarkController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

 module.exports = {

    // 1101 dữ liệu gửi lên không hợp lệ - Message : The submitted data is invalid
    // 1102 có lỗi xảy ra, không có gì được thay đổi - Error - Nothing is changed
    // 1103 không tìm thấy dữ liệu trong database - Data not found in the database


    // /mark/getall/:page
    getList: async (req, res) => {
        res.status(200);
        let code = 200, message = 'success', data = undefined;
        let { school, year } = req.param('data');
        try{
            let list = await Mark.find({ year: year, school: school }).populate('major');
            if (list) {
                data=list;
                code = 200;
                message = 'success';
            }
            return res.json({ code, message, data });
        }
        catch(error){
          code = 1101;
          message ='The submitted data is invalid'
          return res.json({ code, message, data });
      }
  },


};

