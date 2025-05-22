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

  const includeMap = {};
  const parseCondition = (key, value) => {
    if (typeof value === "object" && !Array.isArray(value)) {
      const condition = {};
      for (const [opKey, opValue] of Object.entries(value)) {
        switch (opKey) {
          case "eq":
            condition[Op.eq] = opValue;
            break;
          case "ne":
            condition[Op.ne] = opValue;
            break;
          case "gt":
            condition[Op.gt] = opValue;
            break;
          case "gte":
            condition[Op.gte] = opValue;
            break;
          case "lt":
            condition[Op.lt] = opValue;
            break;
          case "lte":
            condition[Op.lte] = opValue;
            break;
          case "like":
            condition[Op.like] = `%${opValue}%`;
            break;
          case "in":
            condition[Op.in] = Array.isArray(opValue) ? opValue : [opValue];
            break;
          default:
            throw new Error(`Unsupported operator: ${opKey}`);
        }
      }
      return condition;
    } else {
      return { [Op.like]: `%${value}%` };
    }
  };

  const parseWhere = (obj) => {
    const result = {};

    for (const [key, value] of Object.entries(obj)) {
      if (value === undefined || value === null || value === "") continue;

      if (key.toLowerCase() === "or" && Array.isArray(value)) {
        result[Op.or] = value.map((item) => parseWhere(item));
      } else if (key.includes(".")) {
        const [relation, ...rest] = key.split(".");
        const col = rest.join(".");
        if (!includeMap[relation]) includeMap[relation] = {};
        Object.assign(includeMap[relation], {
          [col]: parseCondition(col, value),
        });
      } else {
        result[key] = parseCondition(key, value);
      }
    }

    return result;
  };

  const finalWhere = parseWhere(filterObj);

  const include = Object.entries(includeMap).map(([relation, relWhere]) => ({
    association: relation,
    where: relWhere,
    required: true,
  }));

  return { where: finalWhere, include };
};
