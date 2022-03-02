import { body, validationResult } from "express-validator";

export const validateFn = (req, res, next) => {
  const error = validationResult(req);
  if (error.isEmpty()) {
    return next();
  }

  return res.status(400).json({ message: error.array()[0].msg });
};

export const validate = [
  body("text")
    .trim()
    .isLength({ min: 3 })
    .withMessage("세글자 이상 입력해야 합니다."),
  validateFn,
];
