function getDateRangeFilter(from, to) {

    if (!from && !to) {
        return undefined;
    }

    const range = {};

    if (from) {
        range.gte = new Date(from);
    }

    if (to) {
        const endDate = new Date(to);
        endDate.setHours(23, 59, 59, 999);
        range.lte = endDate;
    }

    return range;

}

module.exports = {
    getDateRangeFilter
};
