const yup = require('yup')

const createUserValidation = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
})

module.exports = {
  createUserValidation,
}