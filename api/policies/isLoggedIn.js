
module.exports = async function (req, res, proceed) {

    let ss = req.param('session') || '';
    if (ss) {
        let log = await Login.findOne({
            session: ss
        });
        if (log) {
            proceed();
        }
    }
    res.status(200);
    return res.json({
        code: 999,
        message: 'forbidden'
    });
}
