import crypto from 'crypto';

const generateUniqueString = (): string => {
  const randomBytes = crypto.randomBytes(4); // 4 bytes = 8 hex characters
  return randomBytes.toString('hex').replace(/[0-9]/g, '').slice(0, 6); // keep only letters
};

const SlugUtils = {
  generateSlug: (text: string): string => {
    const baseSlug = text
      .replace(/[।!?,./'"“”‘’`~@#$%^&*()_|+=<>[\]{}\\]/g, '')
      .replace(/\s+/g, '-')
      .toLowerCase();

    const uniquePart = generateUniqueString();
    return `${baseSlug}-${uniquePart}`;
  },
};

export default SlugUtils;