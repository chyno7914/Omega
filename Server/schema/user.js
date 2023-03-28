const joi = require("joi");
const username = joi
  .string()
  .alphanum()
  .max(10)
  .min(1)
  .required()
  .error(new Error("用户名不合法，请重新输入"));
const password = joi
  .string()
  .pattern(/^[\S]{6,12}$/)
  .required()
  .error(new Error("密码不合法，请重新输入"));
const telephone = joi
  .string()
  .alphanum()
  .max(11)
  .min(11)
  .error(new Error("手机号输入不合法，请重新输入"));
const role = joi.number();
const tcode = joi.string().min(0).allow(null);
exports.reg_schema = {
  body: {
    username,
    password,
    telephone,
    role,
    tcode,
  },
};
exports.login_schema = {
  body: {
    username,
    password,
  },
};
