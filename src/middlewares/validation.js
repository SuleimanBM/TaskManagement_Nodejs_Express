import Joi from "joi";

const taskValidationSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().max(500).optional(),
    dueDate: Joi.date().iso().required().messages({
        "date.base": "Due date must be a valid date.",
        "date.format": "Due date must be in ISO format (YYYY-MM-DD).",
        "any.required": "Due date is required.",
    }),
    time: Joi.string().optional(),
    category: Joi.string().optional(),
    subtasks: Joi.string().optional(),
    isCompleted: Joi.boolean().optional(),
    priority: Joi.string().valid("Low", "Medium", "High").default("low").required(),
    status: Joi.string().valid("Pending", "InProgress", "Completed").default("pending").required(),
})

const userValidationSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().required().email(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
})

export const validateTask = (req, res, next) => {
    const { error } = taskValidationSchema.validate(req.body, { abortEarly: false,});

    if (error) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: error.details.map(err => err.message) // Extract readable error messages
        });
    }

    next(); // Proceed to the next middleware or route handler
};

export const validateUser = (req, res, next) => {
    const { error } = userValidationSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: error.details.map(err => err.message) // Extract readable error messages
        });
    }

    next(); // Proceed to the next middleware or route handler
};
