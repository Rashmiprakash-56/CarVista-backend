import mongoose from 'mongoose';

const CarSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  modelYear: {
    type: Number,
    required: true
  },
  photo: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Car = mongoose.model('Car', CarSchema);
export default Car;
