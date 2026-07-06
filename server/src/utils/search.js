function contains(value) {

    if (!value) {
        return undefined;
    }

    return {
        contains: value,
        mode: "insensitive"
    };
}

module.exports = {
    contains,
}