const { body, validationResult } = require('express-validator');

const userValidationRules = () => {
  return [
    // firstName must be completed
    body('firstName').notEmpty().withMessage("First Name is required").isString(),
    body('lastName').notEmpty().withMessage("Last Name is required").isString(),
    body('email').isEmail().withMessage("Not a valid e-mail address"),
    body('favoriteColor').isString().withMessage("Favorite color is not valid."),
    body('birthday').isISO8601('yyyy-mm-dd').withMessage("Birthday must be a date in 'YYYY-MM-DD' format."),
  ]
};

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({ errors: extractedErrors });
};

module.exports = {
  userValidationRules,
  validate,
};