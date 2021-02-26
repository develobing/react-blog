import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    default: '미분류',
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
});

const Category = mongoose.model('Category', CategorySchema);

export default Category;
