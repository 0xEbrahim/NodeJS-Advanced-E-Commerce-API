import { validationResult } from "express-validator";

// Find the error from the validation rules
const validatorMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    res.status(400).json({ errors: errors.array() });
  else next();
};

export { validatorMiddleware };
