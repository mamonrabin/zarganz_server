export interface PaginationOptions {
  page: number;
  limit: number;
  skip: number;
}

export const getPaginationOptions = (
  query: Record<string, unknown>,
  defaultLimit = 10,
  maxLimit = 100
): PaginationOptions => {
  // Parse page number
  let page = 1;
  if (typeof query.page === 'string') {
    const parsed = parseInt(query.page, 10);
    page = !isNaN(parsed) && parsed > 0 ? parsed : 1;
  }

  // Parse limit and enforce max
  let limit = defaultLimit;
  if (typeof query.limit === 'string') {
    const parsed = parseInt(query.limit, 10);
    if (!isNaN(parsed) && parsed > 0) {
      limit = Math.min(parsed, maxLimit);
    }
  }

  const skip = (page - 1) * limit;

  return { page, limit, skip };
};
