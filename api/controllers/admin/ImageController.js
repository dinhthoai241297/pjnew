/**
 * ImageController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

// 1103 có lỗi xảy ra
module.exports = {

    upload: async (req, res) => {
        res.status(200);
        let uploadFile;
        uploadFile = req.file('upload');
        uploadFile.upload({ maxBytes: 10000000, dirname: '../../assets/images' }, (error, file) => {
            if (error) {
                return res.json({
                    uploaded: false,
                    error: {
                        message: 'Có lỗi trong quá trình up file'
                    }
                });
            } else {
                let p, url;
                p = file[0].fd;
                url = 'http://localhost:1337/images/' + p.substring(p.lastIndexOf('\\') + 1, p.length);
                return res.json({
                    uploaded: true,
                    url
                });
            }
        });
    },

};

