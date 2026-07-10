const { getFullName } = require("../utils/fullName");

function mapRepairReport(repair) {

    return {

        id: repair.id,

        repairNo: repair.repairNo,

        customer: repair.customer
            ? getFullName(repair.customer)
            : null,

        itemName: repair.itemName,

        issue: repair.issue,

        status: repair.status,

        estimatedCost: repair.estimatedCost,

        laborCost: repair.laborCost,

        totalCost: repair.totalCost,

        receivedAt: repair.receivedAt,

        completedAt: repair.completedAt

    };

}

module.exports = {
    mapRepairReport
};