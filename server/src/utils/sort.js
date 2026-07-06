function getSort(query, defaultField = "createdAt") {

    const direction = query.sort === 
        "asc" ? "asc" 
        : "desc";

    return {
        [defaultField]: direction
    };
}

module.exports = {
    getSort
};