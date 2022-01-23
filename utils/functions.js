export const renderCategories = (items, delimiter = ",") => {
	return items.map((item) => item.name).join(`${delimiter} `);
};
