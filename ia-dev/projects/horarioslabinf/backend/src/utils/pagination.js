class Pagination {
  static getPaginationParams(query) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const offset = (page - 1) * limit;

    return {
      page: Math.max(1, page),
      limit: Math.min(100, Math.max(1, limit)), // Max 100 items per page
      offset: Math.max(0, offset)
    };
  }

  static buildPaginationResponse(data, totalCount, page, limit) {
    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return {
      data,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: totalCount,
        itemsPerPage: limit,
        hasNextPage,
        hasPrevPage,
        nextPage: hasNextPage ? page + 1 : null,
        prevPage: hasPrevPage ? page - 1 : null
      }
    };
  }

  static getSortParams(query) {
    const sortBy = query.sortBy || 'id';
    const sortOrder = query.sortOrder?.toLowerCase() === 'desc' ? 'DESC' : 'ASC';

    return { sortBy, sortOrder };
  }

  static buildSearchQuery(query, searchableFields = []) {
    const search = query.search?.trim();
    if (!search || searchableFields.length === 0) {
      return null;
    }

    return {
      search,
      searchableFields
    };
  }
}

module.exports = Pagination;