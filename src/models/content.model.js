import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  title: { 
    type: String, 
  },
  introduction: { 
    type: String, 
  },
});

export default mongoose.model('Content', contentSchema);
