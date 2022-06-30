const addCommas = (number) => {
    return number.toLocaleString();
};

export const createItemData = async (items) => {
    return await items.map((item) => {
        item._id = item._id.toString();
        item.price = addCommas(item.price);
        return item;
    }).toArray();
};