const { APIError } = require("../middlewares/rest");

/**
 * 参数检测机制
 * @param {*} argument 参数名称
 * @param {*} param 参数的实际值
 * @param {*} length 参数的最大要求长度
 * @param {*} isEmpty 参数是否不为空
 * @returns 
 */
let ParametricTest = (argument, param, end_length, start_length = 0, isEmpty = true) => {

    if (param === undefined) {
        throw new APIError(4000, `参数不存在`);
    }

    if (typeof param === 'string') {
        if (param.length > end_length) {
            throw new APIError(4000, `The length of parameter ${argument} is invalid`);
        }

        if (isEmpty) {
            if (param.trim() === '') {
                throw new APIError(4000, `Parameter ${argument} cannot be null`);
            }
        }
    }

    if (typeof param === 'number') {
        if (!(param <= end_length && param >= start_length)) {
            throw new APIError(4000, `The length of parameter ${argument} is invalid`);
        }
    }

}

module.exports = {
    ParametricTest
}