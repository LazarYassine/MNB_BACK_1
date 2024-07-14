// Model function to process Gumroad Ping data
async function processPing(sale_id, email, price, card) {
    try {
        // Here you can process the Gumroad Ping data further
        // For testing purposes, let's just return the data as it is
        return { sale_id, email, price, card };
    } catch (error) {
        throw error;
    }
}

module.exports = {
    processPing
};
