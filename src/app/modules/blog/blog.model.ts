import { model, Schema } from 'mongoose';
import type { TBlog } from './blog.interface.js';

const blogSchema = new Schema<TBlog>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    image: { type: String, default: '', required: true },
    images: { type: [String], default: [] }, 
  },
  {
    timestamps: true,
  },
);

export const blogModel = model<TBlog>('blog', blogSchema);
