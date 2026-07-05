function generateSku(categoryCode, sequence) {

    return `${categoryCode}-${String(sequence).padStart(4, "0")}`;

}

module.exports = generateSku;