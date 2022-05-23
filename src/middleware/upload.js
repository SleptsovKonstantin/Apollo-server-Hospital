const patternPas = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/; //латиница и цифры
const lenghtPass = /^[0-9a-zA-Z]{6,}$/;

const passwordCheck = (req, res, next) => {
  const body = req.body;
  const { login, password } = body;
  if (lenghtPass.test(login.trim()) && patternPas.test(password) && lenghtPass.test(password.trim())) {
    next();
  } else {
    res.send(`Error, check correct user`);
  }
};

module.exports = passwordCheck;