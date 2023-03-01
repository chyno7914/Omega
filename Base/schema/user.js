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
const passwordcheck = joi
  .valid(joi.ref("password"))
  .required()
  .error(new Error("密码不一致，请重新输入"));
exports.reg_schema = {
  body: {
    username,
    password,
    passwordcheck,
  },
};
exports.login_schema = {
  body: {
    username,
    password,
  },
};
