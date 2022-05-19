const Joi = require('joi');


export const validateSearchRequest = (req, res, next) => {
    console.log('validating search request');
    const schema = Joi.object().keys(
        {
            text: Joi.string().min(1).required(),
            page: Joi.number(),
            limit: Joi.number()
        }
    )
    const validation = schema.validate(req.query);
    if (validation.error) {
        console.log(validation.error.details[0].message);
        res.status(400).send({ error: validation.error.details[0].message });
        return;
    }
    next();
}

export const validateRecordSearchRequest = (req, res, next) => {
    console.log('validating record search post request');
    const schema = Joi.object().keys(
        {
            text: Joi.string().min(1).required(),
            page: Joi.number(),
            limit: Joi.number()
        }
    )
    const validation = schema.validate(req.body);
    if (validation.error) {
        console.log(validation.error.details[0].message);
        res.status(400).send({ error: validation.error.details[0].message });
        return;
    }
    next();
}