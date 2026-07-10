function getFullName(customer) {

    return [
        customer.firstName,
        customer.lastName
    ]
        .filter(Boolean)
        .join(" ");

}

module.exports = {
    getFullName
};