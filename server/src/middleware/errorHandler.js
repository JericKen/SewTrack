const apiResponse = require("../utils/apiResponse");

function errorHandler(err, req, res, next) {

    console.error(err);

    if (err.code === "P2002") {
        return apiResponse.error(
            res,
            409,
            "Category already exists."
        );
    }

    return apiResponse.error(
        res,
        500,
        "Internal Server Error"
    );

}

module.exports = errorHandler;