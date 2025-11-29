// src/utils/tableHelpers.js

/**
 * Filter data based on search query
 */
export const filterBySearch = (data, query, searchFields) => {
  if (!query) return data;

  const searchLower = query.toLowerCase();
  return data.filter((item) =>
    searchFields.some((field) =>
      item[field]?.toString().toLowerCase().includes(searchLower)
    )
  );
};

/**
 * Filter data by a specific field value
 */
export const filterByField = (data, field, value) => {
  if (!value || value === "all") return data;
  return data.filter((item) => item[field] === value);
};

/**
 * Sort data by a field and direction
 */
export const sortData = (data, sortKey, sortDirection) => {
  if (!sortKey) return data;

  return [...data].sort((a, b) => {
    const aValue = a[sortKey];
    const bValue = b[sortKey];

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });
};

/**
 * Paginate data
 */
export const paginateData = (data, currentPage, itemsPerPage) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return data.slice(startIndex, endIndex);
};

/**
 * Calculate total pages
 */
export const calculateTotalPages = (totalItems, itemsPerPage) => {
  return Math.ceil(totalItems / itemsPerPage);
};

/**
 * Get unique values from array of objects by field
 */
export const getUniqueValues = (data, field) => {
  return [...new Set(data.map((item) => item[field]))];
};

/**
 * Get initials from name
 */
export const getInitials = (name) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};
