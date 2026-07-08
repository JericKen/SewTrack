const apiResponse = require("../utils/apiResponse");

function validate(schema, source = "body") {

    return (req, res, next) => {

        const data = req[source];

        const result = schema.safeParse(data);

        if (!result.success) {

            return apiResponse.error(
                res,
                400,
                result.error.issues[0].message
            );

        }

        req[source] = result.data;

        next();

    };

}

module.exports = validate;