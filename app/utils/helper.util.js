const { Op } = require("sequelize");

exports.getPagination = (page = 1, size = 10) => {
  const limit = size > 0 ? +size : 10;
  const offset = page > 1 ? (page - 1) * limit : 0;
  return { limit, offset, page: +page, size: limit };
};

exports.getPagingData = (data, count, page, limit) => {
  const totalItems = count;
  const totalPages = Math.ceil(totalItems / limit);
  const currentPage = page;
  return {
    totalItems,
    totalPages,
    currentPage,
    data,
  };
};

exports.buildFilter = (filterJSON) => {
  if (!filterJSON) return { where: {}, include: [] };

  let filterObj = filterJSON;
  if (typeof filterJSON === "string") {
    try {
      filterObj = JSON.parse(filterJSON);
    } catch (err) {
      throw new Error("Invalid JSON format for filter query");
    }
  }

  const where = {};
  const includeMap = {};

  for (const [key, value] of Object.entries(filterObj)) {
    if (value === undefined || value === null || value === "") continue;

    if (key.includes(".")) {
      const [relation, ...rest] = key.split(".");
      const col = rest.join(".");
      if (!includeMap[relation]) includeMap[relation] = {};
      includeMap[relation][col] = { [Op.like]: `%${value}%` };
    } else {
      where[key] = { [Op.like]: `%${value}%` };
    }
  }

  const include = Object.entries(includeMap).map(([relation, relWhere]) => ({
    association: relation,
    where: relWhere,
    required: true,
  }));

  return { where, include };
};
