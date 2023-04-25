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
  .required()
  .error(new Error("手机号输入不合法，请重新输入"));
const role = joi.number().default(0);
const tcode = joi.string().min(0).allow(null, "");
const sid = joi.number().optional().allow(null, "");
exports.reg_schema = {
  body: {
    username,
    password,
    telephone,
    role,
    tcode,
    sid,
  },
};
exports.login_schema = {
  body: {
    username,
    password,
  },
};
