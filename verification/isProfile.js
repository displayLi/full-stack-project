const validator = require('validator');
const isEmpty = require('./isValid')


module.exports = data => {
    const err = {};

    // 验证是否为空
    if (validator.isEmpty(data.types)) err.types = '收支类型不能为空!';
    if (validator.isEmpty(data.details)) err.details = '收支描述不能为空!';
    if (validator.isEmpty(data.income)) err.income = '收入不能为空!';
    if (validator.isEmpty(data.expend)) err.expend = '支出不能为空!';
    if (validator.isEmpty(data.account)) err.account = '账户现金不能为空!';


    // 验证是否是数字
    if (!validator.isNumeric(data.income)) err.income = '收入必须是数字!';
    if (!validator.isNumeric(data.expend)) err.expend = '支出必须是数字!';
    if (!validator.isNumeric(data.account)) err.account = '账户现金必须是数字!';

    return {
        err,
        isValid: isEmpty(err)
    }
}