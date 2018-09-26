
module.exports = async function (req, res, proceed) {
    console.log(req.param('page'));
    if (req.param('page')) {
        return proceed();
    } else {
        res.status(200);
        return res.json({
            code: 000,
            message: 'forbidden'
        });
    }
}
