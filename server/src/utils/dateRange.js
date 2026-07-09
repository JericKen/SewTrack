function buildDateRange(startDate, endDate) {

    const dateRange = {};

    if (startDate) {

        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);

        dateRange.gte = start;

    }

    if (endDate) {

        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);

        dateRange.lte = end;

    }

    return dateRange;

}

module.exports = {
    buildDateRange
};