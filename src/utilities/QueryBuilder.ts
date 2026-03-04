import { Types } from 'mongoose';
import { searchAbleFields } from './searchFileAble.js';

type Query = Record<string, unknown>;

// export const QueryBuilder = (query: Query) => {
//   const filters: Record<string, unknown> = {};


//   if (typeof query.searchTerm === 'string' && query.searchTerm.trim()) {
//     const searchTerm = query.searchTerm.trim();
//     filters.$or = searchAbleFields.map((field) => ({
//       [field]: { $regex: searchTerm, $options: 'i' },
//     }));
//   }


//   const directFilters = ['category', 'subCategory', 'brand'] as const;

//   directFilters.forEach((field) => {
//     const value = query[field];

//     if (typeof value === 'string' && value.trim()) {
//       filters[field] = new Types.ObjectId(value);
//     }
//   });

//   return filters;
// };



export const QueryBuilder = (query: Query) => {
  const filters: Record<string, unknown> = {};

  /* ---------- Search ---------- */
  if (typeof query.searchTerm === 'string' && query.searchTerm.trim()) {
    const searchTerm = query.searchTerm.trim();
    filters.$or = searchAbleFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    }));
  }

  /* ---------- Direct filters ---------- */
  const directFilters = ['category', 'subCategory', 'brand'] as const;

  directFilters.forEach((field) => {
    const value = query[field];
    if (typeof value === 'string' && value.trim()) {
      filters[field] = new Types.ObjectId(value);
    }
  });

  /* ---------- Date filter ---------- */
  if (typeof query.dateFilter === 'string') {
    const now = new Date();

    let startDate: Date | undefined;
    let endDate: Date | undefined;

    switch (query.dateFilter) {
      case 'thisday':
        startDate = new Date(now.setHours(0, 0, 0, 0));
        endDate = new Date(now.setHours(23, 59, 59, 999));
        break;

      case 'previousday':
        startDate = new Date(now);
        startDate.setDate(startDate.getDate() - 1);
        startDate.setHours(0, 0, 0, 0);

        endDate = new Date(startDate);
        endDate.setHours(23, 59, 59, 999);
        break;

      case 'thismonth':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date();
        break;

      case 'previousmonth':
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        endDate = new Date(now.getFullYear(), now.getMonth(), 0);
        break;

      case 'thisyear':
        startDate = new Date(now.getFullYear(), 0, 1);
        endDate = new Date();
        break;

      case 'previousyear':
        startDate = new Date(now.getFullYear() - 1, 0, 1);
        endDate = new Date(now.getFullYear() - 1, 11, 31);
        break;
    }

    if (startDate && endDate) {
      filters.createdAt = {
        $gte: startDate,
        $lte: endDate,
      };
    }
  }

  return filters;
};
