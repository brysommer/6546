const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const ajv = new Ajv();
addFormats(ajv);

const mw = schema => (req, res, next) => {
    const validate = ajv.compile(schema);
    const valid = validate(req.body);

    if (valid) {
        next();
        return;
    }

    const result = { status: 'invalid data', payload: validate.errors };
    res.json(result);
    console.log(result);
    console.log(req.body);
    next();
    
};

module.exports = mw;    