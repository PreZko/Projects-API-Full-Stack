import mongoose from 'mongoose'

const ProjectSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
  },
  description: {
    type: String,
  },
  difficulty: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    required: [true, 'Please provide difficulty'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide userId'],
  },
})

export default mongoose.model('Project', ProjectSchema)
