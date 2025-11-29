// src/hooks/useTable.js

import { useState, useMemo } from "react";
import {
  filterBySearch,
  filterByField,
  sortData,
  paginateData,
  calculateTotalPages,
} from "../utils/tableHelpers";
import { ITEMS_PER_PAGE } from "../utils/constants";

export const useTable = (data, config = {}) => {
  const {
    searchFields = [],
    filterFields = [],
    defaultItemsPerPage = ITEMS_PER_PAGE,
  } = config;

  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(defaultItemsPerPage);

  // Process data with all filters, sorting, and pagination
  const processedData = useMemo(() => {
    let result = data;

    // Apply search
    if (searchQuery && searchFields.length > 0) {
      result = filterBySearch(result, searchQuery, searchFields);
    }

    // Apply filters
    Object.entries(filters).forEach(([field, value]) => {
      result = filterByField(result, field, value);
    });

    // Apply sorting
    if (sortConfig.key) {
      result = sortData(result, sortConfig.key, sortConfig.direction);
    }

    return result;
  }, [data, searchQuery, filters, sortConfig, searchFields]);

  // Calculate pagination
  const totalPages = calculateTotalPages(processedData.length, itemsPerPage);
  const paginatedData = paginateData(processedData, currentPage, itemsPerPage);

  // Handlers
  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleFilter = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    setCurrentPage(1);
  };

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setFilters({});
    setSortConfig({ key: null, direction: "asc" });
    setCurrentPage(1);
  };

  return {
    // Data
    data: paginatedData,
    totalItems: processedData.length,

    // Search
    searchQuery,
    handleSearch,

    // Filters
    filters,
    handleFilter,

    // Sorting
    sortConfig,
    handleSort,

    // Pagination
    currentPage,
    totalPages,
    itemsPerPage,
    handlePageChange,

    // Utils
    resetFilters,
  };
};
