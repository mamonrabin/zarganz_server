import { Types } from 'mongoose';
import { searchAbleFields } from './searchFileAble.js';

type Query = Record<string, unknown>;

export const QueryBuilder = (query: Query) => {
  const filters: Record<string, unknown> = {};

  /* ---------- Search ---------- */
  if (typeof query.searchTerm === 'string' && query.searchTerm.trim()) {
    const searchTerm = query.searchTerm.trim();
    filters.$or = searchAbleFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    }));
  }

  /* ---------- Direct filters (ObjectId refs) ---------- */
  const directFilters = ['category', 'subCategory', 'brand'] as const;

  directFilters.forEach((field) => {
    const value = query[field];

    if (typeof value === 'string' && value.trim()) {
      filters[field] = new Types.ObjectId(value);
    }
  });

  return filters;
};