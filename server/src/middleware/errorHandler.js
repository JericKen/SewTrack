const apiResponse = require("../utils/apiResponse");
const AppError = require("../utils/appError");

function errorHandler(err, req, res, next) {

    console.error(err);

    if (err instanceof AppError) {
        return apiResponse.error(
            res,
            err.statusCode,
            err.message,
            err.errors
        );
    }

    if (err.code === "P2002") {
        const target = err.meta?.target;

        if (Array.isArray(target) && target.includes("invoiceNo")) {
            return apiResponse.error(
                res,
                409,
                "Invoice number already exists."
            );
        }

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