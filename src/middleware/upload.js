const { patternPas, lenghtPass } = require('../regular/expressions');

const passwordCheck = (req, res, next) => {
  const { body } = req;
  const { login, password } = body;
  if (lenghtPass.test(login.trim()) && patternPas.test(password) && lenghtPass.test(password.trim())) {
    next();
  } else {
    res.send(`Error, check correct user`);
  }
};

module.exports = passwordCheck;