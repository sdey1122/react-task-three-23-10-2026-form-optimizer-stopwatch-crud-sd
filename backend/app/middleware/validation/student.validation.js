const Joi = require("joi");

const studentSchema = Joi.object({
  name: Joi.string().trim().min(2).required().messages({
    "string.empty": "Name cannot be empty",
    "string.min": "Name must be at least 2 characters",
    "any.required": "Name is required",
  }),
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email cannot be empty",
      "string.email": "Email must be a valid email address",
      "any.required": "Email is required",
    }),
  age: Joi.number().integer().min(1).max(120).required().messages({
    "number.base": "Age must be a number",
    "number.integer": "Age must be a whole number",
    "number.min": "Age must be at least 1",
    "number.max": "Age must be 120 or less",
    "any.required": "Age is required",
  }),
  course: Joi.string().trim().min(1).required().messages({
    "string.empty": "Course cannot be empty",
    "any.required": "Course is required",
  }),
}).options({ abortEarly: false, allowUnknown: false });

const validateStudent = (req, res, next) => {
  const { error, value } = studentSchema.validate(req.body, { convert: true });
  if (error) {
    return res.status(400).json({
      success: false,
      message: "Student validation failed",
      errors: error.details.map((detail) => detail.message),
    });
  }
  req.body = value;
  next();
};

module.exports = { validateStudent };
