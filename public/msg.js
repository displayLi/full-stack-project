
// 自定义响应头
module.exports = (res, flag, msg, status, data) => {
    return res.status(status).json({ flag, msg, data, status })
}