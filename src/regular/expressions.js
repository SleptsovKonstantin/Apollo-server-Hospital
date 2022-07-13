const patternPas = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/; //латиница и цифры
const lenghtPass = /^[0-9a-zA-Z]{6,}$/;

module.exports = {
  patternPas,
  lenghtPass
}