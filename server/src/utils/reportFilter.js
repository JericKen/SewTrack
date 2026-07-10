const { buildDateRange } = require("./dateRange");

function buildReportFilter(query, options = {}) {

    const where = {};

    if (query.startDate || query.endDate) {

        where[options.dateField ?? "createdAt"] = buildDateRange(
            query.startDate,
            query.endDate
        );

    }

    if (options.allowCategory && query.category) {

        where.category = query.category;

    }

    if (options.allowPaymentMethod && query.paymentMethod) {

        where.paymentMethod = query.paymentMethod;

    }

    return where;

}

module.exports = {
    buildReportFilter
};