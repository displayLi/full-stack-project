const validator = require('validator');
const isEmpty = require('./isValid')


module.exports = data => {
    const err = {};

    // 邮箱
    if (!validator.isEmail(data.email)) {
        err.email = '邮箱输入有误！';
    }

    if (validator.isEmpty(data.email)) {
        err.email = '邮箱不能为空！';
    }

    if (validator.isEmpty(data.password)) {
        err.password = '密码不能为空！';
    }

    return {
        err,
        isValid: isEmpty(err)
    }
}