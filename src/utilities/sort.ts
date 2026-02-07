export interface SortOptions {
  sortField: string;
  sortOrder: 1 | -1;
}

/* Mapping of query keys to field + order */
const sortMapping: Record<string, SortOptions> = {
  'a-z': { sortField: 'title', sortOrder: 1 },
  'z-a': { sortField: 'title', sortOrder: -1 },
  priceLowToHigh: { sortField: 'price', sortOrder: 1 },
  priceHighToLow: { sortField: 'price', sortOrder: -1 },
  dateOldToNew: { sortField: 'createdAt', sortOrder: 1 },
  dateNewToOld: { sortField: 'createdAt', sortOrder: -1 },
};

export const getSortOptions = (sortBy?: string): SortOptions => {
  return (sortMapping[sortBy || 'dateNewToOld'] ?? sortMapping['dateNewToOld']) as SortOptions;
};
