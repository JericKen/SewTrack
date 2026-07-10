function buildReportSummary({

    aggregate,

    totalTransactions,

    field,

    totalKey,

    averageKey

}) {

    return {

        [totalKey]: aggregate._sum[field] ?? 0,

        totalTransactions,

        [averageKey]: aggregate._avg[field] ?? 0

    };

}

module.exports = {
    buildReportSummary
};