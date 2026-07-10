function mapExpenseReport(expense) {

    return {

        id: expense.id,

        category: expense.category,

        amount: expense.amount,

        paymentMethod: expense.paymentMethod,

        description: expense.description,

        expenseDate: expense.expenseDate,

        remarks: expense.remarks

    };

}

module.exports = {
    mapExpenseReport
};